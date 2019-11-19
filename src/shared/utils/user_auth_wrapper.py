from functools import wraps
from flask import request, current_app
from flask import jsonify

# Remove or replace this line to switch another way to authenticate
from flask_jwt_extended import jwt_required, get_jwt_identity

def login_required(func):
    # Replace this line
    return jwt_required(func)

# Replace this line for any other authentication provider
'''
Returns the current user as object: {id: Guid, username: username, email: email}
'''
def get_current_user_id():
    return get_jwt_identity()