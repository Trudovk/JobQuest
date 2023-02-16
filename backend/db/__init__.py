import pymysql

import click
from flask import Flask, current_app, g


def get_db():
    if 'db' not in g:
        g.db = pymysql.connect(host=current_app.config['HOST'],
                               port=current_app.config['PORT'],
                               user=current_app.config['USERNAME'],
                               password=current_app.config['PASSWORD'],
                               database=current_app.config['DATABASE'],
                               cursorclass=pymysql.cursors.DictCursor)

    return g.db


def close_db(e=None):
    db = g.pop('db', None)

    if db is not None:
        db.close()


def init_db():
    db = get_db()

    with current_app.open_resource('schema.sql') as f:
        db.executescript(f.read().decode('utf8'))


@click.command('init-db')
def init_db_command():
    print("Initializing db")
    init_db()
    click.echo('Initialized the database.')


def init_app(app: Flask):
    app.teardown_appcontext(close_db)
    app.cli.add_command(init_db_command)
