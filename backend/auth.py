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

    with db.get_db().cursor() as cursor:
        cursor.execute("SELECT * FROM users WHERE email=%s;", (email,))
        existing_user = cursor.fetchone()

    # if user exists, return
    if existing_user != None:
        return False

    with db.get_db().cursor() as cursor:
        cursor.execute("INSERT INTO users (email, passhash, salt, first_name, last_name) VALUES (%s, %s, %s, %s, %s);",
                       (email, hash, salt, first_name, last_name))

    db.get_db().commit()

    return True


def authenticate_user(email: str, password: str):
    with db.get_db().cursor() as cursor:
        cursor.execute("SELECT * FROM users WHERE email=%s;", (email,))
        user = cursor.fetchone()

    if user == None:
        return
    entered_hash = hash_password(password, user["salt"])
    if entered_hash != user["passhash"]:
        return

    session = generate_random_sha256()
    with db.get_db().cursor() as cursor:
        cursor.execute(
            "UPDATE users SET session_token=%s WHERE email=%s;", (session, email))

    db.get_db().commit()
    return session


def get_user_from_session(session: str):
    with db.get_db().cursor() as cursor:
        cursor.execute(
            "SELECT email, first_name, last_name, id FROM users WHERE session_token=%s;", (session,))
        existing_user = cursor.fetchone()

    return existing_user
