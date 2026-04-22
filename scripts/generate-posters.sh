#!/usr/bin/env bash
# generate-posters.sh
# For every .mp4 under assets/, generates a sibling *-poster.jpg via ffmpeg if one
# doesn't already exist. Safe to re-run (idempotent).
# Usage: ./scripts/generate-posters.sh [--dry-run]

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

DRY_RUN=false
if [[ "${1:-}" == "--dry-run" ]]; then
  DRY_RUN=true
  echo "[dry-run] No files will be written."
fi

generated=0
skipped=0
errors=0

while IFS= read -r mp4; do
  # Derive sibling poster path: strip .mp4, append -poster.jpg
  poster="${mp4%.mp4}-poster.jpg"

  if [[ -f "$poster" ]]; then
    echo "[skip] poster exists: ${poster#"$REPO_ROOT/"}"
    ((skipped++)) || true
    continue
  fi

  rel_mp4="${mp4#"$REPO_ROOT/"}"
  rel_poster="${poster#"$REPO_ROOT/"}"

  if $DRY_RUN; then
    echo "[dry-run] ffmpeg → $rel_poster"
  else
    if ffmpeg -nostdin -ss 00:00:01 -i "$mp4" -frames:v 1 -q:v 2 "$poster" -y \
         -loglevel error 2>&1; then
      echo "[generated] $rel_poster"
      ((generated++)) || true
    else
      echo "[error] ffmpeg failed for: $rel_mp4"
      ((errors++)) || true
    fi
    continue
  fi
  ((generated++)) || true

done < <(find "$REPO_ROOT/assets" -type f -name "*.mp4" | sort)

echo ""
echo "Done. generated=$generated  skipped=$skipped  errors=$errors"
if [[ $errors -gt 0 ]]; then
  exit 1
fi
