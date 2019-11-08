import importlib
from flask import Blueprint, render_template
from flask_restplus import Namespace, Resource, Api
from src.registry import components

auth_blueprint = Blueprint('auth', __name__, template_folder='../../app/auth')


auth_app = Api (auth_blueprint,
    title='SaaSForge auth pages',
    version='2.0',
    description='SaaSForge authentication pages'
)

# This is where you add API namespaces
auth_api = Namespace('auth', path='/app/api/auth/')
auth_app.add_namespace(auth_api)

# For now, every blueprint adds all registered namespaces (API components)
# to-do: a blueprints adds a namespace only if it needs it
api_components = list(filter(lambda component: component.get('type') == 'api', components))
for api_component in api_components:  
    package_name = 'src.shared.components.{0}.api'.format(api_component.get('name'))
    module = importlib.import_module(package_name)
    api_namespace = getattr(module, api_component.get('name'))
    auth_app.add_namespace(api_namespace)

@auth_blueprint.route('/login', methods=['GET'])
@auth_blueprint.route('/register', methods=['GET'])
def app_index():
    return render_template('auth.html')