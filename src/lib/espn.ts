// Mapeo de nombres de ESPN (inglés) a los nombres del fixture (español).
const MAP: Record<string, string> = {
  'mexico': 'México',
  'south africa': 'Sudáfrica',
  'south korea': 'Corea del Sur',
  'korea republic': 'Corea del Sur',
  'czechia': 'Rep. Checa',
  'czech republic': 'Rep. Checa',
  'switzerland': 'Suiza',
  'canada': 'Canadá',
  'qatar': 'Qatar',
  'bosnia and herzegovina': 'Bosnia y Herzegovina',
  'bosnia herzegovina': 'Bosnia y Herzegovina',
  'brazil': 'Brasil',
  'morocco': 'Marruecos',
  'haiti': 'Haití',
  'scotland': 'Escocia',
  'united states': 'USA',
  'usa': 'USA',
  'paraguay': 'Paraguay',
  'australia': 'Australia',
  'turkey': 'Turquía',
  'turkiye': 'Turquía',
  'germany': 'Alemania',
  'curacao': 'Curazao',
  'ivory coast': 'Costa de Marfil',
  'cote divoire': 'Costa de Marfil',
  'ecuador': 'Ecuador',
  'netherlands': 'Países Bajos',
  'japan': 'Japón',
  'sweden': 'Suecia',
  'tunisia': 'Túnez',
  'belgium': 'Bélgica',
  'egypt': 'Egipto',
  'iran': 'Irán',
  'new zealand': 'Nueva Zelanda',
  'spain': 'España',
  'cape verde': 'Cabo Verde',
  'saudi arabia': 'Arabia Saudita',
  'uruguay': 'Uruguay',
  'france': 'Francia',
  'senegal': 'Senegal',
  'iraq': 'Iraq',
  'norway': 'Noruega',
  'argentina': 'Argentina',
  'algeria': 'Argelia',
  'austria': 'Austria',
  'jordan': 'Jordania',
  'portugal': 'Portugal',
  'dr congo': 'RD Congo',
  'congo dr': 'RD Congo',
  'uzbekistan': 'Uzbekistán',
  'colombia': 'Colombia',
  'england': 'Inglaterra',
  'croatia': 'Croacia',
  'ghana': 'Ghana',
  'panama': 'Panamá',
}

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '') // quita acentos
    .replace(/[.,&'’]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

// Devuelve el nombre en español; si no lo encuentra, deja el de ESPN.
export function toSpanishTeam(espnName: string): string {
  return MAP[normalize(espnName)] ?? espnName
}
