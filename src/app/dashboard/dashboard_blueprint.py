import importlib
from pathlib import Path
from flask import Blueprint, render_template, jsonify
from flask_restplus import Namespace, Resource, Api
from src.registry import components
from flask_jwt_extended import jwt_required, jwt_refresh_token_required, get_jwt_identity, fresh_jwt_required 
#from src.dashboard.api.dashboard_api import dashboard_api

dashboard_blueprint = Blueprint('dashboard', __name__, template_folder='../../app/dashboard')


dashboard_app = Api (dashboard_blueprint,
    title='SaaSForge Dashboard',
    version='2.0',
    description='SaaSForge Dashboard'
)

# This is where you add API namespaces
dashboard_api = Namespace('dashboard', path = '/app')
dashboard_app.add_namespace(dashboard_api)

# For now, every blueprint adds all registered namespaces (API components)
# to-do: a blueprints adds a namespace only if it needs it
'''
api_components = list(filter(lambda component: component.get('type') == 'api', components))
for api_component in api_components:  
    package_name = 'src.shared.components.{0}.api'.format(api_component.get('name'))
    module = importlib.import_module(package_name)
    api_namespace = getattr(module, api_component.get('name'))
    dashboard_app.add_namespace(api_namespace)
'''

def init():
    '''
    Imports namespaces that should be added to the blueprint
    '''
    shared_modules_folder = Path('src\\shared\\components')
    for module in shared_modules_folder.iterdir():
        if module.is_dir():
            module_spec = importlib.util.find_spec('src.shared.components.{0}.api'.format(module.name))
            if module_spec:
                namespace_module = importlib.import_module('src.shared.components.{0}.api'.format(module.name))
                if namespace_module:
                    variables = [item for item in dir(namespace_module) if not item.startswith("__")]
                    for var_name in variables:
                        var = getattr(namespace_module, var_name)
                        if isinstance(var, Namespace):
                            dashboard_app.add_namespace(var)

init()               

@dashboard_blueprint.route('/app', methods=['GET'])
@jwt_required
def app_index():
    return render_template('dashboard.html')

@dashboard_blueprint.route('/app/fresh', methods=['GET'])
@fresh_jwt_required
def app_index_test():
    return render_template('dashboard.html')

@dashboard_blueprint.route('/app/api/jwttest', methods=['GET'])
@jwt_required
def get_test():
    '''
    This route is protected.
    '''
    return jsonify({'message': 'Protected works', 'result': True})