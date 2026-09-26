export interface Book {
  id: string;
  nro: number;
  titulo: string;
  categoria: string;
  coleccion: string;
  mustBuy: boolean;
  chicos: boolean;
  mujeres: boolean;
  resenia: string;
  tengoDefault: boolean;
}

export const COLECCION_DISNEY = 'Novelas Inolvidables de Disney';

const b = (
  nro: number,
  titulo: string,
  categoria: string,
  mustBuy: boolean,
  chicos: boolean,
  mujeres: boolean,
  resenia: string,
  tengoDefault = false,
): Book => ({
  id: `disney-${nro}`,
  nro,
  titulo,
  categoria,
  coleccion: COLECCION_DISNEY,
  mustBuy,
  chicos,
  mujeres,
  resenia,
  tengoDefault,
});

export const BOOKS: Book[] = [
  b(2, 'Frozen', 'Nivel A: Clásicos Excelentes', true, true, true, 'Dos hermanas que descubren que el amor verdadero puede descongelar cualquier corazón.'),
  b(5, 'Coco', 'Nivel S: Obras Maestras', true, true, true, 'Un viaje emotivo por el mundo de los muertos para descubrir la historia familiar.'),
  b(7, 'Intensa Mente', 'Nivel S: Obras Maestras', true, true, true, 'Una mirada profunda y brillante a las emociones en la mente de una niña.'),
  b(28, 'Up', 'Nivel S: Obras Maestras', true, true, true, 'Una aventura en globo a Sudamérica y una de las introducciones más tristes del cine.'),
  b(33, 'Ratatouille', 'Nivel A: Clásicos Excelentes', true, true, true, 'Un ratón con un paladar fino sueña con ser un chef en París.'),
  b(43, 'Buscando a Nemo', 'Nivel S: Obras Maestras', true, true, true, 'El viaje épico por el océano de un padre pez payaso para rescatar a su hijo.'),
  b(11, 'Moana', 'Nivel A: Clásicos Excelentes', false, true, true, 'Una heroína polinesia cruza el océano para restaurar el corazón de su isla.'),
  b(12, 'Valiente', 'Nivel B: Clásicos Notables', false, true, true, 'Mérida desafía las tradiciones y debe deshacer un hechizo con su coraje.'),
  b(13, 'Encanto', 'Nivel A: Clásicos Excelentes', false, true, true, 'Una familia colombiana descubre que la verdadera magia reside en la aceptación.'),
  b(15, 'Elementos', 'Nivel B: Clásicos Notables', false, true, true, 'Una comedia romántica entre seres de fuego y agua en Ciudad Elemento.'),
  b(16, 'Enredados', 'Nivel A: Clásicos Excelentes', false, true, true, 'La moderna y divertida versión de Rapunzel fuera de su torre.'),
  b(20, 'Red', 'Nivel B: Clásicos Notables', false, true, true, 'Una adolescente lidia con la pubertad transformándose en un panda rojo gigante.'),
  b(1, 'La Bella y la Bestia', 'Nivel S: Obras Maestras', true, false, true, 'La joven que descubre el buen corazón de la bestia en un castillo hechizado.'),
  b(3, 'Blanca Nieves', 'Nivel S: Obras Maestras', true, false, true, 'El clásico fundacional sobre la princesa y los siete enanitos en el bosque.'),
  b(6, 'La Sirenita', 'Nivel A: Clásicos Excelentes', true, false, true, 'Ariel arriesga todo por conocer el mundo humano y encontrar el amor.'),
  b(10, 'Mulán', 'Nivel A: Clásicos Excelentes', true, false, true, 'Una joven valiente se disfraza de guerrero para salvar a su padre y a China.'),
  b(17, 'Alicia en el País de las Maravillas', 'Nivel S: Obras Maestras', true, false, true, 'Un viaje surrealista y lleno de locura adaptado magistralmente por Disney.'),
  b(27, 'Soul', 'Nivel A: Clásicos Excelentes', true, false, true, 'Una profunda reflexión existencial sobre el propósito de la vida y el jazz.'),
  b(8, 'La Cenicienta', 'Nivel A: Clásicos Excelentes', false, false, true, 'El cuento de hadas definitivo sobre mantener la esperanza y la bondad.'),
  b(21, 'Pocahontas', 'Nivel B: Clásicos Notables', false, false, true, 'El choque de dos mundos y el romance que busca la paz en la naturaleza.'),
  b(31, 'La Princesa y el Sapo', 'Nivel B: Clásicos Notables', false, false, true, 'El regreso a la animación tradicional en una mágica Nueva Orleans.'),
  b(34, 'La Bella Durmiente', 'Nivel A: Clásicos Excelentes', false, false, true, 'Una obra de arte visual sobre hadas y un letargo hechizado.'),
  b(38, 'El Jorobado de Notre Dame', 'Nivel A: Clásicos Excelentes', false, false, true, 'Una oscura y madura exploración del rechazo y la fe en París.'),
  b(44, 'La Dama y el Vagabundo', 'Nivel A: Clásicos Excelentes', false, false, true, 'El icónico romance canino con una de las cenas más famosas del cine.'),
  b(4, 'El Rey León', 'Nivel S: Obras Maestras', true, true, false, 'El viaje épico de Simba para recuperar su lugar en el ciclo de la vida.'),
  b(19, 'Pinocho', 'Nivel S: Obras Maestras', true, true, false, 'La marioneta que quiere ser niño en una historia oscura y aleccionadora.'),
  b(25, 'Aladdín', 'Nivel S: Obras Maestras', true, true, false, 'Un joven callejero y un genio mágico viven aventuras en Agrabah.'),
  b(26, 'Toy Story', 'Nivel S: Obras Maestras', true, true, false, 'La primera gran maravilla de Pixar sobre la vida secreta de los juguetes.'),
  b(30, 'Bambi', 'Nivel S: Obras Maestras', true, true, false, 'La majestuosa y cruda obra sobre crecer en el bosque y perder la inocencia.'),
  b(32, 'Los Increíbles', 'Nivel S: Obras Maestras', true, true, false, 'Una familia de superhéroes retirados vuelve a la acción en una joya de acción.'),
  b(35, 'Monsters Inc.', 'Nivel S: Obras Maestras', true, true, false, 'Monstruos asustadores descubren que las risas de los niños son más fuertes.'),
  b(36, 'Wall-E', 'Nivel S: Obras Maestras', true, true, false, 'Un robot basurero solitario encuentra el amor en una Tierra devastada.', true),
  b(47, 'Ralph el Demoledor', 'Nivel A: Clásicos Excelentes', true, true, false, 'El villano de un videojuego quiere demostrar que puede ser el héroe.'),
  b(9, '101 Dálmatas', 'Nivel B: Clásicos Notables', false, true, false, 'Una emocionante aventura de rescate canino en las calles de Londres.'),
  b(14, 'Dumbo', 'Nivel A: Clásicos Excelentes', false, true, false, 'El elefante de orejas gigantes que aprende a volar y a creer en sí mismo.'),
  b(18, 'El Libro de la Selva', 'Nivel A: Clásicos Excelentes', false, true, false, 'Mowgli aprende lo vital de la selva a ritmo de jazz y aventuras.'),
  b(22, 'Luca', 'Nivel B: Clásicos Notables', false, true, false, 'Un verano italiano de amistad entre dos monstruos marinos en la superficie.'),
  b(23, 'Raya y el último dragón', 'Nivel B: Clásicos Notables', false, true, false, 'Una guerra de clanes y la búsqueda del último dragón para salvar el mundo.'),
  b(24, 'Bolt', 'Nivel C: Joyas Curiosas y Coleccionistas', false, true, false, 'Un perro actor de Hollywood cree que sus superpoderes son reales.'),
  b(29, 'Lilo y Stitch', 'Nivel A: Clásicos Excelentes', false, true, false, 'Una niña hawaiana adopta a un alienígena caótico en busca de familia.'),
  b(37, 'Cars', 'Nivel A: Clásicos Excelentes', false, true, false, 'Un auto de carreras engreído aprende humildad en un pueblo olvidado.'),
  b(39, 'Un Gran Dinosaurio', 'Nivel C: Joyas Curiosas y Coleccionistas', false, true, false, 'Un joven Apatosaurio se pierde y hace equipo con un niño humano salvaje.'),
  b(40, 'Zootopia', 'Nivel A: Clásicos Excelentes', false, true, false, 'Una coneja policía y un zorro estafador resuelven un misterio urbano.'),
  b(41, '6 Grandes Héroes', 'Nivel A: Clásicos Excelentes', false, true, false, 'Un niño genio y su robot médico forman un equipo de superhéroes.'),
  b(42, 'Wish', 'Nivel B: Clásicos Notables', false, true, false, 'Una joven desea a las estrellas para salvar su reino de un rey corrupto.'),
  b(45, 'Lightyear', 'Nivel C: Joyas Curiosas y Coleccionistas', false, true, false, 'La historia de origen de ciencia ficción del famoso guardián espacial.'),
  b(46, 'Onward', 'Nivel B: Clásicos Notables', false, true, false, 'Dos hermanos elfos en un viaje mágico para pasar un día más con su padre.'),
  b(48, 'Buscando a Dory', 'Nivel B: Clásicos Notables', false, true, false, 'La entrañable aventura oceánica para encontrar a los padres de Dory.'),
  b(49, 'Mundo Extraño', 'Nivel C: Joyas Curiosas y Coleccionistas', false, true, false, 'Una familia de exploradores en una misión secreta a un entorno alienígena.'),
  b(50, 'El Zorro y el Sabueso', 'Nivel B: Clásicos Notables', false, true, false, 'La desgarradora historia de una amistad que la sociedad intenta separar.'),
];

export const CATEGORIAS = [...new Set(BOOKS.map((x) => x.categoria))].sort();
export const COLECCIONES = [...new Set(BOOKS.map((x) => x.coleccion))].sort();

/** Normaliza texto para búsqueda insensible a acentos/mayúsculas. */
export function norm(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}
