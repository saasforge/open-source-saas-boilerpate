from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_mail import Mail
from flask_alembic import Alembic
from flask_login import LoginManager

db = SQLAlchemy()
db_schema = Marshmallow()
mail = Mail()
alembic = Alembic()
login_manager = LoginManager()