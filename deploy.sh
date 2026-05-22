#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

# Nom valide Vercel (pas le nom du dossier avec espaces)
VERCEL_PROJECT="${VERCEL_PROJECT:-fabeon-hubacademy}"

PROD=true
PREBUILT=false
MESSAGE=""

usage() {
  cat <<EOF
Usage: ./deploy.sh [options]

Déploie manuellement sur Vercel (sans attendre un push Git).
Projet Vercel : $VERCEL_PROJECT

Options:
  --prod, -p      Déploiement production (défaut)
  --preview       Déploiement preview (URL de test)
  --prebuilt      Build local (npm run build) puis envoi de dist/
  -m, --message   Message de déploiement (optionnel)
  -h, --help      Afficher cette aide

Prérequis (une seule fois):
  npx vercel login
  ./deploy.sh              # lie automatiquement le projet $VERCEL_PROJECT

Ou exportez VERCEL_TOKEN (Settings → Tokens sur vercel.com)

Exemples:
  ./deploy.sh
  ./deploy.sh --preview
  ./deploy.sh --prebuilt
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --prod|-p) PROD=true; shift ;;
    --preview) PROD=false; shift ;;
    --prebuilt) PREBUILT=true; shift ;;
    -m|--message)
      MESSAGE="${2:-}"
      shift 2
      ;;
    -h|--help) usage; exit 0 ;;
    *) echo "Option inconnue: $1"; usage; exit 1 ;;
  esac
done

VERCEL_ARGS=(--yes --name "$VERCEL_PROJECT")

if [[ -n "$MESSAGE" ]]; then
  VERCEL_ARGS+=(--meta "deployMessage=$MESSAGE")
fi

if [[ "$PROD" == "true" ]]; then
  VERCEL_ARGS+=(--prod)
  TARGET="production"
else
  TARGET="preview"
fi

echo "Fabeon HubAcademy — déploiement Vercel ($TARGET)"
echo "→ Projet : $VERCEL_PROJECT"
echo ""

if [[ -z "${VERCEL_TOKEN:-}" ]] && ! npx vercel whoami >/dev/null 2>&1; then
  echo "Erreur : connectez-vous d'abord :"
  echo "  npx vercel login"
  exit 1
fi

# Lier le dossier au bon projet (évite le nom du dossier « FABEON LEARNING CENTER »)
if [[ ! -f .vercel/project.json ]]; then
  echo "→ Liaison au projet Vercel « $VERCEL_PROJECT »…"
  npx vercel link --yes --project "$VERCEL_PROJECT"
  echo ""
fi

if [[ "$PREBUILT" == "true" ]]; then
  echo "→ Build local…"
  npm run build
  echo "→ Déploiement du build précompilé…"
  VERCEL_ARGS+=(--prebuilt)
else
  echo "→ Build et déploiement sur Vercel…"
fi

npx vercel deploy "${VERCEL_ARGS[@]}"

echo ""
echo "✓ Déploiement $TARGET terminé."
