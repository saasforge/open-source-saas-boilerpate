# SaaS-Build boilerplate
This free boilerplate allows creating a working SaaS web application.
# Technologies
- Python (Flask) - backend
- PostgreSQL - database
- ReactJS - frontend
- CSS/SCSS for styling
- Fontawesome
- Webpack/Babel - frontend building

# Features
## User authentication
- Email authentication (with email confirmation)
- User registration, login, logout
- Simple user profile page

## Interface

## Project structure
All features/functions are put into separate structures, often front-end and back-end side-by-side. The whole project is divided into the following parts:
### Blueprints (back-end applications)
Based on [Flask blueprint](https://flask.palletsprojects.com/en/1.1.x/blueprints/), it allows separating parts of an application that are significantly different each from another and requires a different level of authentication/authorization.
- Authentication (contains the root HTML file and linked to [the authentication ReactJS component](#auth))
- Dashboard (dashboard root HTML linked to [the dashboard view](#dashboard))
- Errors page (for serving back-end error, not a blueprint, just a simple HTML page)

### Views
Views are pages that are being rendered in the applications. May include components and call services.
- Dashboard view (jsx file + several data files for providing data from left and top menus and dashboard components)
- Profile view (jsx + server-side API)
- Error pages view (jsx for serving dashboard 404 error)

### Components (in alphabetical order)
#### Alert
Styled block with and icon and text. There are 4 types of alerts:
**Error**

**Warning**

**Info**

**Success**

### Services
### Database models

## Dev's features
All features are now divided into units and components. Frontend and backend are put side-by-side for easier reference and development.
Autocreation of tables for users and roles (2 roles are added automatically: User and Admin)
Autoupdating existing database
Simple responsive web interface with header, left collapsing menu, central part, and fixed status bar
Handling 404 and 500 errors
Integration with Google App Engine (reading entities if env variables are not accessible)

Automatic importing apis,  namespaces
All styles in one folder what allows to change and create a new theme fast
ES6
Refer @src as a root source folder
Easy menus data defining with automatic routes generation

# Components

## Conventions
While creating components with backend Python code and if you want to provide any API 
endpoinst, put them into api.py file. It will be found and recognized automatically. Also you MUST register them into 
registry.py file. 
> Note. It's only about providing endpoints (like '/api/whatever'), if you create just interface to access some classes or data, don't register here.

## Registration
Questions:
- How to register packages that a given component uses, in the virtual environment? They should be added into requirements.txt.
- How to initialize libs that a given component uses, for example, like lib.init(app)?

Currently jwt component uses package that needs to be installed and initialized.

### Custom static files
Using in Python (in html files): 
For example, to specify path to a resource in some component:

```html
<link rel="icon" type="image/x-icon" href="{{ url_for("custom_static", 
    filename="shared/components/media_component/favicon.ico") }}" />
```
## Dashboard
### Left menu
To specify elements of the left menu, edit 
#### Menu element
#### Menu link
#### Linked content

### Links/content

## Services/functions
### Config: how to securely configure your variables
1. Add the variable in config.py directly and assign its value (only if it's not sensitive, like a flag to use SSL or TLS)
2. Sensitive data put into the environment variables. It could be done in 2 ways:
- Add them into venv/scripts/activate script
- add them into .env file in the project folder.
3. In the code always call get_config_var:
```python
from src.shared.utils.global_functions import get_config_var
get_config_var('var_name')
```
This function also can be safely used in jinja HTML files:
```html
<title>{{get_config_var('COMPANY_NAME')}}</title>
```