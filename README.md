# Portafolio de Francés 3 — Viviana López Chávez

Sitio para registrar y presentar como evidencia las tareas del curso de Francés 3.
Construido con React + Vite + Tailwind CSS.

Las tareas viven en el archivo `src/data.js`. Todo el que visite el sitio ve
exactamente lo mismo — no depende del navegador de cada persona.

## Probarlo en tu computador (opcional)

```bash
npm install
npm run dev
```

Abre la URL que aparece en la terminal (normalmente `http://localhost:5173`).

## Subirlo a Vercel (una sola vez)

1. Crea una cuenta gratuita en https://vercel.com (puedes entrar con GitHub, Google o correo).
2. Sube esta carpeta a un repositorio de GitHub:
   - Ve a https://github.com/new, crea un repositorio (por ejemplo `portafolio-frances-3`).
   - Sube todos los archivos de esta carpeta ("Add file → Upload files" en la web de GitHub).
3. En Vercel, haz clic en **"Add New... → Project"**.
4. Selecciona el repositorio que acabas de crear.
5. Vercel detecta automáticamente que es un proyecto de Vite — deja la configuración por defecto y haz clic en **"Deploy"**.
6. En 1–2 minutos tendrás una URL pública como `https://portafolio-frances-3.vercel.app` que puedes compartir con tu profesora.

## Cómo agregar una tarea nueva (cada vez que quieras subir algo)

1. Entra a tu repositorio en GitHub.
2. Abre la carpeta `src` y haz clic en el archivo `data.js`.
3. Haz clic en el ícono de lápiz (arriba a la derecha) para editarlo.
4. Copia uno de los bloques `{ ... }` que ya existen, pégalo antes del cierre `];`
   y cambia los valores:

   ```js
   {
     id: "d6",
     titre: "Título de tu tarea en francés",
     categorie: "gramatica",
     date: "2026-09-01",
     statut: "entregado",
     description: "Breve descripción en francés de qué trata el trabajo.",
     lien: "",
   },
   ```

   - `categorie` debe ser uno de: `gramatica`, `conjugacion`, `vocabulario`,
     `expresion-escrita`, `comprension-oral`, `lectura`, `cultura`.
   - `statut` debe ser `entregado` o `borrador`.
   - `lien` es opcional: si subiste el archivo real a Google Drive o similar,
     pega aquí el enlace; si no, déjalo como `""`.
   - `id` solo debe ser distinto al de los demás bloques (por ejemplo `d6`, `d7`...).

5. Baja al final de la página y haz clic en **"Commit changes"**.
6. Espera 1–2 minutos: Vercel detecta el cambio y actualiza la página en línea
   automáticamente, sin que tengas que hacer nada más.

La misma explicación está disponible dentro del sitio, en el botón
**"Cómo agregar una tarea"** de la parte superior.
