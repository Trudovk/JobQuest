from flask import Blueprint, request, redirect, make_response, send_file
import db
import auth
import captchas
from math import ceil

api_bp = Blueprint("api", __name__)

# AUTH


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
    res.headers.add("Location", "/lk")
    return res, 301


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

    if form["password"] != form["passwordconfirm"]:
        return redirect("/registration?error=Пароли не совпадают друг с другом")

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

    return redirect("/")

# CAPTCHAS


@api_bp.route("/requestcaptcha")
def request_captcha():
    hash = captchas.generate_captcha()
    return {"hash": hash, "link": f"/api/servecaptcha/{hash}"}


@api_bp.route("/servecaptcha/<hashstr>")
def serve_captcha(hashstr: str):
    # TODO: use from directory variant to fix vuln (ex.: /servecaptcha/../captcha_salt.txt)
    return send_file(f"./data/captchas/{hashstr}.png")

# VACANCIES


@api_bp.route("/jobs")
def jobs():
    args = request.args
    page = int(args["page"])
    perpage = int(args["perpage"])
    recruiter = args["recruiter"] if 'recruiter' in args else None

    search = args["search"] if 'search' in args and args["search"] != '' else None
    minsal = args["minsal"] if 'minsal' in args else None
    maxsal = args["maxsal"] if 'maxsal' in args else None

    where = " AND ".join(filter(lambda s: s != None,
                                ["MATCH (vacancies.job_name) AGAINST (%s IN BOOLEAN MODE)" if search != None else None,
                                 "recruiter_id = %s" if recruiter != None else None,
                                 "vacancies.min_salary > %s" if minsal != None else None,
                                 "vacancies.max_salary < %s" if maxsal != None else None]
                                ))

    whereparams = ((() if search == None else ("+".join(map(lambda s: s+"*" if len(s) > 1 else s, search.strip().split(' '))),))
                   + (() if recruiter == None else (recruiter,))
                   + (() if minsal == None else (minsal,))
                   + (() if maxsal == None else (maxsal,))
                   )

    params = whereparams + (perpage, (page*perpage) - perpage)
    query = ("SELECT recruiters.company_name, vacancies.* FROM vacancies LEFT JOIN recruiters ON vacancies.recruiter_id=recruiters.id "
             + (("WHERE " + where) if where != "" else "")
             + " ORDER BY vacancies.id DESC LIMIT %s OFFSET %s")

    with db.get_db().cursor() as cursor:
        cursor.execute(query, params)
        vacancies = cursor.fetchall()

    vacancies = list(map(dict, vacancies))

    with db.get_db().cursor() as cursor:
        cursor.execute(
            "SELECT COUNT(*) FROM vacancies " + (("WHERE " + where) if where != "" else ""), whereparams)
        count = cursor.fetchone()['COUNT(*)']

    return {"pagination": {"page": page, "perpage": perpage, "pages": ceil(count/perpage), "entries": count}, "vacancies": vacancies}


@api_bp.route("/profile")
def profile():
    user = auth.get_user_from_session(
        request.cookies["session"]) if "session" in request.cookies else None
    if user == None:
        return {"error": "session invalid"}

    return user

# COMPANIES


@api_bp.route("/profile/companies")
def companies():
    user = auth.get_user_from_session(
        request.cookies["session"]) if "session" in request.cookies else None
    if user == None:
        return {"error": "session invalid"}

    with db.get_db().cursor() as cursor:
        cursor.execute(
            "SELECT * FROM recruiters WHERE owner_id = %s", (user["id"],))
        comps = map(dict, cursor.fetchall())
        return list(comps)


@api_bp.route("/company/<id>")
def company(id: str):
    with db.get_db().cursor() as cursor:
        query = cursor.execute("SELECT * FROM recruiters WHERE id = %s", (id,))
        company = cursor.fetchone()

    if company == None:
        return {"error": "Такой компании не существует"}

    return dict(company)


