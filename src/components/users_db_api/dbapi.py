'''
This component is to abstract working with User, Role, Account, AccountHistory entities. 
Implement a concrete implementation of these classes here and in db_models classes. Any other components don't care how 
exactly it's implemented.
'''
from datetime import datetime
from src.shared.db_models.user import User
from src.shared.db_models.role import Role
from src.shared.db_models.account import Account
from src.shared.db_models.account_history import AccountHistory


def create_user(username, email, password):
    '''
    Creates user and save into database. Returns True if user is created, else False.
    '''
    user = User(username = username,
                email = email,
                confirmed = False)
    user.set_password(password)
    user.created = datetime.now()
    return user.save()

def get_user_by_id(id):
    return User.query.filter_by(id = id).first()
    
def find_user_by_email(email):
    '''
    Get a user by email.
    '''
    user = User.query.filter_by(email = email).first()
    return user


def update_username(email, username):
    pass

def update_password(old_password, new_password):
    pass