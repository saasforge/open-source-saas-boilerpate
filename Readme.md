![SaaS-Boilerpate](https://github.com/saasforge/saas-forge-public-docs/blob/master/saas-build.png?raw=true)

# SaaS application boilerplate
This free boilerplate allows creating a working SaaS web application.
Please file all the information on our website:
https://www.saasforge.dev

# Technologies

- Python (Flask) - backend
- PostgreSQL - database
- ReactJS - frontend
- CSS/SCSS for styling
- Fontawesome
- Webpack/Babel - frontend building
- Cypress - end-to-end testing
- ESLint & flake8 - static analysis
- Github Actions & Gitlab CI - continuous integration

## System requirements
Currently, the boilerplate works with Python 3.5.

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

### Modules
Modules are the code that can't be decoupled and should go together: front-end and back-end. They both belong to the same functionality and front-end often calls endpoints from the same module's back-end.
> The API endpoints will be imported and registered in the dashboard blueprint automatically.

> If back-end requires to initialize some extension using init_api() this function should be provided at the .py code and will be called automatically.

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

#### ComponentsDemo
Contains demo views for alerts.

#### ErrorPages
Currently, only one error (404, file not found) is currently handled. When a user enters a non-existing URL (for example, /app/blabla), the error will be shown:

![404 error](https://github.com/saasforge/saas-forge-public-docs/blob/master/404dashboard.png?raw=true)

#### Profile
##### API 
Contains one endpoint */app/api/profile* with 2 methods:
- GET (login required): returns the current user data
- POST (login required): updates the current user profile (username)

##### Profile view
Simple view to update the current user's username:
![Profile saved](https://github.com/saasforge/saas-forge-public-docs/blob/master/profile.png?raw=true)



### Components (in alphabetical order)
Components are ReactJS piece of code, sometimes accompanied by CSS. Doesn't have any back-end part.
Note. This is just description of components, all documentation can be found for each component in its folder.
#### Alert
Styled block with and icon and text. There are 4 types of alerts:
- Success
- Info
- Warning
- Error

![Alerts](https://github.com/saasforge/saas-forge-public-docs/blob/master/alerts.png?raw=true)

**Tip** You can set up if you want an alert to disappear after a required number of seconds (see documentation for details).


#### Dropdown menu
Dropdown menu is used in the header of the dashboard. It's based on a simple JSON structure, for example this data

```javascript
const topMenu = [
    {title: 'Profile', url: '/app/profile', component: lazy(() => import(/* webpackChunkName: "profile" */ '@src/modules/profile/ProfileView'))},
    {title: 'Change password', url: '/app/password', component: lazy(() => import(/* webpackChunkName: "password" */ '@src/modules/password/ChangePasswordUI'))},
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
                component: lazy(() => import(/* webpackChunkName: "alerts" */ '@src/modules/componentsDemo/AlertDemoView'))
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


### Services
#### Email
Can be used for the sending transactional email. Example of using:

```python
from src.shared.services.email import service as email_service

email_service.send_email(user.email, get_config_var('COMPANY_NAME') + ': Confirm your registration', 
                        text_body, 
                        html_body, 
                        get_config_var('COMPANY_NAME'),
                        get_config_var('MAIL_DEFAULT_SENDER'))
```


### Utils
Some important utils are located in */src/shared/utils* folder.

#### DB scaffolding functions
Contains functions to update database based on the current db_models. Automatically finds all models. Don't call this function directly, it can be called implicitly using the following script:

```
flask dbupdate
```

#### Extensions
Contains the instances of extensions to be used in different files. All of them are inited in the app factory.

#### Global functions
Contains several functions used globally. Some of them are also available for using in jinja.

##### get_config_var
Safely returns the corresponding ```app.config[var_name]``` if found, else None.
Example of using in jinja HTML layout:

```html
<title>{{get_config_var('COMPANY_NAME')}}</title>
```

##### flat_validation_errors(errors_object)
Takes an errors object (like ```{'error1': 'Text of error 1', 'error2': 'Error 2'}```) and returns a single string containing all the error texts.

#### Server error handler
If some error (non-handled exception) occured it handles and returns the following page:

![Server-side error page](https://github.com/saasforge/saas-forge-public-docs/blob/master/serverSideError.png?raw=true)

#### User authentication wrappers
##### @loginrequired wrapper
To protect endpoints and make them accessible only if user is authenticated, use this wrapper. Currently, it wraps JWT wrapper, but you can easily change it to anything else. Example of using:

```python
from src.shared.utils.user_auth_wrapper import login_required

@profile_api.route('/')
class retrieve_user_profile(Resource):
    @login_required
    def get(self):
        ...
```
##### get_current_user_id wrapper function
This function wraps JWT get_jwt_identity and returns the current user's id what can be easily used for getting any data associated with the current user:

```python
from src.shared.utils.user_auth_wrapper import get_current_user_id

@profile_api.route('/')
class retrieve_user_profile(Resource):
    @login_required
    def get(self):
        current_user_id = get_current_user_id()
        current_user = db_user_service.get_user_by_id(current_user_id)
        ...
```


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


### Static Analysis
The boilerplate uses ESLint and flake8 in order to perform static code analysis. There is a .eslintrc.json in the root directory which extends `eslint:recommended` and is used for JS and JSX files. There is also cypress/.eslintrc.json which extends `plugin:cypress/recommended` for helping write Cypress integration tests (*.spec.js).

The CI pipeline will also lint Python files using flake8; please run `black` autoformatter on the project's root directory before staging files to commit. The configuration of flake8 can be found in tox.ini and the configuration for black can be found in pyproject.toml.

### Tests
The boilerplate uses [Cypress](https://www.cypress.io/) for integration tests. Each component of the boilerplate and your application should have its own test in the cypress/integration/ directory as a \<module\>.spec.js file.

The plugin in cypress/plugins/index.js is enhanced to allow reading same environment variables as your application by parsing the .env file.

The DB is reset and seeded with a pre-confirmed test user before test runs; this is accomplished using cypress/support/commands.js.

### Continuous Integration
The boilerplate includes .gitlab-ci.yml and .github/workflows/test.yml which can be used to make sure that any pull requests, tags, or commits to master will trigger automatic build and test (including static analysis via ESLint and any defined Cypress integration tests). These .yml files should be kept synchronized.

## Dev's features and tips
- All features are now divided into units and components. Frontend and backend are put side-by-side for easier reference and development.
- Handling 404 and 500 errors 
- AWS Beanstalk-friendly (you don't need to change any files' names to start deploying the project there)
- Automatic importing APIs,  namespaces (when add a new API you don't need to import it explicitly, you just need to name it *api.py*)
- All styles in one folder what allows to change and create a new theme fast (see */src/shared/theme*) 
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

### Testing
When testing locally, note that your Postgres DB specified in .env will be cleaned and a test user will be added. Make sure your .env defines the following variables similar to .gitlab-ci.yml or .github/workflows/test.yml:

```
  TEST_USER_EMAIL: 'testuser@testdomain.test'
  TEST_USER_NAME:  'testuser'
  TEST_USER_PASS: 'testpass'
```
In one window, perform `npm run lint` to catch source code errors. Once errors are fixed, run `npm run dev` followed by `npm run start`. In a separate window, you can run `npx cypress open` to bring up the Cypress Test Runner. This will let you run each of your integration tests in an interactive way, and shows you what the user sees at each step. The Cypress Test Runner also helps you choose CSS selectors to use for building your UI interaction tests.

![ezgif-5-e846adc3381c](https://user-images.githubusercontent.com/13685818/86319231-0cdd2f00-bc02-11ea-87c5-a06c166f6d40.gif)

Note that during pull requests, tags, or pushes to master, CI will just use `npm run test` to run all tests headless.

Login is handled specially as recommended by [this Cypress guide](https://docs.cypress.io/guides/getting-started/testing-your-app.html#Logging-in); notice that auth.spec.js performs the interactions like typing, clicking, etc. However, inbox.spec.js accomplishes authentication via POST request instead, bypassing the UI interactions. Testing of any components available only after login should be done similarly.
 
In general, if you need to setup state for some test A, don't use ***UI interactions*** like cy.type() or cy.click() to do it. Test those user interactions in a different test B, and then use cy.request() to build your state for test A.

### Continuous Integration
It's recommended to [enable the requirement](https://docs.github.com/en/github/administering-a-repository/enabling-required-status-checks) for tests to succeed in order for Pull Requests to be eligible for merge. For users forking the boilerplate into GitLab, see [this instead](https://docs.gitlab.com/ee/user/project/merge_requests/merge_when_pipeline_succeeds.html#only-allow-merge-requests-to-be-merged-if-the-pipeline-succeeds).
  - Before tests finish:
![image](https://user-images.githubusercontent.com/13685818/86393211-b6f0a180-bc6a-11ea-832b-d9d31b0cd446.png)
  - After tests succeed:
![image](https://user-images.githubusercontent.com/13685818/86393287-d38cd980-bc6a-11ea-8019-3188cc713b81.png)

### Webpack caching
Ensure that any updates to webpack.common.js consider some hash as part of the asset filename, to prevent your browser from loading cached assets during development.

# Installation
## Prerequisites
Before start make sure you have installed Python 3 and Node.js. Please follow the official instructions. Also, you need to have a PostgreSQL database handy. If you don't want to install it you can use ElephantSQL service, they have a free plan: https://www.elephantsql.com/plans.html.

## Steps to follow
1. Download [the full zip or pull code from the repository](https://github.com/saasforge/saas-build), find full instruction in [Github documentation](https://help.github.com/articles/which-remote-url-should-i-use/)


2. Add necessarily environment variables (you can add them into */venv/scripts/activate* file or into *.env* in the root folder):
- FLASK_APP=application
- db_url='postgres://user:password@dbhost:port/database'
- JWT_SECRET_KEY='your jwt secret key'
- SECRET_KEY='your secret key'
- MAIL_SERVER = 'mail server'
- MAIL_PORT = Number (like 465)
- MAIL_USE_SSL = Bool (True of False) 
- MAIL_USE_TLS = Bool (True of False) 
- MAIL_USERNAME = 'your email'
- MAIL_PASSWORD = 'your password'
- ADMIN_EMAIL = 'your admin email'
- MAIL_DEFAULT_SENDER = 'the same as your email'


> Note. At least 2 first variables MUST be set up (FLASK_APP and db_url) else the installation script wont' work.


JWT_SECRET_KEY and SECRET_KEY are just strings that not easy to guess, for example, it may be 'My Co0LServ_ice'.

> Tip. If you are puzzled how and why *.env* is used please read [this explanation on Stackoverflow](https://stackoverflow.com/questions/41546883/can-somebody-explain-the-use-of-python-dotenv-module)

3. Run the command (Windows):
```
init
```
(Mac):

```
./init.sh
```
> For any problem happening during execution of this command please see the section Troubleshooting below.

> :warning: Warning! This command will first **drop ALL tables** in your database. (You can comment this part if you wish, see */src/shared/utils/db_scaffold*, line 25.)

4. If everything is going fine you will see the following text in your terminal:

```sh
* Serving Flask app "application"
* Environment: production
  WARNING: Do not use the development server in a production environment.
  Use a production WSGI server instead.
* Debug mode: off
* Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
```

If you prefer to go through the installation process manually, please refer steps from the according version of *init* file in the root folder.

## Updating database
After you change something in your database models you should update the database itself. It can be done easily with the following command:
```sh
flask dbupdate
```

> Note. If you added some code including changes done into your model, and then run flask dbupdate and see some weird errors like Error: no such command "dbupdate" it means you have a compilation error. Try to run your code and see if there any errors, fix them and try to update the database again. To make sure there are not compilation errors, run the following command:
```
flask run
```

> Note 2. Another reason for this error can be that you didn't add the following environment variable:
```sh
FLASK_APP=application
```

>:warning: Warning. If you work on the same codebase from different computers and update the same database you will experience Alembic migration conflicts. The error usually says 
```error
alembic.util.exc.CommandError: Target database is not up to date. 
``` 
or 
```error
alembic.util.exc.CommandError: Can't locate revision identified by 'somenumber' 
```
If you experience such errors:

1. In the database remove the record from alembic_version table
2. Remove any files from your computer under app/migrations.

## Troubleshooting
Sometimes, if you use Mac OS you can experience some problems with installing the boilerplate.

* When you try to execute init.sh if you see the following error "init.sh: Command not found" go to the boilerplate's root folder and run
```
./init.sh
```
Then, if you see "./init.sh permission denied" run:
```
sudo chmod 755 'init.sh'
```

* When the script is running you may see the error during installation some Python packages like "Error: pg_config executable not found."

You need to fix this problem because script won't execute beyond.
To fix this problem run 
```
brew install postgresql
```
* If you see any other problem with installation packages it can prevent from working script normally so you have to fix all this problems.

* If you build and run the project but then you see the following exception:
**ImportError: No module named 'psycopg2._psycopg'**
uninstall and install the module back:

```
pip uninstall psycopg2
pip install psycopg2
```
* If you are trying to update database and see something like "dbupdate no such command", check your virtual environment. Check venv/Lib/site-packages folder to see if installation still exists (sometimes if you move the root folder the files may be presented on the disc but the current virtual environment just doesn't see them, so reinstall all packages from scratch.)

# Running with Docker
1. Add or override necessary environment variables using `.env`.
2. Run with `docker-compose`:
```sh
docker-compose up
```

## Setting your own data
### Company name
There are 2 places to set up your company name:

1. Config.py - change COMPANY_NAME variable
2. /src/shared/globalVars.js - change globalVars object

# Author
This free SaaS app boilerplate was create by **SaaS Forge Inc.** https://www.saasforge.dev

# License
MIT License
Copyright (c) 2019 **SaaS Forge Inc.** https://www.saasforge.dev. 



# Feedback and support
If you experience any difficulties, or have any questions on using of this product, or find a bug please open an issue or drop us a line at info@saasforge.dev.

# Disclaimer of Warranties 	
We provide this boilerplate as is, and we make no promises or guarantees about it. 

# Would you like to support us?
There are many ways to do it:
- Star this repository
- Support us as sponsors, see details here: https://github.com/sponsors/saasforge
- Create your own SaaS based on this boilerplate and tell us and everyone about it. We will add it to our gallery of fame!
- Add any functionality or fix bugs and create a pull request
- Follow our [Twitter](https://twitter.com/SaaSForgeDev) and tweet about the boilerplate and your experience
- Follow our [Facebook page](https://www.facebook.com/saasforge) and like it

# Our supportive sponsors:

Sergio Rovira [@sgr0691](https://github.com/sgr0691)

:heart: THANKS! :heart:
