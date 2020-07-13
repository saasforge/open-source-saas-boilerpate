from functools import wraps
from flask import request, current_app
from flask import jsonify

# Remove or replace this line to switch another way to authenticate
from flask_jwt_extended import jwt_required, get_jwt_identity, jwt_optional

def login_required(func):
    # Replace this line
    return jwt_required(func)

# Use this wrapper if you don't require user to be authenticated.
# To check if user is logged in, call get_current_user_id - it will return user's id
# if a user is logged in else None
def login_optional(func):
    return jwt_optional(func)

# Replace this line for any other authentication provider
'''
Returns the current user as object: {id: Guid, username: username, email: email}
'''
def get_current_user_id():
    return get_jwt_identity()