# Fabeon HubAcademy

Plateforme e-learning React dédiée aux métiers de l'**impression numérique** et de la **communication visuelle**.

## Fonctionnalités

- Catalogue de cours avec filtres (catégorie, niveau, format)
- Parcours : calibration couleurs, grand format, découpe Zünd, Caldera RIP, ateliers fabrication
- Lecteur de leçons (vidéo, texte, quiz, pratique)
- Inscription aux cours et suivi de progression (localStorage)
- Ateliers présentiel (Lyon & Paris)
- Interface responsive en français

## Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS 4
- React Router 7
- Lucide React (icônes)

## Démarrage

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:5173](http://localhost:5173).

## Build production

```bash
npm run build
npm run preview
```

## Structure

```
src/
  components/   # UI réutilisable
  context/      # Progression apprenant
  data/         # Cours, catégories, ateliers
  pages/        # Routes de l'application
  types/        # Modèles TypeScript
```

## Évolutions possibles

- Backend (auth, API, vidéos hébergées)
- Paiement et réservation ateliers
- Certificats de fin de parcours
- Quiz interactifs avec scoring
