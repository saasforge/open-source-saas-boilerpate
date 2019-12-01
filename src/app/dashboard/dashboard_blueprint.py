import importlib
from pathlib import Path
from flask import Blueprint, render_template, jsonify, redirect, url_for
from flask_restplus import Namespace, Resource, Api

#from src.dashboard.api.dashboard_api import dashboard_api
from src.shared.utils.user_auth_wrapper import login_required

dashboard_blueprint = Blueprint('dashboard', __name__, template_folder='../../app/dashboard')


dashboard_app = Api (dashboard_blueprint,
    title='SaaSForge Dashboard',
    version='2.0',
    description='SaaSForge Dashboard'
)

# This is where you add API namespaces
dashboard_api = Namespace('dashboard', path = '/app')
dashboard_app.add_namespace(dashboard_api)

def register_api(folder):
    for module in folder.iterdir():
        if module.is_dir():
            module_spec = importlib.util.find_spec('src.{0}.{1}.api'.format(folder.name, module.name))
            if module_spec:
                namespace_module = importlib.import_module('src.{0}.{1}.api'.format(folder.name, module.name))
                if namespace_module:
                    variables = [item for item in dir(namespace_module) if not item.startswith("__")]
                    for var_name in variables:
                        var = getattr(namespace_module, var_name)
                        if isinstance(var, Namespace):
                            dashboard_app.add_namespace(var)
def init():
    '''
    Imports namespaces that should be added to the blueprint
    '''
    shared_modules_folder = Path.joinpath(Path.cwd(), 'src/components')
    register_api(shared_modules_folder)

    views_modules_folder = Path.joinpath(Path.cwd(), 'src/views')
    register_api(views_modules_folder)


init()               

@dashboard_blueprint.route('/', methods=['GET']) # To-do: create a separate endpoint for a landing page
def index_page():
    return redirect(url_for('dashboard.app_index_app'))

@dashboard_blueprint.route('/app', methods=['GET'])
@dashboard_blueprint.route('/app/<path:path>', methods=['GET'])
def app_index_app(path = None):
    return render_template('dashboard.html')

@dashboard_blueprint.route('/app/api/jwttest', methods=['GET'])
@login_required
def get_test():
    '''
    This route is protected.
    '''
    return jsonify({'message': 'Protected works', 'result': True})