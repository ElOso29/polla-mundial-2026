-- ============================================================
-- POLLA MUNDIAL 2026 — ESQUEMA SUPABASE
-- Ejecutar en: Supabase Dashboard > SQL Editor
-- ============================================================

-- 1. PERFILES DE USUARIO (extiende auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id           UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username     TEXT UNIQUE NOT NULL,
  is_admin     BOOLEAN DEFAULT FALSE,
  champion     TEXT,                      -- equipo elegido como campeón
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger: crear perfil automáticamente al registrarse
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO public.profiles (id, username)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)));
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 2. PARTIDOS
CREATE TABLE IF NOT EXISTS public.matches (
  id           SERIAL PRIMARY KEY,
  match_number INT UNIQUE,
  stage        TEXT NOT NULL CHECK (stage IN ('group','r32','r16','qf','sf','3rd','final')),
  group_name   TEXT,                      -- 'A'–'L' solo en fase de grupos
  home_team    TEXT NOT NULL,
  away_team    TEXT NOT NULL,
  match_date   TIMESTAMPTZ,
  venue        TEXT,
  home_score   INT,                       -- NULL hasta que admin ingrese resultado
  away_score   INT,
  locked       BOOLEAN DEFAULT FALSE,     -- TRUE = no más pronósticos para este partido
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- 3. PRONÓSTICOS
CREATE TABLE IF NOT EXISTS public.predictions (
  id           SERIAL PRIMARY KEY,
  user_id      UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  match_id     INT  NOT NULL REFERENCES public.matches(id)  ON DELETE CASCADE,
  home_score   INT  NOT NULL,
  away_score   INT  NOT NULL,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, match_id)
);

-- Trigger: actualizar updated_at en pronósticos
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$;

DROP TRIGGER IF EXISTS predictions_updated_at ON public.predictions;
CREATE TRIGGER predictions_updated_at
  BEFORE UPDATE ON public.predictions
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE public.profiles    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.matches     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.predictions ENABLE ROW LEVEL SECURITY;

-- Profiles: cualquiera puede leer, solo el dueño actualiza
CREATE POLICY "profiles_select" ON public.profiles FOR SELECT USING (TRUE);
CREATE POLICY "profiles_insert" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Matches: cualquiera puede leer, solo admin escribe
CREATE POLICY "matches_select"  ON public.matches FOR SELECT USING (TRUE);
CREATE POLICY "matches_insert"  ON public.matches FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin));
CREATE POLICY "matches_update"  ON public.matches FOR UPDATE
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin));

-- Predictions: cualquiera lee, solo dueño escribe (si partido no está bloqueado)
CREATE POLICY "predictions_select" ON public.predictions FOR SELECT USING (TRUE);
CREATE POLICY "predictions_insert" ON public.predictions FOR INSERT
  WITH CHECK (
    auth.uid() = user_id AND
    NOT EXISTS (SELECT 1 FROM public.matches WHERE id = match_id AND locked)
  );
CREATE POLICY "predictions_update" ON public.predictions FOR UPDATE
  USING (
    auth.uid() = user_id AND
    NOT EXISTS (SELECT 1 FROM public.matches WHERE id = match_id AND locked)
  );

-- ============================================================
-- ÍNDICES
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_predictions_user    ON public.predictions(user_id);
CREATE INDEX IF NOT EXISTS idx_predictions_match   ON public.predictions(match_id);
CREATE INDEX IF NOT EXISTS idx_matches_stage       ON public.matches(stage);
CREATE INDEX IF NOT EXISTS idx_matches_group       ON public.matches(group_name);

-- ============================================================
-- REALTIME (habilitar para la tabla posiciones en vivo)
-- ============================================================
-- En Supabase Dashboard > Database > Replication
-- habilitar las tablas: matches, predictions
