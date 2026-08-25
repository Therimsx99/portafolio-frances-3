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
    id: "d5",
    titre: "Exercices sur le passé composé",
    categorie: "conjugacion",
    date: "2026-08-23",
    statut: "entregado",
    description:
      "Vingt phrases conjuguées avec être et avoir, plus l'accord du participe passé.",
    lien: "",
  },
  {
    id: "d4",
    titre: "Compréhension orale — dialogue au marché",
    categorie: "comprension-oral",
    date: "2026-08-15",
    statut: "entregado",
    description: "Réponses aux dix questions après écoute de l'audio fourni en classe.",
    lien: "",
  },
  {
    id: "d3",
    titre: "Liste de vocabulaire — la nourriture",
    categorie: "vocabulario",
    date: "2026-08-13",
    statut: "entregado",
    description: "30 mots appris avec leur article et une phrase exemple chacun.",
    lien: "",
  },
  {
    id: "d2",
    titre: "Rédaction : une lettre à un correspondant",
    categorie: "expresion-escrita",
    date: "2026-08-13",
    statut: "entregado",
    description:
      "Lettre de 200 mots décrivant ma ville et mes habitudes du week-end.",
    lien: "",
  },
];
