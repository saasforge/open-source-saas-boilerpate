from flask import jsonify, render_template, send_file, Response, current_app, request, make_response
from flask_marshmallow import Marshmallow
from marshmallow import fields, validate, ValidationError, EXCLUDE, INCLUDE
from flask_restplus import Namespace, Resource, fields

from src.extensions import db, db_schema
#from src import db

jwt_api = Namespace('jwt_api', path='/app/api/')


@jwt_api.route('/register')
class user_registration(Resource):
    def post(self):
        if jwt_api.payload.get('username'):
            return {'username': jwt_api.payload.get('username')}
        return {'message': 'User registration'}

@jwt_api.route('/login')
class user_login(Resource):
    def post(self):
        if jwt_api.payload and jwt_api.payload.get('username'):
            return {'username': jwt_api.payload.get('username')}
        return {'message': 'User login'}
      
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
    def post(self):
        return {'message': 'Token refresh'}
      
      
