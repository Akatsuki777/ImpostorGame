import os
import sqlite3
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
DEFAULT_DB_PATH = BASE_DIR / "users.db"
DB_PATH = Path(os.getenv("SQLITE_DB_PATH", DEFAULT_DB_PATH))
MIGRATIONS_DIR = BASE_DIR / "migrations"

_migrations_ran = False


def _ensure_dirs():
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    MIGRATIONS_DIR.mkdir(parents=True, exist_ok=True)


def _run_migrations():
    global _migrations_ran
    if _migrations_ran:
        return

    _ensure_dirs()

    conn = sqlite3.connect(DB_PATH)
    conn.execute(
        "CREATE TABLE IF NOT EXISTS schema_migrations (version TEXT PRIMARY KEY)"
    )
    applied = {
        row[0]
        for row in conn.execute("SELECT version FROM schema_migrations").fetchall()
    }

    for migration in sorted(MIGRATIONS_DIR.glob("*.sql")):
        version = migration.stem.split("_", 1)[0]
        if version in applied:
            continue

        with migration.open("r", encoding="utf-8") as f:
            sql = f.read()

        if not sql.strip():
            continue

        conn.executescript(sql)
        conn.execute(
            "INSERT INTO schema_migrations (version) VALUES (?)", (version,)
        )
        conn.commit()

    conn.close()
    _migrations_ran = True


def get_db():
    _run_migrations()
    conn = sqlite3.connect(DB_PATH, check_same_thread=False)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON;")
    return conn
