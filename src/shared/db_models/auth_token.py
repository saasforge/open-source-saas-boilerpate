from datetime import datetime
import uuid
from flask import current_app, request, url_for
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects.postgresql import UUID
from src.shared.utils.extensions import db

class AuthToken(db.Model):
    __tablename__ = 'auth_token'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=lambda: uuid.uuid4().hex)
    token_id = db.Column(db.String(120))
    token_type = db.Column(db.String(10), nullable=False)
    user_identity = db.Column(db.String(50), nullable=False)
    revoked = db.Column(db.Boolean, nullable=False)
    expires = db.Column(db.DateTime, nullable=False)

    
    def add_valid_token(self):
        db.session.add(self)
        db.session.commit()
    
    @classmethod
    def is_token_blacklisted(self, token_id):
        query = self.query.filter_by(token_id = token_id).first()
        return bool(query)

