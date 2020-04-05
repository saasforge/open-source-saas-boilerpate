from flask import jsonify, render_template, send_file, Response, current_app, request, make_response, redirect, url_for
from flask_marshmallow import Marshmallow
from marshmallow import fields, validate, ValidationError, EXCLUDE, INCLUDE
from flask_restplus import Namespace, Resource, fields, Api

from src.shared.utils.user_auth_wrapper import login_required, get_current_user_id
from src.shared.utils.extensions import db, db_schema
from src.shared.services import db_user_service
from src.modules.fileUploader import upload_service
from src.shared.utils.global_functions import get_config_var

uploader_api = Namespace('uploader_api', path ='/app/api/upload')


@uploader_api.route('/<generate_flag>')
class retrieve_user_profile(Resource):
    @login_required
    def post(self, generate_flag):
        current_user_id = get_current_user_id()
        current_user = db_user_service.get_user_by_id(current_user_id)
        if current_user:
            uploaded_file = request.files.get('files[]') or request.files.get('file')
            bucket_name = get_config_var('AWS_BUCKET_NAME')
            upload_result = upload_service.upload_file(uploaded_file, bucket_name, generate_flag)
            if upload_result.get('result') == True:
                return jsonify({
                    'result': True,
                    'file_url': upload_result.get('file_url'),
                    'file_name': upload_result.get('file_name'),
                })
            else:
                return jsonify({
                    'result': False,
                    'error': upload_result.get('error')
                })
        return jsonify({
            'result': False,
            'error': 'Cannot find user.'
        })