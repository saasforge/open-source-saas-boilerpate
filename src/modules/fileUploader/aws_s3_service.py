import boto3, uuid, os, shutil, requests, json, copy
from io import BytesIO
#from PIL import Image
from botocore.exceptions import ClientError
from flask import jsonify, request, current_app, render_template
from flask_login import current_user

s3_client = None
s3_resource = None


def get_s3_credentials():
    global s3_client, s3_resource, eb_client
    if s3_client is None:
        s3_client = boto3.client('s3', 
            aws_access_key_id = current_app.config['AWS_ACCESS_KEY_ID'],
            aws_secret_access_key = current_app.config['AWS_SECRET_KEY'])
    if s3_resource is None:
        s3_resource = boto3.resource('s3',        
            aws_access_key_id = current_app.config['AWS_ACCESS_KEY_ID'],
            aws_secret_access_key = current_app.config['AWS_SECRET_KEY'])


def upload_file(uploaded_file, bucket_name, folder_name, generate_id_flag):
    get_s3_credentials()
    file_url = ''
    file_name = uploaded_file.filename
    full_file_name, ext = os.path.splitext(file_name)
    if generate_id_flag == 'generate':
        id = uuid.uuid4().hex
        file_name = '{0}{1}'.format(id, ext) if ext != '' else id
    try:
        preview_file = None
        key_name = '{0}/{1}'.format(folder_name, file_name)
        s3_client.upload_fileobj(
            uploaded_file,
            bucket_name,
            key_name,
            #uploaded_file.filename,
            ExtraArgs={
                'ContentType': uploaded_file.content_type
            }
        )
        bucket_location = s3_client.get_bucket_location(Bucket = bucket_name)
        file_url = "https://s3-{0}.amazonaws.com/{1}/{2}".format(
            bucket_location['LocationConstraint'],
            bucket_name,
            key_name)
        
    except Exception as e:
        # This is a catch all exception, edit this part to fit your needs.
        print("Something went wrong during uploading a file: ", e)
        return {
            'result': False,
            'url': None, 
            'error': 'Some error occured during uploading file... pleasy, try again.'
        }
    return {
        'result': True,
        'file_url': file_url,
        'file_name': file_name
    }

def delete_file(bucket_name, folder_name, file_url):
    get_s3_credentials()
    try:
        file_name = file_url[file_url.rfind("/")+1:]
        key_name = '{0}/{1}'.format(folder_name, file_name)
        s3_client.delete_object(Bucket = bucket_name, Key = key_name)

    except Exception as e:
        # This is a catch all exception, edit this part to fit your needs.
        print("Something went wrong during deleting a file: ", e)
        return {
            'result': False,
            'error': 'Some error occured during deleting file... pleasy, try again.'
        }
    return {
        'result': True
    }