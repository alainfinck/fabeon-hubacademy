#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

echo "Fabeon HubAcademy — démarrage"
echo ""

if ! command -v node >/dev/null 2>&1; then
  echo "Erreur : Node.js n'est pas installé."
  exit 1
fi

if [ ! -d node_modules ]; then
  echo "→ Installation des dépendances…"
  npm install
  echo ""
fi

echo "→ API SQLite  : http://localhost:3001"
echo "→ Frontend    : http://localhost:5173"
echo ""
echo "Arrêt : Ctrl+C"
echo ""

exec npm run dev
