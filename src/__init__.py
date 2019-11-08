import sys, os
from pathlib import Path

from flask import Flask
from config import ConfigHelper

from src.extensions import db, db_schema, mail, alembic

def create_app():
    
    app = Flask(__name__) 
    dist_folder = os.path.abspath(os.path.join(app.root_path,"../static"))
    app.static_folder = dist_folder
    app.static_url_path='/static'
    app_path = app.root_path
    app.url_map.strict_slashes = False
    app.config.from_object(ConfigHelper.set_config(sys.argv))
    register_blueprints(app)
    init_global_functions(app)
    register_extensions(app)
    return app

# automate
# what if any other blueprint would register itself?
def register_blueprints(app):
    from src.app.auth.auth_blueprint import auth_blueprint
    from src.app.dashboard.dashboard_blueprint import dashboard_blueprint

    blueprints = [dashboard_blueprint, auth_blueprint] 
    for blueprint in blueprints:
        app.register_blueprint(blueprint)

def init_global_functions(app):
    from src import global_functions
    global_functions.init(app)

def register_extensions(app):
    db.init_app(app)
    db_schema.init_app(app)
    mail.init_app(app)
    alembic.init_app(app)