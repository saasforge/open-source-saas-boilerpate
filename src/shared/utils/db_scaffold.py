from pathlib import Path
import importlib, glob
from src.shared.utils.extensions import db, alembic
from config import ConfigHelper

from src.shared.db_models.user import User
from src.shared.db_models.role import Role

from src.shared.services import db_user_service
from src.shared.utils.global_functions import get_config_var

#Dynamic import of models
print ('Dynamic import')
models_folder = [Path.joinpath(Path.cwd(), 'src/shared/db_models')]
models_folder += list(map(lambda path: Path.joinpath(Path.cwd(), path), glob.glob('src/modules/*/db_models')))

for model_folder in models_folder:
    for module in model_folder.iterdir():
        if module.is_file():
            start_index = module.parts.index('src')
            import_parts = module.parts[start_index:] #list(filter(lambda part: , module.parts))
            importlib.import_module('.'.join(import_parts).replace('.py', ''))


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
    elif db_option == 'seed':
        print('Adding test user')
        new_user = db_user_service.create_user(get_config_var('TEST_USER_NAME'), get_config_var('TEST_USER_EMAIL'), get_config_var('TEST_USER_PASS'), True)
        new_user.save()