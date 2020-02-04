from sqlalchemy.dialects.postgresql import UUID
from flask_sqlalchemy import SQLAlchemy
import uuid
from flask import current_app
from flask_login import UserMixin
from passlib.hash import pbkdf2_sha256 as sha256
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer

from src.shared.utils.global_functions import get_config_var
from src.shared.db_models.role import Role
from src.shared.db_models.account import Account

from src.shared.utils.extensions import db, login_manager

class User(UserMixin, db.Model):
    __tablename__ = 'user'

    id = db.Column(UUID(as_uuid=True),
        primary_key=True, default=lambda: uuid.uuid4().hex)
    username = db.Column(db.String(120), nullable = False)
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
            admin_emails = get_config_var('ADMIN_EMAIL').split(' ') if get_config_var('ADMIN_EMAIL') is not None else []
            if len(admin_emails) > 0 and self.email in admin_emails:
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

    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(uuid.UUID(user_id))

    def generate_hash(self, password):
        return sha256.hash(password)

    def verify_hash(self, password):
        return sha256.verify(password, self.password_hash)

    def generate_confirmation_token(self, expiration=3600):
        s = Serializer(get_config_var('SECRET_KEY'), expiration)
        return s.dumps({'confirm': self.id.__str__()}).decode('utf-8')

    def confirm(self, token):
        s = Serializer(get_config_var('SECRET_KEY'))
        try:
            data = s.loads(token.encode('utf-8'))
        except:
            return False
        if data.get('confirm') != self.id.__str__():
            return False
        self.confirmed = True
        return True

    def ping(self):
        self.last_seen = datetime.utcnow()
        db.session.add(self)

    def save(self):
        try:
            db.session.add(self)
            db.session.commit()
        except Exception as ex:
            print('ERROR while saving user:')
            print(ex) # to-do: log
            return False
        return True