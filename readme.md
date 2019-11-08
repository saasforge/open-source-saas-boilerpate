# Conventions
While creating components with backend Python code and if you want to provide any API 
endpoinst, put them into api.py file. It will be found and recognized automatically.

### Custom static files
Using in Python (in html files): 
For example, to specify path to a resource in some component:

```html
<link rel="icon" type="image/x-icon" href="{{ url_for("custom_static", 
    filename="shared/components/media_component/favicon.ico") }}" />
```