# Mis Libros — booklistpersonal

Lista viva de libros adquiridos. Vite + React + TypeScript + Tailwind. Sin backend: tus marcas de **Tengo** se guardan en `localStorage` del navegador.

## Desarrollo

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy en Vercel

1. Sube este repo a GitHub.
2. En Vercel: Add New Project → importa el repo. Preset detectado: **Vite**. Build: `npm run build`, output: `dist`.
3. Deploy. Cada push a `main` redespliega solo.

## Agregar más listas

Edita `src/data/books.ts` y agrega entradas con la helper `b(...)`, usando un prefijo de `id` nuevo y el nombre de la colección en `coleccion`. Las marcas existentes no se borran porque se guardan por `id` estable en `localStorage` (`booklistpersonal:v1:tengo`).
