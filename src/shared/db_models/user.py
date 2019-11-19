from sqlalchemy.dialects.postgresql import UUID
from flask_sqlalchemy import SQLAlchemy
import uuid
from flask import current_app
from passlib.hash import pbkdf2_sha256 as sha256
from src.shared.db_models.role import Role
from src.shared.db_models.account import Account

from src.shared.utils.extensions import db

class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(UUID(as_uuid=True),
        primary_key=True, default=lambda: uuid.uuid4().hex)
    username = db.Column(db.String(120), unique = True, nullable = False)
    email = db.Column(db.String(64), unique=True)
    password_hash = db.Column(db.String(120), nullable = False)
    role_id = db.Column(UUID(as_uuid=True), db.ForeignKey('role.id'))
    confirmed = db.Column(db.Boolean, default=False, server_default='f')
    account_id = db.Column(UUID(as_uuid=True), db.ForeignKey('account.id'))
    account = db.relationship('Account', back_populates='user')
    created = db.Column(db.DateTime(), nullable=True)

    def __init__(self, **kwargs):
        super(User, self).__init__(**kwargs)
        if self.role is None:
            if self.email == current_app.config.get('ADMIN_EMAIL'):
                self.role = Role.query.filter_by(name='Admin').first()
            else:
                default_role = Role.query.filter_by(is_default=True).first()
                self.role = default_role
        if self.account == None:
            self.account = Account()
    
    def set_password(self, password):
        '''
        Creates a hash from a password
        '''
        hash = self.generate_hash(password)
        self.password_hash = hash

    def generate_hash(self, password):
        return sha256.hash(password)

    def verify_hash(self, password):
        return sha256.verify(password, self.password_hash)

    def save(self):
        try:
            db.session.add(self)
            db.session.commit()
        except Exception as ex:
            print('ERROR while saving user:')
            print(ex) # to-do: log
            return False
        return True