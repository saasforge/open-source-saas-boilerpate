from dotenv import load_dotenv
load_dotenv()

import os

basedir = os.path.abspath(os.path.dirname(__file__))

class Config(object):
    ENV = ''
    DEBUG = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = os.environ.get('db_url') # Store it in the hosting config
    COMPANY_NAME = 'Your company name' # Change to your company name
    JWT_SECRET_KEY = os.environ.get('jwt_secret_key')
    SECRET_KEY = os.environ.get('secret_key')

class ProductionConfig(Config):
    ENV = 'prod'
    DEBUG = False

class DevelopmentConfig(Config):
    ENV = 'dev'
    DEVELOPMENT = True
    DEBUG = True
    MAIL_SERVER = os.environ.get('mail_server')
    MAIL_PORT = os.environ.get('mail_port')
    MAIL_USE_SSL = True if os.getenv('MAIL_USE_SSL') == 'True' else False
    MAIL_USE_TLS = True if os.getenv('MAIL_USE_TLS') == 'True' else False
    MAIL_USERNAME = os.environ.get('mail_username')
    MAIL_DEFAULT_SENDER = os.environ.get('mail_username')
    MAIL_PASSWORD = os.environ.get('mail_password')
    ADMIN_EMAIL = os.environ.get('admin_email')

class TestingConfig(Config):
    ENV = 'test'
    TESTING = True

config = {
    'dev': DevelopmentConfig,
    'test': TestingConfig,
    'prod': ProductionConfig,
    'default' : DevelopmentConfig
}


class ConfigHelper:

    # Allows setting config from argument, or from "env" environment variable (see Activate.bat)

    @staticmethod
    def __check_config_name(env_name):
        return env_name is not None and env_name != '' and env_name in config is not None

    @staticmethod
    def set_config(args):
        if (args is not None and len(args) > 1):
            # Check argument
            if ConfigHelper.__check_config_name(args[1]):
                return config[args[1]]
        
        # Check os env var
        env = os.environ.get('env')
        if ConfigHelper.__check_config_name(env):
            if config.get(env):
                return config.get(env)

        # Nothing worked, return default config
        return config['default']
    