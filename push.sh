#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

BRANCH="${BRANCH:-$(git branch --show-current)}"
REMOTE="${REMOTE:-origin}"

if ! git rev-parse --git-dir >/dev/null 2>&1; then
  echo "Erreur : ce dossier n'est pas un dépôt Git."
  exit 1
fi

if [ -n "${1:-}" ]; then
  MSG="$1"
else
  MSG="Mise à jour — $(date '+%Y-%m-%d %H:%M')"
fi

echo "→ Branche : $BRANCH"
echo "→ Remote  : $REMOTE"
echo "→ Message : $MSG"
echo ""

if git diff --quiet && git diff --cached --quiet && [ -z "$(git ls-files --others --exclude-standard)" ]; then
  echo "Rien à committer. Push uniquement…"
else
  git add -A
  git commit -m "$MSG"
fi

git push -u "$REMOTE" "$BRANCH"

echo ""
echo "✓ Poussé sur $REMOTE/$BRANCH"
