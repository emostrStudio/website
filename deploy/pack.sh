#!/usr/bin/env bash
set -euo pipefail

root=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
out=${1:-"$root/dist/release.tar.gz"}

cd "$root"

if [[ ! -f .next/standalone/server.js ]]; then
  echo "pack: нет .next/standalone/server.js — сначала выполните npm run build" >&2
  exit 1
fi

stage=$(mktemp -d)
trap 'rm -rf "$stage"' EXIT

cp -R .next/standalone/. "$stage/"
rm -rf "$stage/.next/cache" "$stage/public" "$stage/node_modules/sharp" "$stage/node_modules/@img"
mkdir -p "$stage/.next"
cp -R .next/static "$stage/.next/static"
cp -R public "$stage/public"
git rev-parse --short HEAD > "$stage/REVISION" 2>/dev/null || echo unknown > "$stage/REVISION"

chmod -R u+rwX,go+rX,go-w "$stage"

tar_flags=()
if tar --version 2>/dev/null | grep -q bsdtar; then
  tar_flags=(--no-xattrs --no-mac-metadata)
fi

mkdir -p "$(dirname "$out")"
COPYFILE_DISABLE=1 tar "${tar_flags[@]}" -C "$stage" -czf "$out" .
echo "pack: $(du -h "$out" | cut -f1) → $out"