@api_bp.route("/profile/createcompany", methods=["POST"])
def create_company():
    user = auth.get_user_from_session(
        request.cookies["session"]) if "session" in request.cookies else None

    if user == None:
        return redirect("/login?error=Сессия истекла, войдите снова")

    form = request.form
    if (
        (not 'company' in form) or
        (not 'email' in form) or
        (not 'description' in form)
    ):
        return redirect("/addcompany?error=Недостаточно данных в запросе")

    with db.get_db().cursor() as cursor:
        cursor.execute(
            "INSERT INTO recruiters (owner_id, company_name, company_description, website, contact_email) VALUES (%s, %s, %s, %s, %s)", (user["id"], form["company"], form["description"], form["link"] if "link" in form else None, form["email"]))

    db.get_db().commit()

    return redirect("/lk")


@api_bp.route("/profile/editcompany", methods=["POST"])
def edit_company():
    user = auth.get_user_from_session(
        request.cookies["session"]) if "session" in request.cookies else None

    if user == None:
        return redirect("/login?error=Сессия истекла, войдите снова")

    form = request.form
    if (
        (not 'id' in form) or
        (not 'company' in form) or
        (not 'email' in form) or
        (not 'description' in form)
    ):
        return redirect("/addcompany?error=Недостаточно данных в запросе")

    with db.get_db().cursor() as cursor:
        cursor.execute(
            "SELECT * FROM recruiters WHERE id=%s", (form["id"],))

        companydata = cursor.fetchone()

    if user["id"] != companydata["owner_id"]:
        return redirect("/editcompany?error=Эта компания вам не принадлежит")

    website = form["website"] if "website" in form else None

    with db.get_db().cursor() as cursor:
        cursor.execute(
            "UPDATE recruiters SET company_name=%s, company_description=%s, website=%s, contact_email=%s WHERE id=%s",
            (form["company"], form["description"],
             website, form["email"], form["id"])
        )
    db.get_db().commit()

    return redirect("/lk")


@api_bp.route("/profile/deletecompany", methods=["POST"])
def delete_company():
    user = auth.get_user_from_session(
        request.cookies["session"]) if "session" in request.cookies else None

    if user == None:
        return redirect("/login?error=Сессия истекла, войдите снова")

    form = request.form
    if (
        (not 'id' in form)
    ):
        return redirect("/editcompany?error=Недостаточно данных в запросе")

    with db.get_db().cursor() as cursor:
        cursor.execute(
            "SELECT * FROM recruiters WHERE id=%s", (form["id"],))

        companydata = cursor.fetchone()

    if user["id"] != companydata["owner_id"]:
        return redirect(f"/editcompany?id={form['id']}&error=Эта компания вам не принадлежит")
    with db.get_db().cursor() as cursor:
        cursor.execute(
            "DELETE FROM vacancies WHERE recruiter_id=%s", (form["id"],))
        cursor.execute(
            "DELETE FROM recruiters WHERE id=%s", (form["id"],))
    db.get_db().commit()

    return redirect("/lk")

# LOGOUT


@api_bp.route("/invalidatesession", methods=["POST"])
def invalidate_session():
    user = auth.get_user_from_session(
        request.cookies["session"]) if "session" in request.cookies else None

    if user == None:
        return redirect("/")

    with db.get_db().cursor() as cursor:
        cursor.execute(
            "UPDATE users SET session_token = NULL WHERE id = %s", (user["id"],))

    db.get_db().commit()

    res = make_response()
    res.delete_cookie("session")
    res.headers.add("Location", "/")
    return res, 301


@api_bp.route("/vacancy/<id>")
def vacancy(id: str):
    with db.get_db().cursor() as cursor:
        cursor.execute("SELECT recruiters.company_name, recruiters.website, recruiters.contact_email, vacancies.* FROM recruiters INNER JOIN vacancies ON vacancies.recruiter_id=recruiters.id WHERE vacancies.id = %s",
                       (id,))
        vacancy = cursor.fetchone()

    if vacancy == None:
        return {"error": "Такой вакансии не существует"}

    return dict(vacancy)


