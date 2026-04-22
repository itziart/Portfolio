#!/usr/bin/env bash
# reorganize-assets.sh
# Reads reorganize-assets.csv and runs git mv for each row.
# Skips rows where the destination already exists (idempotent).
# Usage: ./scripts/reorganize-assets.sh [--dry-run]

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
CSV="$SCRIPT_DIR/reorganize-assets.csv"

DRY_RUN=false
if [[ "${1:-}" == "--dry-run" ]]; then
  DRY_RUN=true
  echo "[dry-run] No files will be moved."
fi

moved=0
skipped=0
errors=0

while IFS=, read -r old_path new_path; do
  # Skip blank lines and comment lines
  [[ -z "$old_path" ]] && continue
  [[ "$old_path" =~ ^[[:space:]]*# ]] && continue

  # Trim leading/trailing whitespace
  old_path="${old_path#"${old_path%%[![:space:]]*}"}"
  old_path="${old_path%"${old_path##*[![:space:]]}"}"
  new_path="${new_path#"${new_path%%[![:space:]]*}"}"
  new_path="${new_path%"${new_path##*[![:space:]]}"}"

  # Skip header row
  [[ "$old_path" == "old_path" ]] && continue

  # Skip intentionally omitted files
  [[ "$new_path" == "SKIP" ]] && continue

  src="$REPO_ROOT/$old_path"
  dst="$REPO_ROOT/$new_path"

  # Idempotency: skip if destination already exists
  if [[ -e "$dst" ]]; then
    echo "[skip] already exists: $new_path"
    ((skipped++)) || true
    continue
  fi

  # Source must exist
  if [[ ! -e "$src" ]]; then
    echo "[error] source not found: $old_path"
    ((errors++)) || true
    continue
  fi

  dst_dir="$(dirname "$dst")"

  if $DRY_RUN; then
    echo "[dry-run] mkdir -p $dst_dir"
    echo "[dry-run] git mv $old_path $new_path"
  else
    mkdir -p "$dst_dir"
    git -C "$REPO_ROOT" mv "$old_path" "$new_path"
    echo "[moved] $old_path → $new_path"
  fi
  ((moved++)) || true

done < "$CSV"

echo ""
echo "Done. moved=$moved  skipped=$skipped  errors=$errors"
if [[ $errors -gt 0 ]]; then
  exit 1
fi
