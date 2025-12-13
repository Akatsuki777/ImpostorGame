#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

echo "Rotating FLASK_SECRET_KEY..."
python3 "${PROJECT_ROOT}/scripts/rotate_secret.py"

echo "Stopping any running containers..."
cd "${PROJECT_ROOT}"
docker compose down

echo "Building and starting containers..."
docker compose up --build -d

echo "Redeploy complete."
