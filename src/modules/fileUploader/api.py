from flask import jsonify, render_template, send_file, Response, current_app, request, make_response, redirect, url_for
from flask_marshmallow import Marshmallow
from marshmallow import fields, validate, ValidationError, EXCLUDE, INCLUDE
from flask_restplus import Namespace, Resource, fields, Api

from src.shared.utils.user_auth_wrapper import login_required, get_current_user_id
from src.shared.utils.extensions import db, db_schema
from src.shared.services import db_user_service
from src.modules.fileUploader import aws_s3_service
from src.shared.utils.global_functions import get_config_var

uploader_api = Namespace('upload_api', path ='/app/api/upload')


@uploader_api.route('/<folder_name>/<generate_flag>')
class upload_file(Resource):
    @login_required
    def post(self, folder_name, generate_flag):
        current_user_id = get_current_user_id()
        current_user = db_user_service.get_user_by_id(current_user_id)
        uploaded_urls = []

        if current_user:
            for key in request.files:               
                uploaded_file = request.files.get(key)
                bucket_name = get_config_var('AWS_BUCKET_NAME')
                upload_result = aws_s3_service.upload_file(uploaded_file, bucket_name, folder_name, generate_flag)
                if upload_result.get('result') == True:
                    # Use this code to screen the actual address
                    #    public_file_url = '/pic/{0}/{1}'.format(folder_name, upload_result.get('file_name')) 
                    uploaded_urls.append(upload_result.get('file_url'))  
                else:
                    return jsonify({
                        'result': False,
                        'error': 'Could not upload files...'
                    })
            return jsonify({
                'result': True,
                'file_urls': uploaded_urls
                #'file_name': upload_result.get('file_name')
            })
        return jsonify({
            'result': False,
            'error': 'Cannot find user.'
        })

@uploader_api.route('/<folder_name>')
class delete_file(Resource):
    @login_required
    def delete(self, folder_name):
        current_user_id = get_current_user_id()
        current_user = db_user_service.get_user_by_id(current_user_id)
        bucket_name = get_config_var('AWS_BUCKET_NAME')
        if current_user:
            # Add additional checking preventing abuse deletion
            delete_result = aws_s3_service.delete_file(bucket_name, folder_name, uploader_api.payload.get('url'))
            return jsonify({
                'result': delete_result.get('result'),
                'error': delete_result.get('error')
            })

        return jsonify({
            'result': False,
            'error': 'Cannot find user.'
        })