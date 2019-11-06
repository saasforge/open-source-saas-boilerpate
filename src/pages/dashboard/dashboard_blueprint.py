import importlib
from flask import Blueprint, render_template
from flask_restplus import Namespace, Resource, Api
from src.registry import components
#from src.dashboard.api.dashboard_api import dashboard_api

dashboard_blueprint = Blueprint('dashboard', __name__, template_folder='../../pages/dashboard')


dashboard_app = Api (dashboard_blueprint,
    title='SaaSForge Dashboard',
    version='2.0',
    description='SaaSForge Dashboard'
)

# This is where you add API namespaces
dashboard_api = Namespace('dashboard', path='/app/api/')
dashboard_app.add_namespace(dashboard_api)

# For now, every blueprint adds all registered namespaces (API components)
# to-do: a blueprints adds a namespace only if it needs it
api_components = list(filter(lambda component: component.get('type') == 'api', components))
for api_component in api_components:  
    package_name = 'src.global.components.{0}.api'.format(api_component.get('name'))
    module = importlib.import_module(package_name)
    api_namespace = getattr(module, api_component.get('name'))
    dashboard_app.add_namespace(api_namespace)

@dashboard_blueprint.route('/', methods=['GET'])
def app_index():
    return render_template('dashboard.html')