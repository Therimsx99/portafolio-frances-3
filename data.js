// ============================================================
// AQUÍ SE AGREGAN LAS TAREAS.
//
// Para agregar una tarea nueva, copia uno de los bloques { ... }
// de abajo, pégalo antes del cierre "];" y cambia los valores.
// No borres las comas ni las llaves { }.
//
// Categorías disponibles (usa el "id" exacto, en minúsculas):
//   gramatica, conjugacion, vocabulario, expresion-escrita,
//   comprension-oral, lectura, cultura
//
// Estado: "entregado" o "borrador"
//
// "lien" es opcional: pega ahí un enlace de Google Drive, foto
// subida a algún sitio, etc. Si no tienes enlace, deja: ""
// ============================================================

export const devoirs = [
  {
    id: "d1",
    titre: "Présentation de moi",
    categorie: "expresion-escrita",
    date: "2026-09-04",
    statut: "entregado",
    description:
      "Bonjour, je m'appelle Viviana, je suis mexicaine. Je suis née à Ciudad de México. J'habite à Puebla dans le quartier Paraíso Mayorazgo, dans une mansion. Je suis étudiante en relations internationales à l'université BUAP. J'aime nager, jouer à des jeux-vidéo, lire et regarder des films avec mon petit-ami.",
    lien: "/video.mp4",
  },
  {
    id: "d2",
    titre: "Ma magnifique maison",
    categorie: "expresion-escrita",
    date: "2026-09-04",
    statut: "entregado",
    description:
      "Ma maison a une surface de 1 300 m². Au rez-de-chaussée il y a une cuisine, un salon et une salle de bains. À la terrasse il y a un jacuzzi, une piscine et un feu de joie. Il y a aussi un garage. À l'intérieur, il y a un escalier et des fenêtres. Au premier étage, il y a un balcon avec des chaises. Dans la chambre il y a aussi un bureau avec un grand lit. Ma pièce préférée est la chambre parce qu'elle est grande et confortable.",
    lien: "/maison.jpeg",
  },
];
