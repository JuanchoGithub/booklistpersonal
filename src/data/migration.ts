/**
 * Renumeración de "Historias Maravillosas" según el listado oficial de Brihet.
 * El id de cada libro es `maravillosas-{nro}`: al corregir los números cambian los ids,
 * así que las marcas guardadas (tengo/pedir) se remapean del id viejo al nuevo.
 * Solo mapean los 48 libros que cambiaron de número (#4 Peter Pan y Wendy y #24 Ondina no).
 */
const HM_ID_MAP: Record<string, string> = {
  'maravillosas-1': 'maravillosas-13',
  'maravillosas-2': 'maravillosas-32',
  'maravillosas-3': 'maravillosas-5',
  'maravillosas-5': 'maravillosas-12',
  'maravillosas-6': 'maravillosas-15',
  'maravillosas-7': 'maravillosas-1',
  'maravillosas-8': 'maravillosas-16',
  'maravillosas-9': 'maravillosas-2',
  'maravillosas-10': 'maravillosas-18',
  'maravillosas-11': 'maravillosas-36',
  'maravillosas-12': 'maravillosas-7',
  'maravillosas-13': 'maravillosas-45',
  'maravillosas-14': 'maravillosas-21',
  'maravillosas-15': 'maravillosas-8',
  'maravillosas-16': 'maravillosas-42',
  'maravillosas-17': 'maravillosas-20',
  'maravillosas-18': 'maravillosas-40',
  'maravillosas-19': 'maravillosas-6',
  'maravillosas-20': 'maravillosas-22',
  'maravillosas-21': 'maravillosas-9',
  'maravillosas-22': 'maravillosas-11',
  'maravillosas-23': 'maravillosas-3',
  'maravillosas-25': 'maravillosas-44',
  'maravillosas-26': 'maravillosas-29',
  'maravillosas-27': 'maravillosas-19',
  'maravillosas-28': 'maravillosas-37',
  'maravillosas-29': 'maravillosas-35',
  'maravillosas-30': 'maravillosas-43',
  'maravillosas-31': 'maravillosas-33',
  'maravillosas-32': 'maravillosas-10',
  'maravillosas-33': 'maravillosas-17',
  'maravillosas-34': 'maravillosas-38',
  'maravillosas-35': 'maravillosas-48',
  'maravillosas-36': 'maravillosas-50',
  'maravillosas-37': 'maravillosas-28',
  'maravillosas-38': 'maravillosas-26',
  'maravillosas-39': 'maravillosas-31',
  'maravillosas-40': 'maravillosas-47',
  'maravillosas-41': 'maravillosas-14',
  'maravillosas-42': 'maravillosas-39',
  'maravillosas-43': 'maravillosas-46',
  'maravillosas-44': 'maravillosas-41',
  'maravillosas-45': 'maravillosas-30',
  'maravillosas-46': 'maravillosas-34',
  'maravillosas-47': 'maravillosas-27',
  'maravillosas-48': 'maravillosas-23',
  'maravillosas-49': 'maravillosas-25',
  'maravillosas-50': 'maravillosas-49',
};

/** Remapea ids viejos a nuevos en un registro de marcas; los ids ajenos pasan sin cambio. */
export function migrateMarks(marks: Record<string, boolean>): Record<string, boolean> {
  const out: Record<string, boolean> = {};
  for (const [id, v] of Object.entries(marks)) {
    out[HM_ID_MAP[id] ?? id] = v;
  }
  return out;
}
