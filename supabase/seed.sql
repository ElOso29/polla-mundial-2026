-- ============================================================
-- POLLA MUNDIAL 2026 — FIXTURE OFICIAL (104 partidos)
-- Fuente: Sorteo oficial FIFA (5 dic 2025, Washington D.C.)
-- Horarios: APROXIMADOS (-05). Verificar hora exacta en fifa.com.
-- ============================================================
-- Este script REEMPLAZA el fixture anterior. Borra los partidos
-- existentes (y los pronósticos asociados) y carga el oficial.
-- ============================================================

TRUNCATE TABLE public.matches RESTART IDENTITY CASCADE;

-- ============================================================
-- FASE DE GRUPOS (72 partidos — 11 al 27 de junio)
-- ============================================================
INSERT INTO public.matches (match_number, stage, group_name, home_team, away_team, match_date, venue)
VALUES
-- Jornada 1 (11-17 jun)
(1,  'group','A','México',         'Sudáfrica',            '2026-06-11 19:00:00-05', 'Ciudad de México'),
(2,  'group','A','Corea del Sur',  'Rep. Checa',           '2026-06-11 16:00:00-05', 'Guadalajara'),
(3,  'group','B','Canadá',         'Bosnia y Herzegovina', '2026-06-12 15:00:00-05', 'Toronto'),
(4,  'group','B','Qatar',          'Suiza',                '2026-06-12 18:00:00-05', 'San Francisco'),
(5,  'group','D','USA',            'Paraguay',             '2026-06-12 21:00:00-05', 'Los Ángeles'),
(6,  'group','D','Australia',      'Turquía',              '2026-06-12 12:00:00-05', 'Vancouver'),
(7,  'group','C','Brasil',         'Marruecos',            '2026-06-13 16:00:00-05', 'Boston'),
(8,  'group','C','Haití',          'Escocia',              '2026-06-13 19:00:00-05', 'NY/NJ'),
(9,  'group','E','Alemania',       'Curazao',              '2026-06-14 12:00:00-05', 'Filadelfia'),
(10, 'group','E','Costa de Marfil','Ecuador',              '2026-06-14 15:00:00-05', 'Houston'),
(11, 'group','F','Países Bajos',   'Japón',                '2026-06-14 18:00:00-05', 'Dallas'),
(12, 'group','F','Suecia',         'Túnez',                '2026-06-14 21:00:00-05', 'Monterrey'),
(13, 'group','G','Bélgica',        'Egipto',               '2026-06-15 12:00:00-05', 'Los Ángeles'),
(14, 'group','G','Irán',           'Nueva Zelanda',        '2026-06-15 15:00:00-05', 'Seattle'),
(15, 'group','H','España',         'Cabo Verde',           '2026-06-15 18:00:00-05', 'Miami'),
(16, 'group','H','Arabia Saudita', 'Uruguay',              '2026-06-15 21:00:00-05', 'Atlanta'),
(17, 'group','I','Francia',        'Senegal',              '2026-06-16 12:00:00-05', 'NY/NJ'),
(18, 'group','I','Iraq',           'Noruega',              '2026-06-16 15:00:00-05', 'Boston'),
(19, 'group','J','Argentina',      'Argelia',              '2026-06-16 18:00:00-05', 'Kansas City'),
(20, 'group','J','Austria',        'Jordania',             '2026-06-16 21:00:00-05', 'San Francisco'),
(21, 'group','K','Portugal',       'RD Congo',             '2026-06-17 12:00:00-05', 'Houston'),
(22, 'group','K','Uzbekistán',     'Colombia',             '2026-06-17 15:00:00-05', 'Ciudad de México'),
(23, 'group','L','Inglaterra',     'Croacia',              '2026-06-17 18:00:00-05', 'Toronto'),
(24, 'group','L','Ghana',          'Panamá',               '2026-06-17 21:00:00-05', 'Dallas'),
-- Jornada 2 (18-23 jun)
(25, 'group','A','Rep. Checa',     'Sudáfrica',            '2026-06-18 12:00:00-05', 'Atlanta'),
(26, 'group','A','México',         'Corea del Sur',        '2026-06-18 21:00:00-05', 'Guadalajara'),
(27, 'group','B','Suiza',          'Bosnia y Herzegovina', '2026-06-18 15:00:00-05', 'Los Ángeles'),
(28, 'group','B','Canadá',         'Qatar',                '2026-06-18 18:00:00-05', 'Vancouver'),
(29, 'group','C','Brasil',         'Haití',                '2026-06-19 18:00:00-05', 'Filadelfia'),
(30, 'group','C','Escocia',        'Marruecos',            '2026-06-19 12:00:00-05', 'Boston'),
(31, 'group','D','Turquía',        'Paraguay',             '2026-06-19 15:00:00-05', 'San Francisco'),
(32, 'group','D','USA',            'Australia',            '2026-06-19 21:00:00-05', 'Seattle'),
(33, 'group','E','Alemania',       'Costa de Marfil',      '2026-06-20 12:00:00-05', 'Toronto'),
(34, 'group','E','Ecuador',        'Curazao',              '2026-06-20 15:00:00-05', 'Kansas City'),
(35, 'group','F','Países Bajos',   'Suecia',               '2026-06-20 18:00:00-05', 'Houston'),
(36, 'group','F','Túnez',          'Japón',                '2026-06-20 21:00:00-05', 'Monterrey'),
(37, 'group','G','Bélgica',        'Irán',                 '2026-06-21 12:00:00-05', 'Los Ángeles'),
(38, 'group','G','Nueva Zelanda',  'Egipto',               '2026-06-21 15:00:00-05', 'Vancouver'),
(39, 'group','H','España',         'Arabia Saudita',       '2026-06-21 18:00:00-05', 'Miami'),
(40, 'group','H','Uruguay',        'Cabo Verde',           '2026-06-21 21:00:00-05', 'Atlanta'),
(41, 'group','I','Francia',        'Iraq',                 '2026-06-22 12:00:00-05', 'NY/NJ'),
(42, 'group','I','Noruega',        'Senegal',              '2026-06-22 15:00:00-05', 'Filadelfia'),
(43, 'group','J','Argentina',      'Austria',              '2026-06-22 18:00:00-05', 'Dallas'),
(44, 'group','J','Jordania',       'Argelia',              '2026-06-22 21:00:00-05', 'San Francisco'),
(45, 'group','K','Portugal',       'Uzbekistán',           '2026-06-23 12:00:00-05', 'Houston'),
(46, 'group','K','Colombia',       'RD Congo',             '2026-06-23 15:00:00-05', 'Guadalajara'),
(47, 'group','L','Inglaterra',     'Ghana',                '2026-06-23 18:00:00-05', 'Boston'),
(48, 'group','L','Panamá',         'Croacia',              '2026-06-23 21:00:00-05', 'Toronto'),
-- Jornada 3 (24-27 jun) — últimos partidos de cada grupo
(49, 'group','A','Rep. Checa',     'México',               '2026-06-24 17:00:00-05', 'Ciudad de México'),
(50, 'group','A','Sudáfrica',      'Corea del Sur',        '2026-06-24 17:00:00-05', 'Monterrey'),
(51, 'group','B','Suiza',          'Canadá',               '2026-06-24 13:00:00-05', 'Vancouver'),
(52, 'group','B','Bosnia y Herzegovina','Qatar',          '2026-06-24 13:00:00-05', 'Seattle'),
(53, 'group','C','Escocia',        'Brasil',               '2026-06-24 21:00:00-05', 'Miami'),
(54, 'group','C','Marruecos',      'Haití',                '2026-06-24 21:00:00-05', 'Atlanta'),
(55, 'group','D','Turquía',        'USA',                  '2026-06-25 17:00:00-05', 'Los Ángeles'),
(56, 'group','D','Paraguay',       'Australia',            '2026-06-25 17:00:00-05', 'San Francisco'),
(57, 'group','E','Ecuador',        'Alemania',             '2026-06-25 13:00:00-05', 'Filadelfia'),
(58, 'group','E','Curazao',        'Costa de Marfil',      '2026-06-25 13:00:00-05', 'NY/NJ'),
(59, 'group','F','Túnez',          'Países Bajos',         '2026-06-25 21:00:00-05', 'Dallas'),
(60, 'group','F','Japón',          'Suecia',               '2026-06-25 21:00:00-05', 'Kansas City'),
(61, 'group','G','Nueva Zelanda',  'Bélgica',              '2026-06-26 17:00:00-05', 'Seattle'),
(62, 'group','G','Egipto',         'Irán',                 '2026-06-26 17:00:00-05', 'Vancouver'),
(63, 'group','H','Uruguay',        'España',               '2026-06-26 13:00:00-05', 'Houston'),
(64, 'group','H','Cabo Verde',     'Arabia Saudita',       '2026-06-26 13:00:00-05', 'Guadalajara'),
(65, 'group','I','Noruega',        'Francia',              '2026-06-26 21:00:00-05', 'Boston'),
(66, 'group','I','Senegal',        'Iraq',                 '2026-06-26 21:00:00-05', 'Toronto'),
(67, 'group','J','Jordania',       'Argentina',            '2026-06-27 17:00:00-05', 'Kansas City'),
(68, 'group','J','Argelia',        'Austria',              '2026-06-27 17:00:00-05', 'Dallas'),
(69, 'group','K','Colombia',       'Portugal',             '2026-06-27 13:00:00-05', 'Miami'),
(70, 'group','K','RD Congo',       'Uzbekistán',           '2026-06-27 13:00:00-05', 'Atlanta'),
(71, 'group','L','Panamá',         'Inglaterra',           '2026-06-27 21:00:00-05', 'NY/NJ'),
(72, 'group','L','Croacia',        'Ghana',                '2026-06-27 21:00:00-05', 'Filadelfia');

