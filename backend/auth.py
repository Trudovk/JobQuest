from . import db
from random import randbytes
from hashlib import sha1, sha256


def generate_random_sha1():
    bytes = randbytes(128)
    return sha1(bytes, usedforsecurity=True).hexdigest()


def generate_random_sha256():
    bytes = randbytes(256)
    return sha256(bytes, usedforsecurity=True).hexdigest()


def hash_password(password: str, salt: str):
    hash = sha256()
    hash.update(password.encode("utf8"))
    hash.update(salt.encode("ascii"))
    return hash.hexdigest()


def register_user(email: str, password: str, first_name: str, last_name: str):
    salt = generate_random_sha1()
    hash = hash_password(password, salt)

    query = db.get_db().execute("SELECT * FROM users WHERE email=?;", (email,))
    existing_user = query.fetchone()

    # if user exists, return
    if existing_user != None:
        return False

    db.get_db().execute('INSERT INTO users ("email", "passhash", "salt", "first_name", "last_name") VALUES (?, ?, ?, ?, ?);',
                        (email, hash, salt, first_name, last_name))
    db.get_db().commit()

    return True


def authenticate_user(email: str, password: str):
    query = db.get_db().execute("SELECT * FROM users WHERE email=?;", (email,))
    returned = query.fetchone()
    if returned == None:
        return
    user = dict(returned)
    if user == None:
        return
    entered_hash = hash_password(password, user["salt"])
    if entered_hash != user["passhash"]:
        return

    session = generate_random_sha256()
    db.get_db().execute("UPDATE users SET session_token=? WHERE email=?;", (session, email))
    db.get_db().commit()
    return session


def get_user_from_session(session: str):
    query = db.get_db().execute(
        "SELECT email, first_name, last_name, id FROM users WHERE session_token=?;", (session,))
    existing_user = query.fetchone()
    return dict(existing_user)
