from datetime import datetime
import uuid
from flask import current_app, request, url_for
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects.postgresql import UUID, JSONB

from src.shared.utils.extensions import db
from src.shared.db_models.account_history import AccountHistory

class Account(db.Model):
    __tablename__ = 'account'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=lambda: uuid.uuid4().hex)
    user = db.relationship('User', back_populates='account')
    account_history = db.relationship("AccountHistory", backref='account', lazy='dynamic')

    # Payment information
    payment_vendor_code = db.Column(db.String(64), nullable=True) # For example, 'stripe' or 'paypal'
    payment_data = db.Column(JSONB(), nullable=True) # Vendor-specific information in Json format