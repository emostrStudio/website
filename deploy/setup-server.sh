#!/usr/bin/env bash
set -euo pipefail

here=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)

domain=${DOMAIN:-emostr.com}
email=${EMAIL:-}
with_www=${WITH_WWW:-1}
deploy_user=${DEPLOY_USER:-deploy}
app_dir=${APP_DIR:-/var/www/emostr}
service=${SERVICE:-emostr-web}
port=${PORT:-3000}
node_major=${NODE_MAJOR:-24}
extra_keys=${DEPLOY_KEYS:-}
ssh_port=${SSH_PORT:-$(awk '{print $4}' <<<"${SSH_CONNECTION:-}")}
ssh_port=${ssh_port:-22}
skip_ufw=${SKIP_UFW:-0}

step() { printf '\n\033[1;31m▸\033[0m \033[1m%s\033[0m\n' "$*"; }
warn() { printf '\033[1;33m!\033[0m %s\n' "$*" >&2; }

render() {
  sed \
    -e "s|__DOMAIN__|$domain|g" \
    -e "s|__APP_DIR__|$app_dir|g" \
    -e "s|__PORT__|$port|g" \
    -e "s|__USER__|$deploy_user|g" \
    "$1"
}

if [[ $EUID -ne 0 ]]; then
  echo "setup: запустите от root или через sudo" >&2
  exit 1
fi

. /etc/os-release
[[ ${ID:-} == ubuntu ]] || warn "скрипт рассчитан на Ubuntu, а тут ${PRETTY_NAME:-неизвестная ОС}"

step "Системные пакеты"
export DEBIAN_FRONTEND=noninteractive
apt-get update -q
apt-get install -yq ca-certificates curl gnupg nginx certbot ufw
systemctl enable --now nginx

step "Node.js $node_major"
if ! command -v node >/dev/null || [[ $(node -p 'process.versions.node.split(".")[0]') != "$node_major" ]]; then
  curl -fsSL "https://deb.nodesource.com/setup_${node_major}.x" | bash -
  apt-get install -yq nodejs
fi
echo "node $(node --version)"

step "Пользователь $deploy_user"
id "$deploy_user" &>/dev/null || useradd --create-home --shell /bin/bash "$deploy_user"
usermod -aG systemd-journal "$deploy_user"
home=$(getent passwd "$deploy_user" | cut -d: -f6)
install -d -m 700 -o "$deploy_user" -g "$deploy_user" "$home/.ssh"
keys="$home/.ssh/authorized_keys"
sources=("$keys" /root/.ssh/authorized_keys)
if [[ -n ${SUDO_USER:-} ]]; then
  sources+=("$(getent passwd "$SUDO_USER" | cut -d: -f6)/.ssh/authorized_keys")
fi
{
  cat "${sources[@]}" 2>/dev/null || true
  printf '%s\n' "$extra_keys"
} | grep -E '^(ssh-|ecdsa-|sk-)' | sort -u > "$keys.new" || true
mv "$keys.new" "$keys"
chown "$deploy_user:$deploy_user" "$keys"
chmod 600 "$keys"
echo "ключей в authorized_keys: $(wc -l < "$keys")"

step "Каталоги в $app_dir"
install -d -o "$deploy_user" -g "$deploy_user" "$app_dir" "$app_dir/releases" "$app_dir/incoming" "$app_dir/shared"
[[ -f $app_dir/shared/.env ]] || install -m 600 -o "$deploy_user" -g "$deploy_user" /dev/null "$app_dir/shared/.env"

step "systemd: $service"
render "$here/systemd/emostr-web.service" > "/etc/systemd/system/$service.service"
systemctl daemon-reload
systemctl enable "$service"

sudoers="/etc/sudoers.d/$service"
printf '%s ALL=(root) NOPASSWD: /usr/bin/systemctl restart %s, /usr/bin/systemctl status %s\n' \
  "$deploy_user" "$service" "$service" > "$sudoers"
chmod 440 "$sudoers"
visudo -cf "$sudoers" >/dev/null

step "NGINX"
install -d /var/www/letsencrypt
rm -f /etc/nginx/sites-enabled/default
render "$here/nginx/upstream.conf" > /etc/nginx/conf.d/emostr.conf
render "$here/nginx/headers.conf" > /etc/nginx/snippets/emostr-headers.conf
render "$here/nginx/locations.conf" > /etc/nginx/snippets/emostr-locations.conf

site=/etc/nginx/sites-available/emostr.conf
cert="/etc/letsencrypt/live/$domain/fullchain.pem"

if [[ ! -f $cert ]]; then
  render "$here/nginx/site-http.conf" > "$site"
  ln -sfn "$site" /etc/nginx/sites-enabled/emostr.conf
  nginx -t
  systemctl reload-or-restart nginx

  if [[ -n $email ]]; then
    step "Сертификат Let's Encrypt для $domain"
    names=(-d "$domain")
    [[ $with_www == 1 ]] && names+=(-d "www.$domain")
    certbot certonly --webroot -w /var/www/letsencrypt "${names[@]}" \
      --email "$email" --agree-tos --no-eff-email --non-interactive \
      || warn "сертификат не выпущен — проверьте A-записи $domain (и www.$domain, либо запустите с WITH_WWW=0) и повторите запуск"
  else
    warn "EMAIL не задан — сайт пока работает по HTTP. Для HTTPS запустите повторно с EMAIL=you@example.com"
  fi
fi

if [[ -f $cert ]]; then
  render "$here/nginx/site-https.conf" > "$site"
  ln -sfn "$site" /etc/nginx/sites-enabled/emostr.conf
  install -d /etc/letsencrypt/renewal-hooks/deploy
  printf '#!/bin/sh\nsystemctl reload nginx\n' > /etc/letsencrypt/renewal-hooks/deploy/reload-nginx.sh
  chmod 755 /etc/letsencrypt/renewal-hooks/deploy/reload-nginx.sh
fi

nginx -t
systemctl reload-or-restart nginx

if [[ $skip_ufw != 1 ]]; then
  step "Firewall (SSH на порту $ssh_port, HTTP, HTTPS)"
  ufw allow "$ssh_port/tcp"
  ufw allow 'Nginx Full'
  ufw --force enable
fi

step "Готово"
cat <<EOF
Сервер подготовлен. Дальше:
  1. Выкатите первый релиз: DEPLOY_HOST=<ip> npm run deploy
     или запушьте в main — сработает GitHub Actions.
  2. Переменные окружения приложения: $app_dir/shared/.env
  3. Логи: journalctl -u $service -f
EOF
