from pathlib import Path
import importlib
from src.extensions import db, alembic
from config import ConfigHelper

from src.shared.db_models.user import User
from src.shared.db_models.role import Role

#Dynamic import of models
print ('Dynamic import')
modules_folder = Path('src\\shared\\db_models')

for module in modules_folder.iterdir():
    if module.is_file():
        module_name = module.name.replace('.py', '')
        importlib.import_module('src.shared.db_models.{0}'.format(module_name))

def reinit_db(db_option=''):
    if db_option == 'update':
        print('updating database')
        alembic.revision('made changes')
        alembic.upgrade()
    elif db_option == 'create': 
        print('dropping all')
        db.drop_all() 
        print('recreating all')
        db.create_all()
 
        admin_role = Role(name = 'Admin')
        user_role = Role(name = 'User', is_default = True)
        db.session.add(admin_role)
        db.session.add(user_role)
        db.session.commit()