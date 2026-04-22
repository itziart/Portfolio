#!/usr/bin/env bash
# optimize-videos.sh
# Re-encodes every .mp4 under assets/ to web-friendly H.264, strips audio.
# Hero-class files (hero.mp4, 360.mp4, showreel.mp4, animation-10s.mp4):
#   1080p, CRF 23, 10 MB target budget.
# Process-class files (everything else):
#   720p, CRF 28, 5 MB target budget.
# Files already under their budget are skipped. Safe to re-run.
# Usage: ./scripts/optimize-videos.sh [--dry-run]

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

DRY_RUN=false
if [[ "${1:-}" == "--dry-run" ]]; then
  DRY_RUN=true
  echo "[dry-run] No files will be written."
fi

HERO_BUDGET_BYTES=$(( 10 * 1024 * 1024 ))
PROCESS_BUDGET_BYTES=$(( 5 * 1024 * 1024 ))

encoded=0
skipped=0
errors=0

classify() {
  local basename
  basename="$(basename "$1")"
  case "$basename" in
    hero.mp4|360.mp4|showreel.mp4|animation-10s.mp4)
      echo "hero"
      ;;
    *)
      echo "process"
      ;;
  esac
}

while IFS= read -r mp4; do
  rel="${mp4#"$REPO_ROOT/"}"
  class="$(classify "$mp4")"

  if [[ "$class" == "hero" ]]; then
    budget=$HERO_BUDGET_BYTES
    scale="scale=1920:-2"
    crf=23
    label="hero (10 MB)"
  else
    budget=$PROCESS_BUDGET_BYTES
    scale="scale=1280:-2"
    crf=28
    label="process (5 MB)"
  fi

  size=$(stat -c%s "$mp4" 2>/dev/null || stat -f%z "$mp4")

  if (( size < budget )); then
    printf "[skip] %s  (%.1f MB < budget)\n" "$rel" "$(echo "scale=1; $size/1048576" | bc)"
    (( skipped++ )) || true
    continue
  fi

  tmp="${mp4%.mp4}.tmp.mp4"

  printf "[encode] %s  (%.1f MB → %s)  class=%s\n" \
    "$rel" "$(echo "scale=1; $size/1048576" | bc)" "$label" "$class"

  if $DRY_RUN; then
    (( encoded++ )) || true
    continue
  fi

  if ffmpeg -nostdin -i "$mp4" \
       -c:v libx264 -preset slow -crf "$crf" \
       -vf "$scale" \
       -an \
       -movflags +faststart \
       "$tmp" -y \
       -loglevel error 2>&1; then

    new_size=$(stat -c%s "$tmp" 2>/dev/null || stat -f%z "$tmp")
    mv "$tmp" "$mp4"
    printf "[done]   %s  → %.1f MB\n" "$rel" "$(echo "scale=1; $new_size/1048576" | bc)"

    if (( new_size > budget )); then
      printf "[warn]   still over budget (%.1f MB > %.0f MB) — consider trimming the clip\n" \
        "$(echo "scale=1; $new_size/1048576" | bc)" "$(echo "scale=0; $budget/1048576" | bc)"
    fi

    (( encoded++ )) || true
  else
    printf "[error]  ffmpeg failed for: %s\n" "$rel"
    rm -f "$tmp"
    (( errors++ )) || true
  fi

done < <(find "$REPO_ROOT/assets" -type f -name "*.mp4" | sort)

echo ""
echo "Done. encoded=$encoded  skipped=$skipped  errors=$errors"
if (( errors > 0 )); then
  exit 1
fi
