#!/usr/bin/env bash
set -euo pipefail

root=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
cd "$root"

host=${DEPLOY_HOST:?deploy: задайте DEPLOY_HOST — IP или домен сервера}
user=${DEPLOY_USER:-deploy}
port=${DEPLOY_PORT:-22}
app_dir=${DEPLOY_PATH:-/var/www/emostr}
archive=${RELEASE_ARCHIVE:-}

revision=$(git rev-parse --short HEAD 2>/dev/null || echo local)
release="$(date -u +%Y%m%d-%H%M%S)-$revision"
remote="$user@$host"

if [[ -z $archive ]]; then
  if [[ -n $(git status --porcelain 2>/dev/null) ]]; then
    echo "deploy: в рабочей копии есть незакоммиченные изменения — они тоже попадут в релиз" >&2
  fi
  npm run typecheck
  npm run build
  archive="$root/dist/$release.tar.gz"
  bash deploy/pack.sh "$archive"
fi

echo "deploy: загрузка $release на $host"
ssh -p "$port" "$remote" "mkdir -p '$app_dir/incoming'"
scp -q -P "$port" "$archive" "$remote:$app_dir/incoming/$release.tar.gz"

echo "deploy: активация"
ssh -p "$port" "$remote" "APP_DIR='$app_dir' bash -s -- '$release'" < deploy/release.sh
