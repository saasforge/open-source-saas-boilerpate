from flask import jsonify, render_template, send_file, Response, current_app, request, make_response, redirect, url_for
from flask_marshmallow import Marshmallow
from marshmallow import fields, validate, ValidationError, EXCLUDE, INCLUDE
from flask_restplus import Namespace, Resource, fields, Api, abort

from src.shared.utils.global_functions import get_config_var
from src.shared.utils.extensions import db, db_schema

# Adapters
from src.shared.services import db_user_service

# Components
from src.components.jwt import api as jwt_api

# Services
from src.shared.services.email import service as email_service

auth_logic_api = Namespace('auth_logic_api', path ='/api/auth/')
jwt_api.jwt._set_error_handler_callbacks(auth_logic_api)

def send_confirmation_email(user, token):
    confirmation_link = url_for('auth.all_auth_requests', path = 'confirm/{0}/{1}'.format(token, user.id), _external=True) 
    text_body = render_template('/components/auth/email_templates/confirmation_template.txt', 
                                user_name = user.username, 
                                company_name = get_config_var('COMPANY_NAME'), 
                                confirmation_link = confirmation_link)
    html_body = render_template('/components/auth/email_templates/confirmation_template.html', 
                                user_name = user.username, 
                                company_name = get_config_var('COMPANY_NAME'), 
                                confirmation_link = confirmation_link)
    email_service.send_email(user.email, get_config_var('COMPANY_NAME') + ': Confirm your registration', text_body, html_body, 
                            get_config_var('COMPANY_NAME'),
                            get_config_var('MAIL_DEFAULT_SENDER'))

@auth_logic_api.route('/register')
class user_registration(Resource):
    def post(self):
        username, email, password = auth_logic_api.payload.get('username'), auth_logic_api.payload.get('email'), \
                                    auth_logic_api.payload.get('password')
        if username is None or email is None or password is None:
            return jsonify({
                'result': False,
                'error': 'Username, email, or password is not provided'
            })
        
        existing_user = db_user_service.find_user_by_email(email)
        if existing_user is not None:
            return jsonify({
                'result': False,
                'error': 'Username already exists.'
            })
        # New user has been created but not saved
        new_user = db_user_service.create_user(username, email, password)
        if new_user is not None:
            # 1. Generate confirmation token
            token = new_user.generate_confirmation_token()

            # 2. Save new user
            save_result = new_user.save()

            if save_result:
                # 3. Generate email bodies and send confirmation link asynchronously
                send_confirmation_email(new_user, token)           

                # 4. Inform frontend to redirect to the confirmatiuon page
                confirm_email_page_url = '/auth/finishregister/' + str(new_user.id)
                return  jsonify({
                    'result': True,
                    'redirect': confirm_email_page_url
                })
            return  jsonify({
                'result': False,
                'error': 'Something went wrong when saving a new user. Please try to register again.'
            })
        else:
            return {
                'result': False,
                'error': 'Something went wrong, could not register a user, please try again.'
            }

@auth_logic_api.route('/login')
class user_login(Resource):
    def post(self):
        email, password = auth_logic_api.payload.get('email'), auth_logic_api.payload.get('password')
        if email is None or password is None:
            return jsonify({
                'result': False,
                'error': 'Email or password is not provided'
            })
        existing_user = db_user_service.find_user_by_email(email)
        if existing_user is None:
            return jsonify({
                'result': False,
                'error': 'User does not exist or never being confirmed.'
            })
        else:
            if existing_user.verify_hash(password):
                login_response = jwt_api.login_create_tokens(existing_user.id)
                return make_response(login_response, 200)
            else:
                return jsonify({
                    'result': False,
                    'error': 'Email or password is wrong.'
                })

@auth_logic_api.route('/logout')
class user_logout(Resource):
    def post(self):
        logout_response = jwt_api.logout()
        return make_response(logout_response, 200)

@auth_logic_api.route('/token/refresh')        
class user_token_refresh(Resource):
    '''
    This endpoint is called by client to refresh the access token.
    '''
    def post(self):
        refresh_response = jwt_api.token_refresh()
        return make_response(refresh_response, 200)

@auth_logic_api.route('/resendconfirm/<userid>')
class user_resend_confirm(Resource):
    def get(self, userid):
        user = db_user_service.get_user_by_id(userid)
        if user:  
            token = user.generate_confirmation_token()
            send_confirmation_email(user, token) 
            confirm_email_page_url = '/auth/finishregister/' + str(user.id)
            return  jsonify({
                'result': True,
                'redirect': confirm_email_page_url
            })
        else:
            return jsonify({
                'result': False,
                'error': 'Sorry but user not found. Please login or register again.'
            })

@auth_logic_api.route('/confirm/<token>/<userid>')
class user_confirm(Resource):
    def get(self, token, userid):
        user = db_user_service.get_user_by_id(userid)
        if user:  
            if not user.confirmed:          
                user.confirm(token)
                user.save()
            # User is confirmed, but we have to logout to make sure that THIS exact user will login then.
            return  jsonify({
                'result': True
            })
        else:
            return jsonify({
                'result': False,
                'error': 'Sorry but user not found. Please login or register again.'
            })