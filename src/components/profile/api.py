from flask import jsonify, render_template, send_file, Response, current_app, request, make_response, redirect, url_for
from flask_marshmallow import Marshmallow
from marshmallow import fields, validate, ValidationError, EXCLUDE, INCLUDE
from flask_restplus import Namespace, Resource, fields, Api

from src.shared.utils.user_auth_wrapper import login_required, get_current_user_id
from src.shared.utils.extensions import db, db_schema
from src.components.users_db_api import dbapi

profile_api = Namespace('profile_api', path ='/app/api/profile')

@profile_api.route('/')
class retrieve_user_profile(Resource):
    @login_required
    def get(self):
        current_user_id = get_current_user_id()
        current_user = dbapi.get_user_by_id(current_user_id)
        if current_user:
            return jsonify({
                'result': True,
                'username': current_user.username,
                'email': current_user.email
            })
        return jsonify({
            'result': False,
            'error': 'Cannot find user.'
        })

    @login_required
    def post(self):
        current_user_id = get_current_user_id()
        current_user = dbapi.get_user_by_id(current_user_id)
        if current_user:
            try:
                current_user.username = profile_api.payload.get('username')
                current_user.save()
            except Exception as ex:
                # to-do: log exception, for not just print it
                print('ERROR while saving profile')
                print(ex)
                return jsonify({
                    'result': False,
                    'error': 'Can not save user.'
                })
            return jsonify({
                'result': True
            })
        return jsonify({
            'result': False,
            'error': 'Cannot find user.'
        })