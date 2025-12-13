from werkzeug.security import generate_password_hash, check_password_hash
from database.db import get_db

def create_user(username, password):
    db = get_db()
    try:
        db.execute(
            "INSERT INTO users (username, password_hash) VALUES (?, ?)",
            (username, generate_password_hash(password))
        )
        db.commit()
        return True, None
    except Exception as e:
        return False, str(e)


def verify_user(username, password):
    db = get_db()
    user = db.execute(
        "SELECT * FROM users WHERE username = ?", (username,)
    ).fetchone()

    if user is None:
        return False, "User not found"

    if not check_password_hash(user["password_hash"], password):
        return False, "Incorrect password"

    return True, user["id"]