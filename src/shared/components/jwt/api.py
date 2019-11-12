from flask import jsonify, render_template, send_file, Response, current_app, request, make_response, redirect, url_for
from flask_marshmallow import Marshmallow
from marshmallow import fields, validate, ValidationError, EXCLUDE, INCLUDE
from flask_restplus import Namespace, Resource, fields
from flask_jwt_extended import (create_access_token, create_refresh_token, 
                                jwt_required, jwt_refresh_token_required, get_jwt_identity, get_raw_jwt)

from src.extensions import db, db_schema
from src.shared.components.users_db_api import dbapi

from flask_jwt_extended import JWTManager
jw = JWTManager()

def init_app(app):
    jw.init_app(app)


jwt_api = Namespace('jwt_api', path ='/api/auth/')


@jwt_api.route('/register')
class user_registration(Resource):
    def post(self):
        username, email, password = jwt_api.payload.get('username'), jwt_api.payload.get('email'), \
                                    jwt_api.payload.get('password')
        if username is None or email is None or password is None:
            return jsonify({
                'result': False,
                'error': 'Username, email, or password is not provided'
            })
        
        existing_user = dbapi.find_user_by_email(email)
        if existing_user is not None:
            return jsonify({
                'result': False,
                'error': 'Username already exists.'
            })
        result = dbapi.create_user(username, email, password)
        if result:
            return  jsonify({
                'result': True,
                'redirect': '/login' # to-do: it should not be HERE
            })
        else:
            return {
                'result': False,
                'error': 'Something went wrong, could not register a user, please try again.'
            }

@jwt_api.route('/login')
class user_login(Resource):
    def post(self):
        email, password = jwt_api.payload.get('email'), jwt_api.payload.get('password')
        if email is None or password is None:
            return jsonify({
                'result': False,
                'error': 'Email or password is not provided'
            })
        existing_user = dbapi.find_user_by_email(email)
        if existing_user is None:
            return jsonify({
                'result': False,
                'error': 'User does not exist or never being confirmed.'
            })
        else:
            if existing_user.verify_hash(password):
                access_token = create_access_token(identity = email)
                refresh_token = create_refresh_token(identity = email)
                return {
                    'result': True,
                    'access_token': access_token,
                    'refresh_token': refresh_token
                }
            else:
                return jsonify({
                    'result': False,
                    'error': 'Email or password is wrong.'
                })

@jwt_api.route('/jwttest')
class token_test(Resource):
    @jwt_required
    def get(self):
        return {'message': 'User logout'}
      
@jwt_api.route('/logout/access')
class user_logout_access(Resource):
    def post(self):
        return {'message': 'User logout'}
      
@jwt_api.route('/logout/refresh')     
class user_logout_refresh(Resource):
    def post(self):
        return {'message': 'User logout'}

@jwt_api.route('/token/refresh')        
class user_token_refresh(Resource):
    '''
    This endpoint is called by client to refresh the access token.
    '''
    @jwt_refresh_token_required
    def post(self):
        current_user = get_jwt_identity()
        access_token = create_access_token(identity = current_user)
        return {'access_token': access_token}
      

@jw.unauthorized_loader
def redirect_to_login(message):
    '''
    When user is not authenticated, it redirects to login page.
    '''
    return redirect(url_for('auth.app_login'))