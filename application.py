import click
from flask import send_from_directory, current_app, render_template
from flask.cli import with_appcontext
from src import create_app

# Application factory
application = create_app()

# Init custom static folder
@application.route('/custom_static/<path:filename>')
def custom_static(filename):
    return send_from_directory(application.root_path, filename)

@application.errorhandler(404)
def page_not_found(ex):
    return render_template('/app/error/error.html', error_code = ex.code), ex.code

@application.errorhandler(500)
def not_handled_exception(ex):
    # to-do: Log the problem
    print('Server-side ERROR: ', ex)
    message = ex.message if hasattr(ex, 'message') else (
                ex.args[0] if hasattr(ex, 'args') and len(ex.args) > 0 else \
                'Some error occured... please try again'
    )
    return render_template('/app/error/error.html', error_code = 500, error_text = message), 500

@application.cli.command()
@with_appcontext
def dbupdate():
    from src.shared.utils.db_scaffold import reinit_db
    reinit_db('update')

@application.cli.command()
@with_appcontext
def dbcreate():
    from src.shared.utils.db_scaffold import reinit_db
    reinit_db('create')

@application.cli.command()
@with_appcontext
def dbseed():
    from src.shared.utils.db_scaffold import reinit_db
    reinit_db('seed')