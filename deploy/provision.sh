#!/usr/bin/env bash
set -euo pipefail

here=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)

host=${DEPLOY_HOST:?provision: задайте DEPLOY_HOST — IP или домен сервера}
ssh_user=${SSH_USER:?provision: задайте SSH_USER — пользователя с sudo на сервере}
port=${SSH_PORT:-22}
remote_dir=/tmp/emostr-setup

pass=()
for name in DOMAIN EMAIL WITH_WWW DEPLOY_USER APP_DIR PORT NODE_MAJOR DEPLOY_KEYS SKIP_UFW RUNNER_TOKEN RUNNER_URL RUNNER_LABELS; do
  if [[ -n ${!name:-} ]]; then
    pass+=("$name=$(printf '%q' "${!name}")")
  fi
done
pass+=("SSH_PORT=$port")

sudo_cmd=""
[[ $ssh_user == root ]] || sudo_cmd="sudo"

echo "provision: копирую deploy/ на $ssh_user@$host"
ssh -p "$port" "$ssh_user@$host" "rm -rf $remote_dir && mkdir -p $remote_dir"
scp -q -r -P "$port" "$here/." "$ssh_user@$host:$remote_dir/"

echo "provision: запускаю setup-server.sh"
ssh -t -p "$port" "$ssh_user@$host" "$sudo_cmd env ${pass[*]} bash $remote_dir/setup-server.sh; rm -rf $remote_dir"
