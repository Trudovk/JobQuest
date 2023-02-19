from os import mkdir
from flask_cors import CORS
from flask import Flask, send_from_directory, request, Response
import captchas
import api
from requests import request as rq

import mimetypes
mimetypes.add_type('application/javascript', '.js')
mimetypes.add_type('application/javascript', '.mjs')
mimetypes.add_type('application/javascript', '.cjs')
mimetypes.add_type('text/css', '.css')


def create_app():
    app = Flask(__name__)
    from json import load

    app.config.from_file("./settings.json", load=load)

    if app.config["DEBUG"]:
        CORS(app)

    import db
    db.init_app(app)

    return app


app = create_app()


def proxy_to_vite_dev_server(request, dir: str):

    res = rq(
        method=request.method,
        url=request.url.replace(
            request.host_url, f'http://localhost:5173/{dir}'),
        headers={k: v for k, v in request.headers if k.lower() == 'host'},
        data=request.get_data(),
        cookies=request.cookies,
        allow_redirects=False,
    )

    excluded_headers = ['content-encoding',
                        'content-length', 'transfer-encoding', 'connection']
    headers = [
        (k, v) for k, v in res.raw.headers.items()
        if k.lower() not in excluded_headers
    ]
    print(request.url, headers)

    return Response(res.content, res.status_code, headers)


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path: str):
    # if app.config["DEBUG"]:
    #     return proxy_to_vite_dev_server(request, "")

    return send_from_directory(app.config["APP_FOLDER"], "index.html")


@app.route('/assets/<path:path>')
def app_assets(path: str):
    # if app.config["DEBUG"]:
    #     return proxy_to_vite_dev_server(request, "assets/")

    return send_from_directory(app.config["APP_FOLDER"], "assets/" + path)


app.register_blueprint(api.api_bp, url_prefix="/api")

# @app.before_request
# def check_user_role():
#     user_role = session[""]
#     check_route_access(request.endpoint, )