@api_bp.route("/profile/createvacancy", methods=["POST"])
def create_vacancy():
    user = auth.get_user_from_session(
        request.cookies["session"]) if "session" in request.cookies else None

    if user == None:
        return redirect("/login?error=Сессия истекла, войдите снова")

    form = request.form
    if (
        (not 'company_id' in form) or
        (not 'job_name' in form) or
        (not 'city' in form) or
        (not 'min_salary' in form) or
        (not 'max_salary' in form)
    ):
        return redirect("/addvacancy?error=Недостаточно данных в запросе")

    with db.get_db().cursor() as cursor:
        cursor.execute(
            "SELECT * FROM recruiters WHERE id=%s", (form["company_id"],))

        companydata = cursor.fetchone()

    if user["id"] != companydata["owner_id"]:
        return redirect("/addvacancy?error=Эта компания вам не принадлежит")

    with db.get_db().cursor() as cursor:
        cursor.execute(
            "INSERT INTO vacancies (recruiter_id, city, job_description, min_salary, max_salary, job_name) VALUES (%s, %s, %s, %s, %s, %s)",
            (form["company_id"],
             form["city"],
             form["description"] if "description" in form else None,
             int(form["min_salary"]) if form["min_salary"] != '' else None,
             int(form["max_salary"]) if form["max_salary"] != '' else None,
             form["job_name"]))

    db.get_db().commit()

    return redirect("/lk")


@api_bp.route("/profile/editvacancy", methods=["POST"])
def edit_vacancy():
    user = auth.get_user_from_session(
        request.cookies["session"]) if "session" in request.cookies else None

    if user == None:
        return redirect("/login?error=Сессия истекла, войдите снова")

    form = request.form
    if (
        (not 'id' in form) or
        (not 'company_id' in form) or
        (not 'job_name' in form) or
        (not 'city' in form) or
        (not 'min_salary' in form) or
        (not 'max_salary' in form)
    ):
        return redirect(f"/editvacancy?{('id=' + form['id'] + '&') if 'id' in form else ''}error=Недостаточно данных в запросе")
    with db.get_db().cursor() as cursor:
        cursor.execute(
            "SELECT * FROM recruiters WHERE id=%s", (form["company_id"],))

        companydata = cursor.fetchone()

    if user["id"] != companydata["owner_id"]:
        return redirect(f"/editvacancy?id={form['id']}&error=Эта компания вам не принадлежит")

    with db.get_db().cursor() as cursor:
        cursor.execute(
            "UPDATE vacancies SET recruiter_id=%s, city=%s, job_description=%s, min_salary=%s, max_salary=%s, job_name=%s WHERE id=%s",
            (form["company_id"],
             form["city"],
             form["description"] if "description" in form else None,
             int(form["min_salary"]) if form["min_salary"] != '' else None,
             int(form["max_salary"]) if form["max_salary"] != '' else None,
             form["job_name"],
             form["id"]))
    db.get_db().commit()

    return redirect(f"/vacancy?id={form['id']}")


@api_bp.route("/profile/deletevacancy", methods=["POST"])
def delete_vacancy():
    user = auth.get_user_from_session(
        request.cookies["session"]) if "session" in request.cookies else None

    if user == None:
        return redirect("/login?error=Сессия истекла, войдите снова")

    form = request.form
    if (
        (not 'id' in form)
    ):
        return redirect("/editvacancy?error=Недостаточно данных в запросе")

    with db.get_db().cursor() as cursor:
        cursor.execute(
            "SELECT vacancies.*, recruiters.owner_id FROM vacancies INNER JOIN recruiters ON recruiters.id=vacancies.recruiter_id WHERE vacancies.id=%s", (form["id"],))

        vacancydata = cursor.fetchone()

    if user["id"] != vacancydata["owner_id"]:
        return redirect("/editvacancy?error=Эта компания вам не принадлежит")

    with db.get_db().cursor() as cursor:
        cursor.execute(
            "DELETE FROM vacancies WHERE id=%s", (form["id"],))
    db.get_db().commit()

    return redirect("/lk")
