from flask import jsonify, render_template, send_file, Response, current_app, request, make_response, redirect, url_for
from flask_marshmallow import Marshmallow
from marshmallow import fields, validate, ValidationError, EXCLUDE, INCLUDE
from flask_restplus import Namespace, Resource, fields, Api
from flask_jwt_extended import (create_access_token, create_refresh_token, set_access_cookies, set_refresh_cookies,
                                jwt_required, jwt_refresh_token_required, get_jwt_identity, get_raw_jwt, unset_jwt_cookies)

from src.shared.utils.extensions import db, db_schema
from src.components.users_db_api import dbapi

from flask_jwt_extended import JWTManager
jwt = JWTManager()

def init_app(app):
    jwt.init_app(app)
    jwt._set_error_handler_callbacks(jwt_api)
    #app.config['JWT_ACCESS_TOKEN_EXPIRES'] = 30 # To test
    #app.config['JWT_REFRESH_TOKEN_EXPIRES'] = 600 # To test
    ################ Make it True! ###################
    app.config['JWT_COOKIE_SECURE'] = False 
    app.config['JWT_COOKIE_CSRF_PROTECT'] = False
    ##################################################
    app.config['JWT_TOKEN_LOCATION'] = ['cookies']
    app.config['JWT_ACCESS_COOKIE_PATH'] = '/app'
    app.config['JWT_REFRESH_COOKIE_PATH'] = '/api/auth'



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
                access_token = create_access_token(identity = existing_user.id)
                refresh_token = create_refresh_token(identity = existing_user.id)
                response = jsonify({'result': True})
                set_access_cookies(response, access_token)
                set_refresh_cookies(response, refresh_token)
                return make_response(response, 200)
            else:
                return jsonify({
                    'result': False,
                    'error': 'Email or password is wrong.'
                })
'''
@jwt_api.route('/jwttest')
class token_test(Resource):
    @jwt_required
    def get(self):
        return {'message': 'Protected works', 'result': True}
'''
@jwt_api.route('/logout')
class user_logout(Resource):
    def post(self):
        response = jsonify({'result': True})
        unset_jwt_cookies(response)
        return make_response(response, 200)
      

@jwt_api.route('/token/refresh')        
class user_token_refresh(Resource):
    '''
    This endpoint is called by client to refresh the access token.
    '''
    @jwt_refresh_token_required
    def post(self):
        user_id = get_jwt_identity()
        access_token = create_access_token(identity = user_id)
        response = jsonify({'result': True})
        set_access_cookies(response, access_token)
        return make_response(response, 200)

@jwt_api.route('/token/testrefresh')        
class user_token_refresh_test(Resource):
    '''
    This endpoint is called by client to refresh the access token.
    '''
    @jwt_refresh_token_required
    def post(self):
        response = jsonify({'result': True})
        return make_response(response, 200)

'''
@jwt.unauthorized_loader
def redirect_to_login(message):
    return redirect(url_for('auth.app_login'))
'''
'''
@jwt.expired_token_loader
def redirect_to_login(message):
    return redirect(url_for('auth.app_login'))
'''
