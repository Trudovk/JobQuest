from flask import Blueprint, request, redirect, make_response, send_file
from . import db, auth, captchas
from math import ceil

api_bp = Blueprint("api", __name__)


@api_bp.route("/login", methods=["POST"])
def login():
    form = request.form
    if (not 'email' in form) or (not 'password' in form):
        return redirect("/login?error=Недостаточно данных в запросе")

    session = auth.authenticate_user(form["email"], form["password"])

    if session == None:
        return redirect("/login?error=Неверный логин или пароль")

    res = make_response()
    res.set_cookie("session", session)
    return res


@api_bp.route("/register", methods=["POST"])
def register():
    form = request.form
    if (
        (not 'email' in form) or

        (not 'first-name' in form) or
        (not 'last-name' in form) or

        (not 'password' in form) or
        (not 'passwordconfirm' in form) or

        (not 'captcha' in form) or
        (not 'captcha-hash' in form)
    ):
        return redirect("/registration?error=Недостаточно данных в запросе")

    captcha_valid = captchas.validate_captcha_pair(
        form["captcha"], form["captcha-hash"]
    )

    if not captcha_valid:
        return redirect("/registration?error=Неверно введены слова с картинки")

    result = auth.register_user(
        form["email"], form["password"], form["first-name"], form["last-name"]
    )
    if not result:
        return redirect("/registration?error=Пользователь с этим Email уже существует")

    return ""


@api_bp.route("/requestcaptcha")
def request_captcha():
    hash = captchas.generate_captcha()
    return {"hash": hash, "link": f"/api/servecaptcha/{hash}"}


@api_bp.route("/servecaptcha/<hashstr>")
def serve_captcha(hashstr: str):
    return send_file(f"./data/captchas/{hashstr}.png")


@api_bp.route("/jobs")
def jobs():
    args = request.args
    page = int(args["page"])
    perpage = int(args["perpage"])
    recruiter = args["recruiter"] if 'recruiter' in args else None

    fil = "WHERE recruiter_id = ?" if recruiter != None else ""
    query_args = (perpage, (page*perpage) - perpage)
    query = db.get_db().execute(f"SELECT * FROM vacancies {fil} ORDER BY id DESC LIMIT ? OFFSET ?",
                                query_args if recruiter == None else (recruiter, query_args[0], query_args[1]))
    vacancies = query.fetchall()
    vacancies = list(map(dict, vacancies))

    count = db.get_db().execute(
        f"SELECT COUNT(*) FROM vacancies {fil}", (recruiter) if recruiter != None else ()).fetchone()[0]

    return {"pagination": {"page": page, "perpage": perpage, "pages": ceil(count/perpage), "entries": count}, "vacancies": vacancies}


@api_bp.route("/profile")
def profile():
    user = auth.get_user_from_session(
        request.cookies["session"]) if "session" in request.cookies else None
    if user == None:
        return redirect("/registration?error=Эта сессия больше недействительна")

    return user


@api_bp.route("/company/<id>")
def company(id: str):
    query = db.get_db().execute("SELECT * FROM recruiters WHERE id = ?", (id))
    company = query.fetchone()

    if company == None:
        return {"error": "Такой компании не существует"}

    return dict(company)
