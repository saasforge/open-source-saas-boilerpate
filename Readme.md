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
Note. This is just description of components, all documentation can be found for each component in its folder.
#### Alert
Styled block with and icon and text. There are 4 types of alerts:
- Success
- Info
- Warning
- Error

![Alerts](https://github.com/saasforge/saas-forge-public-docs/blob/master/alerts.png?raw=true)

**Tip** You can set up if you want an alert to disappear after a required number of seconds.

#### Auth
Contains the server-side API and ReactJS components.
##### Server-side part
1. API, user registration/email confirmation logic. 
2. The authentication is implemented with using JWT.

##### Front-end part
1. Component with routes working as a SPA (single page application)
2. Responsive design
3. Pages: 
- register
- login
- finish registration info page
- confirmation page (with automatic redirection to the login page)

##### Screenshots
**Registration page on a normal computer screen**

![Registration page on a normal computer screen](https://github.com/saasforge/saas-forge-public-docs/blob/master/registerBigScreen.png?raw=true)

**Registration page on a mobile screen**

![Registration page on a mobile screen](https://github.com/saasforge/saas-forge-public-docs/blob/master/registerSmallScreen.png?raw=true)

**Confirmation page on a mobile screen**

![Confirmation page on a mobile screen](https://github.com/saasforge/saas-forge-public-docs/blob/master/confirmationSmallScreen.png?raw=true)

#### Dropdown menu
Dropdown menu is used in the header of the dashboard. It's based on a simple JSON structure, for example this data

```javascript
const topMenu = [
    {title: 'Profile', url: '/app/profile', component: lazy(() => import('@src/views/profile/ProfileView'))},
    {title: 'Change password', url: '/app/password', component: lazy(() => import('@src/views/password/ChangePasswordUI'))},
    {divider: true},
    {title: 'Logout', url: '/api/auth/logout', method: 'post', redirectUrl: '/auth/login'}
];
```

will generate the following menu:

![Example top menu](https://github.com/saasforge/saas-forge-public-docs/blob/master/topMenu.png?raw=true)

##### Features
- Specify data in the human-friendly JSON data structure
- You can specify divider
- You can specify method if it's not POST
- You can specify redirectURL if you don't need to load any component but rather redirect user to the different page
- You don't need to import components anywhere else, all routes will be generated automatically

#### JWT
Is used for the token authentication. The component has the API server-side part and JS file with functions called automatically. In our implementation we use cookie-based token as for it's most safe method of using tokens at the moment.

##### Server-side API
It has just 4 functions:
- init_app (Inits JWT-Flask manager and add needed config variables to the application)
- login_create_tokens(creates a token on user's login and add attach the corresponding cookies to the response object)
- logout(unset cookies from the response on user's logout)
- token_refresh(updates the access' token on demand).

##### Frond-end functions
This file is referred in the Auth jsx component and it's only purpose is to add the interceptor in all the following requests done by axios. You don't need to call it directly.

#### Left menu
Responsive, collapsible menu with any amount of items on each level. You create it just filling up the JSON data file:

```javascript
    {
        groupTitle: 'Demo',
        items: [
            {
                title: 'Alerts', 
                icon: 'exclamation-triangle',
                color: 'yellow',
                url: '/app/demo/alerts',
                component: lazy(() => import('@src/views/componentsDemo/AlertDemoView'))
            }
        ]
    }
```

Note. If you prefer you can import component separately and assign it excplicitly in the menu data structure.

**Menu when expanded and collapsed**

![Menu when expanded and collapsed](https://github.com/saasforge/saas-forge-public-docs/blob/master/leftMenu.png?raw=true)

**Menu on the small screen**

![Menu on the small screen](https://github.com/saasforge/saas-forge-public-docs/blob/master/leftMenuSmallScreen.png?raw=true)

##### Features
- Specify data in the human-friendly JSON data structure
- You can specify icon (Fontawesome) and color for items (if you don't the default icon and colors will be used for the collapsed version)
- You can specify url and lazy loaded component for better performance
- You don't need to import components anywhere else, all routes will be generated automatically

#### Maker brand
Just small piece of HTML containing link to our website (SaaSForge). You may remove it but you **can't** replace it wit your own brand.

### Views (front-end)
Views in the terms of this boilerplate are pages that can be rendered into the dashboard, referring some front-end components, endpoints etc. Technically, they're just ReactJS components but they all will be rendered into dashboard accordingly to the routes. A folder with view also can contain *api.py* with the endpoint that is used by this given view. 

> Note. All endpoints are imported automatically, for details see the corresponding secion in this Readme.

The current version of the boilerplate includes the following views.
#### ComponentsDemo

#### 

### Services
#### Email
Can be used for the sending transactional email. 

### Database models
Contains the following tables:
- User
- Role
- Account
- AccountHistory

When done any changes to the tables including adding new tables run the following command from the terminal:

```bash
flask dbupdate
```

> Note. Make sure your environment variables has the following var: *FLASK_APP=application* else it wount work.

> Note 2. Don't forget to add db_url variable with URL to your database to the environment variables.

**Tip.** When this command runs for the first time it creates all the tables as well as 2 roles: User and Admin.

## Dev's features and tips
- All features are now divided into units and components. Frontend and backend are put side-by-side for easier reference and development.
- Handling 404 and 500 errors 
- AWS Beanstalk-friendly (you don't need to change any files' names to start deploying the project there)
- Automatic importing APIs,  namespaces (when add a new API you don't need to import it explicitly, you just need to name it *api.py*)
- All styles in one folder what allows to change and create a new theme fast 
- ES6
- Refer @src as a root source folder in you JSX and JS code

## Conventions / tips
### Common
- While creating components with backend Python code and if you want to provide any API endpoints (like '/app/api/whatever'), put them into api.py file. It will be found and imported automatically. 
- If you API file needs to register some extension provide the init_app(app) function and it will be called automatcally. For example:

```python
def init_app(app):
    jwt.init_app(app)
```
- If you would like to create a sevice to be called from the server-side code (not by the front-end using endpoint) create a new folder (file) in the */src/shared/services* folder. 

> Note. If you need to use some extension there, the same create a function *init_app* that will be called automatically.

### Custom static files
Using in Python (in html files): 
For example, to specify path to a resource in some component:

```html
<link rel="icon" type="image/x-icon" href="{{ url_for("custom_static", 
    filename="shared/components/media_component/favicon.ico") }}" />
```

### Services/functions
#### Config: how to securely configure your variables
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

#### Making requests from the front-end code
Use axios(link) for making requests. For example (asynchronous way):

```javascript
import axios from 'axios';
...
componentDidMount = async()=> {
    // Load user data
    try {
        let response = await axios.get('/app/api/profile');
        if (response.data.result){
            this.setState({ username: response.data.username});
        } else {
            this.setState({ status: 'error', message: response.data.error || 'Some error occured during this request... please try again.' });
        }
    } catch {
        this.setState({ status: 'error', message: 'Some error occured during this request... please try again.' });
    }
}
```
