from . import captchas, api
from flask import Flask, request, session

from os import mkdir


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

    from . import db
    db.init_app(app)

    return app


app = create_app()


# @app.route('/', defaults={'path': ''})
# @app.route('/<path:path>')
# def catch_all(path: str):
#     return "app"


app.register_blueprint(api.api_bp, url_prefix="/api")

# @app.before_request
# def check_user_role():
#     user_role = session[""]
#     check_route_access(request.endpoint, )