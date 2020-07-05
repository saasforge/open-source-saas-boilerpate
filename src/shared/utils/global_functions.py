import os
import sys
from flask import current_app


def init(app):
    app.jinja_env.globals.update(get_abs_path=get_abs_path)
    app.jinja_env.globals.update(get_config_var=get_config_var)
    return


def get_abs_path(relative_path):
    return os.path.abspath(os.path.join(current_app.root_path, relative_path))


# This function should be accessible only from CONFIG
# to-do: remove from direct using
def get_config_var(var_name, app=current_app):
    if var_name in app.config:
        return app.config[var_name]
    return None


def flat_validation_errors(errors_object):
    errors = []
    if errors_object:
        for index, error_key in enumerate(errors_object.keys()):
            for error in errors_object[error_key]:
                # errors.append(error_key + ': ' + error)
                errors.append(error)
    return ", ".join(errors)
