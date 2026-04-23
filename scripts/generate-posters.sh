#!/usr/bin/env bash
# generate-posters.sh
# For every .mp4 under assets/, generates a sibling *-poster.jpg via ffmpeg if one
# doesn't already exist. Safe to re-run (idempotent).
# Usage:
#   ./scripts/generate-posters.sh [--dry-run]
#   ./scripts/generate-posters.sh --file assets/path/video.mp4 [--time 00:00:02] [--force] [--poster assets/path/custom-poster.jpg] [--dry-run]

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

DRY_RUN=false
FORCE=false
SEEK_TIME="00:00:01"
SINGLE_FILE=""
POSTER_OVERRIDE=""

usage() {
  cat <<'EOF'
Usage:
  ./scripts/generate-posters.sh [--dry-run]
  ./scripts/generate-posters.sh --file assets/path/video.mp4 [--time 00:00:02] [--force] [--poster assets/path/custom-poster.jpg] [--dry-run]

Options:
  --dry-run              Print what would be generated without writing files.
  --file <path>          Generate poster for a single input video.
  --time <timestamp>     Seek timestamp for frame capture (default: 00:00:01).
  --force                Regenerate even if target poster already exists.
  --poster <path>        Output poster path (single-file mode only).
  -h, --help             Show this help.
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --dry-run)
      DRY_RUN=true
      ;;
    --force)
      FORCE=true
      ;;
    --time)
      if [[ -z "${2:-}" ]]; then
        echo "[error] --time requires a value"
        usage
        exit 1
      fi
      SEEK_TIME="$2"
      shift
      ;;
    --file)
      if [[ -z "${2:-}" ]]; then
        echo "[error] --file requires a path"
        usage
        exit 1
      fi
      SINGLE_FILE="$2"
      shift
      ;;
    --poster)
      if [[ -z "${2:-}" ]]; then
        echo "[error] --poster requires a path"
        usage
        exit 1
      fi
      POSTER_OVERRIDE="$2"
      shift
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "[error] unknown argument: $1"
      usage
      exit 1
      ;;
  esac
  shift
done

if [[ -n "$POSTER_OVERRIDE" && -z "$SINGLE_FILE" ]]; then
  echo "[error] --poster can only be used together with --file"
  usage
  exit 1
fi

if $DRY_RUN; then
  echo "[dry-run] No files will be written."
fi

generated=0
skipped=0
errors=0

to_abs_path() {
  local path="$1"
  if [[ "$path" == /* ]]; then
    printf '%s\n' "$path"
  else
    printf '%s\n' "$REPO_ROOT/$path"
  fi
}

to_rel_path() {
  local path="$1"
  if [[ "$path" == "$REPO_ROOT"/* ]]; then
    printf '%s\n' "${path#"$REPO_ROOT/"}"
  else
    printf '%s\n' "$path"
  fi
}

generate_for_video() {
  local mp4="$1"
  local poster="$2"
  local rel_mp4
  local rel_poster

  rel_mp4="$(to_rel_path "$mp4")"
  rel_poster="$(to_rel_path "$poster")"

  if [[ -f "$poster" && "$FORCE" == false ]]; then
    echo "[skip] poster exists: $rel_poster"
    ((skipped++)) || true
    return
  fi

  if $DRY_RUN; then
    echo "[dry-run] ffmpeg -ss $SEEK_TIME -> $rel_poster"
    ((generated++)) || true
    return
  fi

  mkdir -p "$(dirname "$poster")"
  if ffmpeg -nostdin -ss "$SEEK_TIME" -i "$mp4" -frames:v 1 -q:v 2 "$poster" -y \
       -loglevel error 2>&1; then
    echo "[generated] $rel_poster"
    ((generated++)) || true
  else
    echo "[error] ffmpeg failed for: $rel_mp4"
    ((errors++)) || true
  fi
}

if [[ -n "$SINGLE_FILE" ]]; then
  mp4="$(to_abs_path "$SINGLE_FILE")"

  if [[ ! -f "$mp4" ]]; then
    echo "[error] input file not found: $(to_rel_path "$mp4")"
    exit 1
  fi

  if [[ "${mp4,,}" != *.mp4 ]]; then
    echo "[error] --file must point to an .mp4 file: $(to_rel_path "$mp4")"
    exit 1
  fi

  if [[ -n "$POSTER_OVERRIDE" ]]; then
    poster="$(to_abs_path "$POSTER_OVERRIDE")"
  else
    poster="${mp4%.mp4}-poster.jpg"
  fi

  generate_for_video "$mp4" "$poster"
else
  while IFS= read -r mp4; do
    # Derive sibling poster path: strip .mp4, append -poster.jpg
    poster="${mp4%.mp4}-poster.jpg"
    generate_for_video "$mp4" "$poster"
  done < <(find "$REPO_ROOT/assets" -type f -name "*.mp4" | sort)
fi

echo ""
echo "Done. generated=$generated  skipped=$skipped  errors=$errors"
if [[ $errors -gt 0 ]]; then
  exit 1
fi
