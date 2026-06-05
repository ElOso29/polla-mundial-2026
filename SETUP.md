# Polla Mundial 2026 — Guía de Deploy

## Pasos en orden

### 1. Crear proyecto en Supabase (5 min)

1. Ve a https://supabase.com → "New project"
2. Ponle nombre: `polla-mundial-2026`
3. Elige una región (ej. South America East)
4. Guarda la contraseña de la base de datos
5. Espera que el proyecto se inicialice (~2 min)

#### Ejecutar el schema SQL:
- Ve a **SQL Editor** (menú izquierdo)
- Pega y ejecuta `supabase/schema.sql`
- Luego pega y ejecuta `supabase/seed.sql`

#### Copiar las keys:
- Ve a **Project Settings → API**
- Copia `Project URL` → es tu `NEXT_PUBLIC_SUPABASE_URL`
- Copia `anon public` key → es tu `NEXT_PUBLIC_SUPABASE_ANON_KEY`

#### Habilitar Realtime:
- Ve a **Database → Replication**
- Habilita las tablas `matches` y `predictions`

---

### 2. Subir a GitHub (2 min)

```bash
# En la carpeta del proyecto:
git init
git add .
git commit -m "Polla Mundial 2026 inicial"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/polla-mundial-2026.git
git push -u origin main
```

---

### 3. Deploy en Vercel (3 min)

1. Ve a https://vercel.com → "Add New Project"
2. Conecta tu repositorio de GitHub
3. En **Environment Variables** agrega:
   - `NEXT_PUBLIC_SUPABASE_URL` = tu URL de Supabase
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = tu anon key
4. Click **Deploy** 🚀

---

### 4. Configurar Admin (2 min)

Una vez deployado:
1. Regístrate en la app con **tu** email
2. Ve a Supabase → **Table Editor → profiles**
3. Encuentra tu fila y cambia `is_admin` a `true`
4. Ahora tendrás acceso a `/admin` en la app

---

### 5. Compartir con tus amigos

Envía el link de Vercel a tus 11 amigos.  
El plazo para registrarse e ingresar pronósticos es el **11 de junio de 2026**.

---

## Estructura del proyecto

```
src/
  app/
    page.tsx          → Tabla de posiciones (home)
    auth/page.tsx     → Login y registro
    predictions/      → Formulario de pronósticos (usuario)
    admin/            → Panel de resultados (solo admin)
    player/[id]/      → Ver pronósticos de otro jugador
    rules/            → Reglamento completo
  components/
    Navigation.tsx    → Barra de navegación
  lib/
    supabase.ts       → Cliente Supabase
    scoring.ts        → Lógica de puntaje
  types/
    index.ts          → Tipos TypeScript
supabase/
  schema.sql          → Crear tablas y políticas de seguridad
  seed.sql            → Fixture de 104 partidos
```

## Notas importantes

- Los pronósticos se guardan automáticamente al salir del campo (onBlur)
- El admin puede bloquear/desbloquear partidos con el candado 🔒
- El fixture incluye 104 partidos; verifica las fechas en fifa.com antes del 11 jun
- Para partidos de fase eliminatoria, el admin actualiza los nombres de los equipos clasificados
- La tabla de posiciones se actualiza en tiempo real via Supabase Realtime
