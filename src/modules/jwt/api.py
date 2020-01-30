from flask import jsonify, render_template, send_file, Response, current_app, request, make_response, redirect, url_for
from flask_marshmallow import Marshmallow
from marshmallow import fields, validate, ValidationError, EXCLUDE, INCLUDE
from flask_restplus import Namespace, Resource, fields, Api
from flask_jwt_extended import (create_access_token, create_refresh_token, set_access_cookies, set_refresh_cookies,
                                jwt_required, jwt_refresh_token_required, get_jwt_identity, get_raw_jwt, unset_jwt_cookies)

from src.shared.utils.extensions import db, db_schema

from flask_jwt_extended import JWTManager
jwt = JWTManager()

def init_app(app):
    jwt.init_app(app)
    ##jwt._set_error_handler_callbacks(jwt_api)
    #app.config['JWT_ACCESS_TOKEN_EXPIRES'] = 30 # To test
    #app.config['JWT_REFRESH_TOKEN_EXPIRES'] = 600 # To test
    ################ Make it True! ###################
    app.config['JWT_COOKIE_SECURE'] = False 
    app.config['JWT_COOKIE_CSRF_PROTECT'] = False
    ##################################################
    app.config['JWT_TOKEN_LOCATION'] = ['cookies']
    app.config['JWT_ACCESS_COOKIE_PATH'] = '/' # We will protect all paths
    app.config['JWT_REFRESH_COOKIE_PATH'] = '/api/auth'


def login_create_tokens(user_id):
    access_token = create_access_token(identity = user_id)
    refresh_token = create_refresh_token(identity = user_id)
    login_response = jsonify({
        'result': True, 
        'redirect': '/app' # Redirect to /app when login was successful
    })
    set_access_cookies(login_response, access_token)
    set_refresh_cookies(login_response, refresh_token)
    return login_response

def logout():
    logout_response = jsonify({'result': True})
    unset_jwt_cookies(logout_response)
    return logout_response

@jwt_refresh_token_required
def token_refresh():
    user_id = get_jwt_identity()
    access_token = create_access_token(identity = user_id)
    refresh_response = jsonify({'result': True})
    set_access_cookies(refresh_response, access_token)
    return refresh_response

@jwt.invalid_token_loader
def invalid_token_handler():
    '''
    This may happen when, for example, user changes URL - redirecting to sign in screen.
    '''
    return redirect('/auth/login')

@jwt.unauthorized_loader
def unauthorized_loader_handler(message):
    '''
    This may happen when, for example, user changes URL - redirecting to sign in screen.
    '''
    print('Unathorized attempt: ', message)
    return redirect('/auth/login')