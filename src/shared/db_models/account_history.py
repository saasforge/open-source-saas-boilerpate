from datetime import datetime
import uuid
from flask import current_app, request, url_for
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import inspect
from sqlalchemy.dialects.postgresql import UUID

from src.shared.utils.extensions import db
from src.shared.db_models.consts.event_type import EventType, get_text_event


class AccountHistory(db.Model):
    __tablename__ = "account_history"
    id = db.Column(
        UUID(as_uuid=True), primary_key=True, default=lambda: uuid.uuid4().hex
    )
    account_id = db.Column(UUID(as_uuid=True), db.ForeignKey("account.id"))
    date = db.Column(db.DateTime(), nullable=True)
    event = db.Column(
        db.String(32), nullable=True
    )  # Some text representation of event
    comment = db.Column(db.String(128))  # Text comment

    def toDict(self):
        def read_field(field_value, field_name):
            if field_name == "event":
                return get_text_event(EventType(field_value))
            res = str(field_value)
            return res

        return {
            c.name: read_field(getattr(self, c.name), c.name)
            for c in self.__table__.columns
        }
        # { c.key: getattr(self, c.key) for c in
        # inspect(self).mapper.column_attrs }
