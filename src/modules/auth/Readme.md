# Auth full-stack component

## Component's parts
### Frontend
#### AuthUI.jsx
Root authentication ReactJS component, having only router switches for showing different content depending on the current route.
#### AuthUIFunctions.jsx
Component with 2 functions:
- validateEmail - validates a text if it's a proper email address
- handleResponse - analyzes the authentication response and returns errors (if any) or redirects to the corresponding route if a response indicates to do it.

#### RegisterFrom.jsx
Component with the registration form validates entered email, checks if password and confirmation are the same, sends the request to the registrations API endpoint.

![Registration page on a normal computer screen](https://github.com/saasforge/saas-forge-public-docs/blob/master/registerBigScreen.png?raw=true)

#### LoginForm.jsx
Component with the login form. Validates entered data (email, password), sends data to the login API endpoint.

![Login page](https://github.com/saasforge/saas-forge-public-docs/blob/master/loginBigScreen.png?raw=true)

#### FinishRegistrationPage.jsx
The text page thanking for the registration and informing a user to complete the registration by clicking on the link in the sent email. Also, it has a link to resend the confirmation email if not received.

![Finish registration page](https://github.com/saasforge/saas-forge-public-docs/blob/master/finishRegistration.png?raw=true)

#### ConfirmationPage.jsx
This page is loaded when a user tries to confirm his/her email. It sends the user id (taken from URL) to the confirmation endpoint and after confirmation redirects to the login page.

![Confirmation page](https://github.com/saasforge/saas-forge-public-docs/blob/master/confirmed.png?raw=true)

## Authentication workflow
1. A user is no the registration page, enters his/her username, email, password, and password confirmation, clicks the Register button.
2. The backend creates a new user, assigns a specific role, create an account, and sends the confirmation email.
3. The user is being redirected to the information page (FinishRegistrationPage).
4. The user opens his/her mailbox, finds the confirmation email, opens it and clicks the confirmation link.
5. The ConfirmationPage is opening, sending the user id (passing as a part of URL). If a user is found and confirmed, the user will see the corresponding message and then will be redirected to the login page else the error message will be shown.

## Confirmation email
### Settings
The sending a confirmation message is done using Flask-Mail extension. To make it work it's necessary to provide the following configuration settings:
- MAIL_SERVER
- MAIL_PORT
- MAIL_USE_SSL
- MAIL_USE_TLS
- MAIL_USERNAME
- MAIL_DEFAULT_SENDER
- MAIL_PASSWORD
- ADMIN_EMAIL

The values of these keys depend on the concrete email provider used for sending messages.

ADMIN_EMAIL is used to assign a specific role to the user during the registration. If a user's email is the same as ADMIN_EMAIL, the "Admin" role will be assigned, else "User".


### Email format
The confirmation email is based on the following config settings:

- COMPANY_NAME
- MAIL_DEFAULT_SENDER (default company's email).

The subject has the following format: 

```
<Company name>: Confirm your registration
```


### Confirmation token generation
During the registration process, the backend generates a special sequence of symbols representing the user's token. During the verification process, this sequence is being decoded back, and if the extracted user id is the same as the current user, it's considered confirmed.

The config key you need to provide:
- SECRET_KEY (any text that is hard to guess).

## JWT
The current version of this component uses JWT (JSON Web Tokens) technology, implemented in a separate component.

## API endpoints
- **/api/auth/register** - creates a user, generates the confirmation token, sends the confirmation email

- **/api/auth/login** - gets a user entity based on the entered email, and verifies if the provided password corresponds to the user's password's hash. In a case of successful verification, a JWT token is created and sent back with the response.

- **/api/auth/logout** - call JWT component logout function

- **/api/auth/token/refresh** - call JWT component to generate a fresh access account

- **/api/auth/resendconfirm/<userid>** - generates a new confirmation token for the specific user and sends it to the user's email

- **/api/auth/confirm/<token>/<userid>** - changes the user's confirmation flag and saves the result in the database