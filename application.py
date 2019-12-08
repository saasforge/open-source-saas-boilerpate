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
    return render_template('/app/error/error.html', error_code = 500, error_text = ex.message or ''), 500


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