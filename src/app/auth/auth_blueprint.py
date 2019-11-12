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
auth_api = Namespace('auth')
auth_app.add_namespace(auth_api)



@auth_blueprint.route('/login', methods=['GET'])
def app_login():
    return render_template('auth.html')

@auth_blueprint.route('/register', methods=['GET'])
def app_register():
    return render_template('auth.html')