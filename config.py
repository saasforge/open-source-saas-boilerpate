from dotenv import load_dotenv
import os

load_dotenv()
basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    ENV = ""
    DEBUG = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        "db_url"
    )  # Store it in the hosting config
    COMPANY_NAME = "Your company name"  # Change to your company name
    JWT_SECRET_KEY = os.environ.get("JWT_SECRET_KEY")
    SECRET_KEY = os.environ.get("SECRET_KEY")

    MAIL_SERVER = os.environ.get("MAIL_SERVER")
    MAIL_PORT = os.environ.get("MAIL_PORT")
    MAIL_USE_SSL = True if os.getenv("MAIL_USE_SSL") == "True" else False
    MAIL_USE_TLS = True if os.getenv("MAIL_USE_TLS") == "True" else False
    MAIL_USERNAME = os.environ.get("MAIL_USERNAME")
    MAIL_DEFAULT_SENDER = os.environ.get("MAIL_USERNAME")
    MAIL_PASSWORD = os.environ.get("MAIL_PASSWORD")
    ADMIN_EMAIL = os.environ.get("ADMIN_EMAIL")

    # AWS
    AWS_ACCESS_KEY_ID = os.environ.get("AWS_ACCESS_KEY_ID")
    AWS_SECRET_KEY = os.environ.get("AWS_SECRET_KEY")
    AWS_BUCKET_NAME = os.environ.get(
        "AWS_BUCKET_NAME"
    )  # Create additional variables for other buckets

    # Tests
    TEST_USER_EMAIL = os.environ.get("TEST_USER_EMAIL")
    TEST_USER_NAME = os.environ.get("TEST_USER_NAME")
    TEST_USER_PASS = os.environ.get("TEST_USER_PASS")


class ProductionConfig(Config):
    ENV = "prod"
    DEBUG = False


class DevelopmentConfig(Config):
    ENV = "dev"
    DEVELOPMENT = True
    DEBUG = True


class TestingConfig(Config):
    ENV = "test"
    TESTING = True


config = {
    "dev": DevelopmentConfig,
    "test": TestingConfig,
    "prod": ProductionConfig,
    "default": DevelopmentConfig,
}


class ConfigHelper:

    # Allows setting config from argument, or 
    # from "env" environment variable (see Activate.bat)

    @staticmethod
    def __check_config_name(env_name):
        return (
            env_name is not None
            and env_name != ""
            and env_name in config is not None
        )

    @staticmethod
    def set_config(args):
        if args is not None and len(args) > 1:
            # Check argument
            if ConfigHelper.__check_config_name(args[1]):
                return config[args[1]]

        # Check os env var
        env = os.environ.get("env")
        if ConfigHelper.__check_config_name(env):
            if config.get(env):
                return config.get(env)

        # Nothing worked, return default config
        return config["default"]
