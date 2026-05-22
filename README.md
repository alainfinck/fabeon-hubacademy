# Fabeon HubAcademy

Plateforme e-learning React dédiée aux métiers de l'**impression numérique** et de la **communication visuelle**.

## Fonctionnalités

- Catalogue de cours avec filtres (catégorie, niveau, format)
- Parcours : calibration couleurs, grand format, découpe Zünd, Caldera RIP, ateliers fabrication
- Lecteur de leçons (vidéo, texte, quiz, pratique)
- Inscription aux cours et suivi de progression (**SQLite**)
- Ateliers présentiel (Lyon & Paris)
- Mode jour / nuit

## Stack

- React 19 + TypeScript + Vite 8
- API Express + **SQLite** (`better-sqlite3`)
- Tailwind CSS 4

## Démarrage

```bash
npm install
npm run dev
```

Lance en parallèle :
- **API** → http://localhost:3001 (SQLite `server/data/fabeon.db`)
- **Frontend** → http://localhost:5173

La base est créée et peuplée automatiquement au premier démarrage de l'API.

### Commandes utiles

```bash
npm run dev:api       # API seule
npm run dev:web       # Frontend seul
npm run db:seed       # Re-seed manuel (si base vide)
npm run start:api     # API production
./deploy.sh           # Déploiement manuel Vercel (production)
./deploy.sh --preview # Déploiement preview
npm run deploy        # idem ./deploy.sh
```

**Déploiement Vercel manuel** (première fois) :

```bash
npx vercel login
./deploy.sh
```

Le script utilise le projet `fabeon-hubacademy` (pas le nom du dossier avec espaces).
Si le lien échoue, créez le projet sur Vercel puis relancez `./deploy.sh`.

## API (extrait)

| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/api/categories` | Catégories |
| GET | `/api/courses` | Liste des cours |
| GET | `/api/courses/:slug` | Détail cours + modules |
| GET | `/api/workshops` | Ateliers |
| GET | `/api/progress` | Progression (`x-learner-id`) |
| POST | `/api/progress/enroll` | Inscription cours |

## Structure

```
server/           # API Express + SQLite
  data/           # fabeon.db (gitignored)
src/
  api/            # Client fetch
  context/        # Data + Learning
  data/           # Seed initial (TS)
  pages/
```

## Build production

```bash
npm run build
npm run start:api   # Servir l'API
# Servir dist/ via nginx ou vite preview (proxy /api)
```
