from os import mkdir
from flask_cors import CORS, cross_origin
from flask import Flask, request, session, send_file, send_from_directory
from . import captchas, api

import mimetypes
mimetypes.add_type('application/javascript', '.js')
mimetypes.add_type('text/css', '.css')


def mkdir_if_doesnt_exist(path: str):
    try:
        mkdir(path)
    except FileExistsError:
        pass


mkdir_if_doesnt_exist("./data")
mkdir_if_doesnt_exist("./data/captchas")


def create_app():
    app = Flask(__name__)
    from json import load

    app.config.from_file("./settings.json", load=load)

    if app.config["DEBUG"]:
        CORS(app)

    from . import db
    db.init_app(app)

    return app


app = create_app()


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path: str):
    return send_from_directory(app.config["APP_FOLDER"], "index.html")


@app.route('/assets/<path:path>')
def app_assets(path: str):
    return send_from_directory(app.config["APP_FOLDER"], "assets/" + path)


app.register_blueprint(api.api_bp, url_prefix="/api")

# @app.before_request
# def check_user_role():
#     user_role = session[""]
#     check_route_access(request.endpoint, )
