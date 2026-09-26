#!/usr/bin/env bash
set -euo pipefail

release=${1:?release.sh: укажите имя релиза}
app_dir=${APP_DIR:-/var/www/emostr}
service=${SERVICE:-emostr-web}
port=${PORT:-3000}
keep=${KEEP_RELEASES:-5}

archive="$app_dir/incoming/$release.tar.gz"
target="$app_dir/releases/$release"
current="$app_dir/current"

switch_to() {
  ln -sfn "$1" "$app_dir/.current-next"
  mv -Tf "$app_dir/.current-next" "$current"
}

healthy() {
  for _ in $(seq 1 30); do
    if curl -fs -o /dev/null --max-time 3 "http://127.0.0.1:$port/"; then
      return 0
    fi
    sleep 1
  done
  return 1
}

if [[ ! -f $archive ]]; then
  echo "release: архив $archive не найден" >&2
  exit 1
fi

echo "release: распаковка $release"
rm -rf "$target"
mkdir -p "$target"
tar -xzf "$archive" -C "$target"
chmod 755 "$target"
rm -f "$archive"

if [[ -f $app_dir/shared/.env ]]; then
  ln -sfn "$app_dir/shared/.env" "$target/.env"
fi

previous=$(readlink -f "$current" 2>/dev/null || true)

echo "release: переключение current → $release"
switch_to "$target"
sudo -n /usr/bin/systemctl restart "$service"

if ! healthy; then
  echo "release: сервис не ответил на http://127.0.0.1:$port/" >&2
  journalctl -u "$service" -n 40 --no-pager >&2 || true
  if [[ -n $previous && -d $previous && $previous != "$target" ]]; then
    echo "release: откат на $(basename "$previous")" >&2
    switch_to "$previous"
    sudo -n /usr/bin/systemctl restart "$service"
    if healthy; then
      echo "release: откат выполнен, работает $(basename "$previous")" >&2
    else
      echo "release: предыдущий релиз тоже не отвечает — нужна ручная проверка" >&2
    fi
  fi
  exit 1
fi

echo "release: $release работает"

index=0
while IFS= read -r dir; do
  index=$((index + 1))
  if (( index <= keep )) || [[ $dir == "$target" || $dir == "$previous" ]]; then
    continue
  fi
  rm -rf -- "$dir"
  echo "release: удалён старый релиз $(basename "$dir")"
done < <(find "$app_dir/releases" -mindepth 1 -maxdepth 1 -type d | sort -r)
