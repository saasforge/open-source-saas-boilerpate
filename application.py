import click
from flask import send_from_directory, current_app
from flask.cli import with_appcontext
from src import create_app

application = create_app()

# Init custom static folder
@application.route('/custom_static/<path:filename>')
def custom_static(filename):
    return send_from_directory(application.root_path, filename)