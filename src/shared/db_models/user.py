from sqlalchemy.dialects.postgresql import UUID
from flask_sqlalchemy import SQLAlchemy
import uuid

from src.extensions import db

class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(UUID(as_uuid=True),
        primary_key=True, default=lambda: uuid.uuid4().hex)
    username = db.Column(db.String(120), unique = True, nullable = False)
    email = db.Column(db.String(64), unique=True)
    password = db.Column(db.String(120), nullable = False)
    role_id = db.Column(UUID(as_uuid=True), db.ForeignKey('role.id'))
    confirmed = db.Column(db.Boolean, default=False, server_default='f')
    account_id = db.Column(UUID(as_uuid=True), db.ForeignKey('account.id'))
    account = db.relationship('Account', back_populates='user')
    created = db.Column(db.DateTime(), nullable=True)
    
    def save_to_db(self):
        db.session.add(self)
        db.session.commit()