-- ============================================================
-- RONDA DE 32 (16 partidos — 28 jun al 3 jul)
-- Equipos por definir (1A=1º grupo A, 2B=2º grupo B, 3X=mejor 3º).
-- El admin reemplaza estos códigos por los equipos clasificados.
-- ============================================================
INSERT INTO public.matches (match_number, stage, home_team, away_team, match_date)
VALUES
(73, 'r32', '1A', '3C', '2026-06-28 14:00:00-05'),
(74, 'r32', '1B', '3A', '2026-06-28 18:00:00-05'),
(75, 'r32', '1C', '3D', '2026-06-29 14:00:00-05'),
(76, 'r32', '1D', '3B', '2026-06-29 18:00:00-05'),
(77, 'r32', '1E', '3F', '2026-06-30 14:00:00-05'),
(78, 'r32', '1F', '3E', '2026-06-30 18:00:00-05'),
(79, 'r32', '1G', '3H', '2026-07-01 14:00:00-05'),
(80, 'r32', '1H', '3G', '2026-07-01 18:00:00-05'),
(81, 'r32', '1I', '2L', '2026-07-01 20:00:00-05'),
(82, 'r32', '1J', '2K', '2026-07-02 14:00:00-05'),
(83, 'r32', '1K', '2J', '2026-07-02 18:00:00-05'),
(84, 'r32', '1L', '2I', '2026-07-02 20:00:00-05'),
(85, 'r32', '2A', '2C', '2026-07-03 14:00:00-05'),
(86, 'r32', '2B', '2D', '2026-07-03 16:00:00-05'),
(87, 'r32', '2E', '2G', '2026-07-03 18:00:00-05'),
(88, 'r32', '2F', '2H', '2026-07-03 20:00:00-05');

