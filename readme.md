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

