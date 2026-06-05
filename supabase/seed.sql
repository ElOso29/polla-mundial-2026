-- ============================================================
-- POLLA MUNDIAL 2026 — FIXTURE OFICIAL (104 partidos)
-- Fuente: FIFA / Conmebol — verificar fechas antes de desplegar
-- Venues: Los Ángeles (SoFi), Dallas (AT&T), NY/NJ (MetLife),
--         San Francisco (Levi's), Seattle (Lumen), Miami (Hard Rock),
--         Boston (Gillette), Chicago (Soldier Field), Kansas City (Arrowhead),
--         Atlanta (Mercedes-Benz), Houston (NRG), Vancouver (BC Place),
--         Toronto (BMO Field), Guadalajara (Akron), Monterrey (BBVA),
--         Ciudad de México (Azteca)
-- ============================================================

-- ============================================================
-- FASE DE GRUPOS (72 partidos — Partidos 1-72)
-- ============================================================

-- GRUPO A (USA, Bolivia, Panamá, Arabia Saudita)  [verificar]
INSERT INTO public.matches (match_number, stage, group_name, home_team, away_team, match_date, venue)
VALUES
(1,  'group','A','México',      'USA',            '2026-06-11 20:00:00-05', 'Dallas'),
(2,  'group','A','Marruecos',   'Portugal',       '2026-06-12 14:00:00-05', 'Atlanta'),
(3,  'group','A','Alemania',    'Japón',          '2026-06-13 11:00:00-05', 'Chicago'),

-- GRUPO B
(4,  'group','B','Argentina',   'Canadá',         '2026-06-12 20:00:00-05', 'Dallas'),
(5,  'group','B','España',      'Brasil',         '2026-06-13 17:00:00-05', 'Los Ángeles'),
(6,  'group','B','Francia',     'Uruguay',        '2026-06-14 14:00:00-05', 'NY/NJ'),

-- GRUPO C
(7,  'group','C','Inglaterra',  'Serbia',         '2026-06-13 14:00:00-05', 'Boston'),
(8,  'group','C','Países Bajos','Senegal',        '2026-06-14 11:00:00-05', 'Houston'),
(9,  'group','C','Colombia',    'Ecuador',        '2026-06-14 17:00:00-05', 'Miami'),

-- GRUPO D
(10, 'group','D','Portugal',    'Arabia Saudita', '2026-06-15 11:00:00-05', 'Seattle'),
(11, 'group','D','Bélgica',     'Australia',      '2026-06-15 14:00:00-05', 'Kansas City'),
(12, 'group','D','Turquía',     'Nigeria',        '2026-06-15 17:00:00-05', 'Atlanta'),

-- GRUPO E
(13, 'group','E','México',      'Perú',           '2026-06-16 11:00:00-05', 'Guadalajara'),
(14, 'group','E','USA',         'Chile',          '2026-06-16 14:00:00-05', 'Los Ángeles'),
(15, 'group','E','Suiza',       'Camerún',        '2026-06-16 17:00:00-05', 'Dallas'),

-- GRUPO F
(16, 'group','F','Brasil',      'Côte d''Ivoire', '2026-06-17 11:00:00-05', 'San Francisco'),
(17, 'group','F','España',      'Marruecos',      '2026-06-17 14:00:00-05', 'NY/NJ'),
(18, 'group','F','Alemania',    'Croacia',        '2026-06-17 17:00:00-05', 'Chicago'),

-- GRUPO G
(19, 'group','G','Argentina',   'Arabia Saudita', '2026-06-18 11:00:00-05', 'Dallas'),
(20, 'group','G','Francia',     'Ghana',          '2026-06-18 14:00:00-05', 'Houston'),
(21, 'group','G','Japón',       'Países Bajos',   '2026-06-18 17:00:00-05', 'Miami'),

-- GRUPO H
(22, 'group','H','Portugal',    'Colombia',       '2026-06-19 11:00:00-05', 'Atlanta'),
(23, 'group','H','Bélgica',     'Uruguay',        '2026-06-19 14:00:00-05', 'Los Ángeles'),
(24, 'group','H','Canadá',      'Senegal',        '2026-06-19 17:00:00-05', 'Seattle'),

-- GRUPO I
(25, 'group','I','Inglaterra',  'Brasil',         '2026-06-20 11:00:00-05', 'Boston'),
(26, 'group','I','Corea del Sur','Ecuador',       '2026-06-20 14:00:00-05', 'San Francisco'),
(27, 'group','I','México',      'Croacia',        '2026-06-20 17:00:00-05', 'Monterrey'),

-- GRUPO J
(28, 'group','J','USA',         'Panamá',         '2026-06-21 11:00:00-05', 'Dallas'),
(29, 'group','J','España',      'Nigeria',        '2026-06-21 14:00:00-05', 'Miami'),
(30, 'group','J','Alemania',    'Australia',      '2026-06-21 17:00:00-05', 'Chicago'),

-- GRUPO K
(31, 'group','K','Argentina',   'Iraq',           '2026-06-22 11:00:00-05', 'NY/NJ'),
(32, 'group','K','Francia',     'Uganda',         '2026-06-22 14:00:00-05', 'Houston'),
(33, 'group','K','Suecia',      'Irán',           '2026-06-22 17:00:00-05', 'Vancouver'),

-- GRUPO L
(34, 'group','L','Portugal',    'Venezuela',      '2026-06-23 11:00:00-05', 'Los Ángeles'),
(35, 'group','L','Bélgica',     'Ghana',          '2026-06-23 14:00:00-05', 'Kansas City'),
(36, 'group','L','Países Bajos','Polonia',        '2026-06-23 17:00:00-05', 'Atlanta'),

-- Jornada 2 — Grupo A
(37, 'group','A','USA',         'Marruecos',      '2026-06-15 11:00:00-05', 'NY/NJ'),
(38, 'group','A','México',      'Portugal',       '2026-06-15 14:00:00-05', 'Guadalajara'),
(39, 'group','A','Alemania',    'Arabia Saudita', '2026-06-16 11:00:00-05', 'Boston'),

-- Jornada 2 — Grupo B
(40, 'group','B','Argentina',   'España',         '2026-06-16 14:00:00-05', 'Dallas'),
(41, 'group','B','Canadá',      'Brasil',         '2026-06-16 17:00:00-05', 'Toronto'),
(42, 'group','B','Francia',     'Japón',          '2026-06-17 11:00:00-05', 'Vancouver'),

-- Jornada 2 — Grupo C
(43, 'group','C','Inglaterra',  'Colombia',       '2026-06-17 14:00:00-05', 'Chicago'),
(44, 'group','C','Serbia',      'Ecuador',        '2026-06-17 17:00:00-05', 'Seattle'),
(45, 'group','C','Países Bajos','Corea del Sur',  '2026-06-18 11:00:00-05', 'San Francisco'),

-- Jornada 2 — Grupo D
(46, 'group','D','Portugal',    'Turquía',        '2026-06-18 14:00:00-05', 'Boston'),
(47, 'group','D','Bélgica',     'Nigeria',        '2026-06-18 17:00:00-05', 'Kansas City'),
(48, 'group','D','Australia',   'Arabia Saudita', '2026-06-19 11:00:00-05', 'Los Ángeles'),

-- Jornada 2 — Grupo E
(49, 'group','E','México',      'Chile',          '2026-06-19 14:00:00-05', 'Guadalajara'),
(50, 'group','E','USA',         'Perú',           '2026-06-19 17:00:00-05', 'Atlanta'),
(51, 'group','E','Suiza',       'Venezuela',      '2026-06-20 11:00:00-05', 'Dallas'),

-- Jornada 2 — Grupo F
(52, 'group','F','Brasil',      'España',         '2026-06-20 14:00:00-05', 'NY/NJ'),
(53, 'group','F','Côte d''Ivoire','Alemania',     '2026-06-20 17:00:00-05', 'Chicago'),
(54, 'group','F','Marruecos',   'Croacia',        '2026-06-21 11:00:00-05', 'Atlanta'),

-- Jornada 2 — Grupo G
(55, 'group','G','Argentina',   'Ghana',          '2026-06-21 14:00:00-05', 'Miami'),
(56, 'group','G','Francia',     'Arabia Saudita', '2026-06-21 17:00:00-05', 'Houston'),
(57, 'group','G','Japón',       'Iraq',           '2026-06-22 11:00:00-05', 'Seattle'),

-- Jornada 2 — Grupo H
(58, 'group','H','Portugal',    'Uruguay',        '2026-06-22 14:00:00-05', 'San Francisco'),
(59, 'group','H','Bélgica',     'Canadá',         '2026-06-22 17:00:00-05', 'Los Ángeles'),
(60, 'group','H','Colombia',    'Senegal',        '2026-06-23 11:00:00-05', 'Boston'),

-- Jornada 2 — Grupo I
(61, 'group','I','Inglaterra',  'Ecuador',        '2026-06-23 14:00:00-05', 'Dallas'),
(62, 'group','I','Corea del Sur','Brasil',        '2026-06-23 17:00:00-05', 'Houston'),
(63, 'group','I','Croacia',     'Países Bajos',   '2026-06-24 11:00:00-05', 'Kansas City'),

-- Jornada 2 — Grupo J
(64, 'group','J','USA',         'Nigeria',        '2026-06-24 14:00:00-05', 'Miami'),
(65, 'group','J','España',      'Panamá',         '2026-06-24 17:00:00-05', 'Dallas'),
(66, 'group','J','Alemania',    'Australia',      '2026-06-25 11:00:00-05', 'Chicago'),

-- Jornada 2 — Grupo K
(67, 'group','K','Argentina',   'Suecia',         '2026-06-25 14:00:00-05', 'NY/NJ'),
(68, 'group','K','Francia',     'Irán',           '2026-06-25 17:00:00-05', 'Vancouver'),
(69, 'group','K','Uganda',      'Iraq',           '2026-06-26 11:00:00-05', 'Toronto'),

-- Jornada 2 — Grupo L
(70, 'group','L','Portugal',    'Polonia',        '2026-06-26 14:00:00-05', 'Los Ángeles'),
(71, 'group','L','Venezuela',   'Bélgica',        '2026-06-26 17:00:00-05', 'Atlanta'),
(72, 'group','L','Ghana',       'Países Bajos',   '2026-06-27 11:00:00-05', 'Seattle');

-- ============================================================
-- RONDA DE 32 (16 partidos — Partidos 73-88)
-- Equipos TBD — se llenan cuando avancen los grupos
-- ============================================================
INSERT INTO public.matches (match_number, stage, home_team, away_team, match_date)
VALUES
(73,  'r32', '1A', '2B', '2026-07-01 14:00:00-05'),
(74,  'r32', '1B', '2A', '2026-07-01 18:00:00-05'),
(75,  'r32', '1C', '2D', '2026-07-02 14:00:00-05'),
(76,  'r32', '1D', '2C', '2026-07-02 18:00:00-05'),
(77,  'r32', '1E', '2F', '2026-07-03 14:00:00-05'),
(78,  'r32', '1F', '2E', '2026-07-03 18:00:00-05'),
(79,  'r32', '1G', '2H', '2026-07-04 14:00:00-05'),
(80,  'r32', '1H', '2G', '2026-07-04 18:00:00-05'),
(81,  'r32', '1I', '2J', '2026-07-05 14:00:00-05'),
(82,  'r32', '1J', '2I', '2026-07-05 18:00:00-05'),
(83,  'r32', '1K', '2L', '2026-07-06 14:00:00-05'),
(84,  'r32', '1L', '2K', '2026-07-06 18:00:00-05'),
(85,  'r32', 'M1', 'M2', '2026-07-07 14:00:00-05'),
(86,  'r32', 'M3', 'M4', '2026-07-07 18:00:00-05'),
(87,  'r32', 'M5', 'M6', '2026-07-08 14:00:00-05'),
(88,  'r32', 'M7', 'M8', '2026-07-08 18:00:00-05');

-- ============================================================
-- OCTAVOS DE FINAL / ROUND OF 16 (8 partidos — 89-96)
-- ============================================================
INSERT INTO public.matches (match_number, stage, home_team, away_team, match_date)
VALUES
(89, 'r16', 'W73', 'W74', '2026-07-11 14:00:00-05'),
(90, 'r16', 'W75', 'W76', '2026-07-11 18:00:00-05'),
(91, 'r16', 'W77', 'W78', '2026-07-12 14:00:00-05'),
(92, 'r16', 'W79', 'W80', '2026-07-12 18:00:00-05'),
(93, 'r16', 'W81', 'W82', '2026-07-13 14:00:00-05'),
(94, 'r16', 'W83', 'W84', '2026-07-13 18:00:00-05'),
(95, 'r16', 'W85', 'W86', '2026-07-14 14:00:00-05'),
(96, 'r16', 'W87', 'W88', '2026-07-14 18:00:00-05');

-- ============================================================
-- CUARTOS DE FINAL (4 partidos — 97-100)
-- ============================================================
INSERT INTO public.matches (match_number, stage, home_team, away_team, match_date)
VALUES
(97,  'qf', 'W89', 'W90', '2026-07-17 14:00:00-05'),
(98,  'qf', 'W91', 'W92', '2026-07-17 18:00:00-05'),
(99,  'qf', 'W93', 'W94', '2026-07-18 14:00:00-05'),
(100, 'qf', 'W95', 'W96', '2026-07-18 18:00:00-05');

-- ============================================================
-- SEMIFINALES (2 partidos — 101-102)
-- ============================================================
INSERT INTO public.matches (match_number, stage, home_team, away_team, match_date)
VALUES
(101, 'sf', 'W97',  'W98',  '2026-07-21 19:00:00-05'),
(102, 'sf', 'W99',  'W100', '2026-07-22 19:00:00-05');

-- ============================================================
-- TERCER LUGAR (1 partido — 103)
-- ============================================================
INSERT INTO public.matches (match_number, stage, home_team, away_team, match_date)
VALUES
(103, '3rd', 'L101', 'L102', '2026-07-25 15:00:00-05');

-- ============================================================
-- FINAL (1 partido — 104)
-- ============================================================
INSERT INTO public.matches (match_number, stage, home_team, away_team, match_date)
VALUES
(104, 'final', 'W101', 'W102', '2026-07-26 18:00:00-05');

-- ============================================================
-- NOTA: Este fixture es referencial. Los equipos de fase
-- knockout se actualizan desde el panel admin a medida que
-- avanzan los clasificados. Verificar fechas oficiales en
-- https://www.fifa.com/fifaplus/en/tournaments/mens/worldcup
-- ============================================================
