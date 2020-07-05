from flask import (
    render_template,
    redirect,
    request,
    url_for,
    flash,
    jsonify,
    current_app,
)


def app_error(error_title="ERROR", error_text="Unknown error occured..."):
    return render_template(
        "non_auth/errorpage.html",
        error_title=error_title,
        error_text=error_text,
        company_name=current_app.config["COMPANY_NAME"],
    )
