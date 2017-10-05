from flask import Flask, request, render_template
app = Flask(__name__)
app.secret_key = "dfjkhgdkjfhgdjfhsdjkfh"


def login_required(function):
    def wrapper(*args, **kwargs):
        user_in_session = "user_name" in session and session["user_name"] is not None
        if user_in_session:
            return function(*args, **kwargs)
        else:
            return redirect(url_for("login"))
    wrapper.__name__ = function.__name__
    return wrapper


""" after this line the login, hash password, logout functions are visible """


def hash_password(password):
    # Hash and salt password
    password_bytes = password.encode('utf-8')
    salt = 'ulezshgdxksaeurbcaskje'
    salt_bytes = salt.encode('utf-8')
    hashed_password = hashlib.sha512(password_bytes + salt_bytes).hexdigest()
    return hashed_password


@app.route("/")
def main_page():
    return render_template("galaxy.html")


@app.route("/login", methods=["GET", "POST"])
def login():
    error_message = ""
    user_name = ""
    if request.method == "POST":
        user_name = request.form["user_name"]
        password = request.form["password"]
        hashed_password = common.hash_password(password)
        user = queries.get_user(user_name, hashed_password)
        if user is None:
            error_message = "User doesn't exist"
        else:
            session["user_name"] = user_name
            session["user_id"] = user["id"]
            return redirect(url_for("display_first_five_questions"))
    return render_template("login.html", error_message=error_message, user_name=user_name, logged_out=True)


@app.route("/")
def logout():
    session.pop("user_name", None)
    session.pop("user_id", None)
    return redirect(url_for("display_first_five_questions"))


@app.route("/registration")
def registration():
    return render_template("registration.html")


if __name__ == '__main__':
    app.run(debug=True)