-- ============================================================
-- OCTAVOS DE FINAL (8 partidos — 4 al 7 jul)
-- ============================================================
INSERT INTO public.matches (match_number, stage, home_team, away_team, match_date)
VALUES
(89, 'r16', 'W73', 'W74', '2026-07-04 14:00:00-05'),
(90, 'r16', 'W75', 'W76', '2026-07-04 18:00:00-05'),
(91, 'r16', 'W77', 'W78', '2026-07-05 14:00:00-05'),
(92, 'r16', 'W79', 'W80', '2026-07-05 18:00:00-05'),
(93, 'r16', 'W81', 'W82', '2026-07-06 14:00:00-05'),
(94, 'r16', 'W83', 'W84', '2026-07-06 18:00:00-05'),
(95, 'r16', 'W85', 'W86', '2026-07-07 14:00:00-05'),
(96, 'r16', 'W87', 'W88', '2026-07-07 18:00:00-05');

-- ============================================================
-- CUARTOS DE FINAL (4 partidos — 9 al 11 jul)
-- ============================================================
INSERT INTO public.matches (match_number, stage, home_team, away_team, match_date)
VALUES
(97,  'qf', 'W89', 'W90', '2026-07-09 15:00:00-05'),
(98,  'qf', 'W91', 'W92', '2026-07-09 19:00:00-05'),
(99,  'qf', 'W93', 'W94', '2026-07-11 15:00:00-05'),
(100, 'qf', 'W95', 'W96', '2026-07-11 19:00:00-05');

-- ============================================================
-- SEMIFINALES (2 partidos — 14 y 15 jul)
-- ============================================================
INSERT INTO public.matches (match_number, stage, home_team, away_team, match_date)
VALUES
(101, 'sf', 'W97',  'W98',  '2026-07-14 19:00:00-05'),
(102, 'sf', 'W99',  'W100', '2026-07-15 19:00:00-05');

-- ============================================================
-- TERCER LUGAR (1 partido — 18 jul, Miami)
-- ============================================================
INSERT INTO public.matches (match_number, stage, home_team, away_team, match_date, venue)
VALUES
(103, '3rd', 'L101', 'L102', '2026-07-18 15:00:00-05', 'Miami');

-- ============================================================
-- GRAN FINAL (1 partido — 19 jul, MetLife Stadium, NY/NJ)
-- ============================================================
INSERT INTO public.matches (match_number, stage, home_team, away_team, match_date, venue)
VALUES
(104, 'final', 'W101', 'W102', '2026-07-19 15:00:00-05', 'NY/NJ');
