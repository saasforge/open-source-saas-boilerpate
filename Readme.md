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