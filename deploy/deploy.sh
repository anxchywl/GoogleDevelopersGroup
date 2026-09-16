#!/usr/bin/env bash
# Pull an image by digest, start it, and roll back if it does not come up healthy.
# Usage: deploy/deploy.sh ghcr.io/anxchywl/gdg-web@sha256:...
set -euo pipefail

cd "$(dirname "$0")/.."

image="${1:?usage: deploy/deploy.sh <image@digest>}"
compose=(docker compose -f docker/compose.production.yml)
state=.deployed-image

log() { echo "[$(date -u +%H:%M:%S)] $*"; }

start() {
  GDG_IMAGE="$1" "${compose[@]}" pull --quiet
  GDG_IMAGE="$1" "${compose[@]}" up -d --wait --wait-timeout 60 --remove-orphans
}

previous="$(cat "$state" 2>/dev/null || true)"

log "deploying $image"
if start "$image"; then
  echo "$image" > "$state"
  log "healthy"
  exit 0
fi

log "new image failed its health check"
if [ -n "$previous" ]; then
  log "rolling back to $previous"
  start "$previous"
fi
exit 1
