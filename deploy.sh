#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

PROD=true
PREBUILT=false
MESSAGE=""

usage() {
  cat <<'EOF'
Usage: ./deploy.sh [options]

Déploie manuellement sur Vercel (sans attendre un push Git).

Options:
  --prod, -p      Déploiement production (défaut)
  --preview       Déploiement preview (URL de test)
  --prebuilt      Build local (npm run build) puis envoi de dist/
  -m, --message   Message de déploiement (optionnel)
  -h, --help      Afficher cette aide

Prérequis (une seule fois):
  npx vercel login
  npx vercel link          # lier au projet fabeon-hubacademy

Ou définir VERCEL_TOKEN (Settings → Tokens sur vercel.com)

Exemples:
  ./deploy.sh                 # production
  ./deploy.sh --preview       # preview
  ./deploy.sh --prebuilt      # build local + production
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

VERCEL_ARGS=(--yes)
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
echo ""

if [[ -z "${VERCEL_TOKEN:-}" ]] && ! npx vercel whoami >/dev/null 2>&1; then
  echo "Erreur : connectez-vous d'abord :"
  echo "  npx vercel login"
  echo "  npx vercel link"
  echo ""
  echo "Ou exportez VERCEL_TOKEN=…"
  exit 1
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
