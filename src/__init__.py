import sys, os, importlib
from pathlib import Path

from flask import Flask
from config import ConfigHelper

from src.shared.utils.extensions import db, db_schema, mail, alembic
from src.shared.utils.server_error_handler import app_error

def create_app():
    
    app = Flask(__name__, template_folder='') 
    dist_folder = os.path.abspath(os.path.join(app.root_path,"../static"))
    app.static_folder = dist_folder
    app.static_url_path='/static'
    app_path = app.root_path
    app.url_map.strict_slashes = False
    app.config.from_object(ConfigHelper.set_config(sys.argv))
    register_blueprints(app)
    init_global_functions(app)
    register_extensions(app)
    register_components(app)
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
    from src.shared.utils import global_functions
    global_functions.init(app)

def register_extensions(app):
    db.init_app(app)
    db_schema.init_app(app)
    mail.init_app(app)
    alembic.init_app(app)

def __register_extensions_auto(folder, app, folder_name, module_type):
    for module in folder.iterdir():
        if module.is_dir():
            module_spec = importlib.util.find_spec('src.{0}.{1}.{2}'.format(folder_name, module.name, module_type))
            if module_spec:
                component_module = importlib.import_module('src.{0}.{1}.{2}'.format(folder_name, module.name, module_type))
                if hasattr(component_module, 'init_app'):
                    init_app = getattr(component_module, 'init_app')
                    if init_app:
                        init_app(app)

def register_components(app):
    '''
    Automatically registers all module that need some initializing with application.
    To-do: make it not only for shared modules
    '''
    shared_modules_folder = Path.joinpath(Path.cwd(), 'src\\components', )
    __register_extensions_auto(shared_modules_folder, app, 'components', 'api')

    services_modules_folder = Path.joinpath(Path.cwd(), 'src\\shared\\services')
    __register_extensions_auto(services_modules_folder, app, 'shared.services', 'service')
