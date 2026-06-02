#!/usr/bin/env bash
# Local/manual VPS deploy for posearena. Builds locally and atomic-swaps.
# Mirrors the ADO CD pipeline (azure-pipelines-cd.yml) so `orch deploy posearena --target ssh` works.
#
# Usage:  bash scripts/vps-deploy.sh
# Requires:  ssh access to root@93.188.163.173 (~/.ssh/id_ed25519)

set -euo pipefail

VPS_USER="${VPS_USER:-root}"
VPS_HOST="${VPS_HOST:-93.188.163.173}"
SSH_KEY="${SSH_KEY:-$HOME/.ssh/id_ed25519}"
WEB_ROOT="${WEB_ROOT:-/srv/www/posearena}"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$PROJECT_ROOT"

echo "==> Building..."
if [[ ! -d node_modules ]]; then
  pnpm install --frozen-lockfile
fi
pnpm build

echo "==> Uploading dist/ to ${VPS_USER}@${VPS_HOST}:${WEB_ROOT}..."
INCOMING="/tmp/posearena-incoming-$(date +%s)"
ssh -i "$SSH_KEY" "${VPS_USER}@${VPS_HOST}" "rm -rf $INCOMING && mkdir -p $INCOMING"
tar -czf - -C dist . | ssh -i "$SSH_KEY" "${VPS_USER}@${VPS_HOST}" "tar -xzf - -C $INCOMING"

echo "==> Atomic swap + nginx reload..."
ssh -i "$SSH_KEY" "${VPS_USER}@${VPS_HOST}" bash -s <<ENDSSH
  set -euo pipefail
  if [ -d "${WEB_ROOT}" ]; then
    mv "${WEB_ROOT}" "${WEB_ROOT}.prev-\$(date +%s)"
  fi
  mv "$INCOMING" "${WEB_ROOT}"
  chown -R nginx:nginx "${WEB_ROOT}" 2>/dev/null || true

  if [ -d /var/www/posearena ]; then
    rsync -a --delete "${WEB_ROOT}/" /var/www/posearena/ 2>/dev/null || cp -r "${WEB_ROOT}/." /var/www/posearena/
  fi

  ls -1dt ${WEB_ROOT}.prev-* 2>/dev/null | tail -n +4 | xargs -r rm -rf
  nginx -t && systemctl reload nginx
  echo "==> Deploy complete"
ENDSSH

echo "==> Health check..."
sleep 2
curl -sf -o /dev/null -w "https://posearena.pick-app.com.mx/ → HTTP %{http_code} (%{time_total}s)\n" --max-time 10 https://posearena.pick-app.com.mx/
