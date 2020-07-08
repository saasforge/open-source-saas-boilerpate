from flask import jsonify, render_template, send_file, Response, current_app, request, make_response, redirect, url_for
from flask_login import login_user, logout_user, login_required, current_user
from flask_login.config import EXEMPT_METHODS
from flask_marshmallow import Marshmallow
from marshmallow import fields, validate, ValidationError, EXCLUDE, INCLUDE
from flask_restplus import Namespace, Resource, fields, Api, abort
from functools import wraps

from src.shared.utils.global_functions import get_config_var
from src.shared.utils.extensions import db, db_schema, login_manager

# Adapters
from src.shared.services import db_user_service

# Components
from src.modules.jwt import api as jwt_api

# Services
from src.shared.services.email import service as email_service

auth_logic_api = Namespace('auth_logic_api', path ='/api/auth/')
jwt_api.jwt._set_error_handler_callbacks(auth_logic_api)

def send_verification_email(user, token, action, template_name, subject):
    confirmation_link = url_for('auth.all_auth_requests', path = '{0}/{1}/{2}'.format(action, token, user.id), _external=True) 
    text_body = render_template('/modules/auth/email_templates/{0}.txt'.format(template_name), 
                                user_name = user.username, 
                                company_name = get_config_var('COMPANY_NAME'), 
                                confirmation_link = confirmation_link)
    html_body = render_template('/modules/auth/email_templates/{0}.html'.format(template_name), 
                                user_name = user.username, 
                                company_name = get_config_var('COMPANY_NAME'), 
                                confirmation_link = confirmation_link)
    email_service.send_email(user.email, '{0}: {1}'.format(get_config_var('COMPANY_NAME'), subject), text_body, html_body, 
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
                'error': 'User already exists.'
            })
        # New user has been created but not saved
        new_user = db_user_service.create_user(username, email, password)
        if new_user is not None:
            # 1. Save new user - to get id for the token generation
            save_result = new_user.save()

            if save_result:
                # 2. Generate confirmation token
                token = new_user.generate_verification_token()

                # 3. Generate email bodies and send confirmation link asynchronously
                send_verification_email(new_user, token, action='confirm', 
                                        template_name='confirmation_template',
                                        subject='Confirm your registration')           

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
            if existing_user.confirmed == False:
                # Inform frontend to redirect to the confirmatiuon page
                token = existing_user.generate_verification_token()
                send_verification_email(existing_user, token, action='confirm', 
                                        template_name='confirmation_template',
                                        subject='Confirm your registration')
                confirm_email_page_url = '/auth/finishregister/' + str(existing_user.id)
                return  jsonify({
                    'result': False,
                    'error': 'Please confirm your email. You will be redirected to the confirmation page in 3 secods.',
                    'redirect': confirm_email_page_url,
                    'redirectDelay': 3
                })

            if existing_user.verify_hash(password):
                login_user(existing_user, auth_logic_api.payload.get('remember'))
                login_response = jwt_api.login_create_tokens(existing_user.id)
                return make_response(login_response, 200)
            else:
                return jsonify({
                    'result': False,
                    'error': 'Email or password is wrong.'
                })

@auth_logic_api.route('/forgot')
class user_forgot_password(Resource):
    def post(self):
        email = auth_logic_api.payload.get('email')
        if email is None:
            return jsonify({
                'result': False,
                'error': 'Please provide a non-empty email.'
            })
        # Note: for the security purpose we don't say if user exists or not and send this message no matter
        # if user was found in our database or not.
        message = 'We send the link at the provided email. If you don\'t have it please check your email and enter it again. Another reason you don\'t have email from us is you did\'t registered with our service.'
        existing_user = db_user_service.find_user_by_email(email)
        if existing_user is None:
            return jsonify({
                'result': True, 
                'message': message
            })
        else:
            token = existing_user.generate_verification_token(key='forgot', expiration=1800)
            send_verification_email(existing_user, token, action='resetpassword', 
                                    template_name='reset_password_template',
                                    subject='Request for password reset')
            return  jsonify({
                'result': True,
                'message': message
            })

@auth_logic_api.route('/logout')
class user_logout(Resource):
    def post(self):
        logout_user()
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
            token = user.generate_verification_token()
            send_verification_email(user, token, action='confirm', 
                                    template_name='confirmation_template',
                                    subject='Confirm your registration') 
            return  jsonify({
                'result': True,
                'redirect': '/auth/finishregister/{0}'.format(user.id)
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
                confirmation_result = user.verify(token)
                if confirmation_result:
                    user.save()
                else:
                    # The token probably expired, so send a new confirmation email
                    token = user.generate_verification_token()
                    send_verification_email(user, token, action='confirm', 
                                            template_name='confirmation_template',
                                            subject='Confirm your registration') 
                    return jsonify({
                        'result': False,
                        'redirect': '/auth/finishregister/{0}'.format(user.id),
                        'redirectDelay': 3,
                        'error': 'Sorry but your token probably expired. We have sent you a new confirmation email - please check your email box and try again.'
                    })
            # User is confirmed, but we have to logout to make sure that THIS exact user will login then.
            return  jsonify({
                'result': True
            })
        else:
            return jsonify({
                'result': False,
                'error': 'Sorry but user not found. Please login or register again.'
            })

@auth_logic_api.route('/resetpassword')
class user_reset_password(Resource):
    def post(self):
        userid, token, password = auth_logic_api.payload.get('userid'),\
                                    auth_logic_api.payload.get('token'),\
                                    auth_logic_api.payload.get('password')
        user = db_user_service.get_user_by_id(userid)
        if user:
            verification_result = user.verify(token, key='forgot') 
            if verification_result:
                user.set_password(password)
                user.save()
                return jsonify({
                    'result': True,
                    'redirect': '/auth/login',
                    'redirectDelay': 3
                })
            else:
                return jsonify({
                    'result': False,
                    'error': 'Your token probably expired. Please obtain it again on the login page.'
                })
        else:
            return jsonify({
                'result': False,
                'error': 'Your token probably expired. Please obtain it again on the login page.'
            })

@login_manager.unauthorized_handler
def unauthorized_handler():
    return redirect('/auth/login')

# Use this wrapper to protect pages and API calls
def admin_required(func):
    @wraps(func)
    def custom_decorated_view_for_page(*args, **kwargs):
        path_parts = request.path.split('/')
        if request.method in EXEMPT_METHODS:
            return func(*args, **kwargs)
        elif current_app.login_manager._login_disabled:
            return func(*args, **kwargs)
        elif not current_user.is_authenticated:
            return redirect('/auth/login')
        elif current_user.is_authenticated: 
            if current_user.role.name != 'Admin':
                if 'api' in path_parts:
                    return jsonify({
                        'result': False,
                        'error': 'You are not authorized. Please re-login and try again.'
                    })
                else:
                    print('ERROR: Unauthorized access to ', request.url)
                    return render_template('/app/error/error.html', error_code = 401, error_text = 'Unauthorized access'), 401
            else:
                return func(*args, **kwargs)
        return func(*args, **kwargs)
    return custom_decorated_view_for_page