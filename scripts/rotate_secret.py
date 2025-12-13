#!/usr/bin/env python3
"""
Utility to rotate the FLASK_SECRET_KEY stored in the project .env file.

Run `python scripts/rotate_secret.py` before redeploying and the script will
write a freshly generated key that docker-compose picks up automatically.
"""
from __future__ import annotations

import re
import secrets
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parents[1]
ENV_PATH = PROJECT_ROOT / ".env"


def update_env_file(new_secret: str) -> None:
    env_lines = []
    updated = False

    if ENV_PATH.exists():
        with ENV_PATH.open("r", encoding="utf-8") as env_file:
            for line in env_file:
                if re.match(r"\s*FLASK_SECRET_KEY\s*=", line):
                    env_lines.append(f"FLASK_SECRET_KEY={new_secret}\n")
                    updated = True
                else:
                    env_lines.append(line)

    if not updated:
        env_lines.append(f"FLASK_SECRET_KEY={new_secret}\n")

    with ENV_PATH.open("w", encoding="utf-8") as env_file:
        env_file.writelines(env_lines)


def main() -> None:
    new_secret = secrets.token_hex(32)
    update_env_file(new_secret)
    print(f"Generated new FLASK_SECRET_KEY and stored it in {ENV_PATH}")


if __name__ == "__main__":
    main()
