# Auth fullstack component

## Component parts
### Frontend
#### AuthUI.jsx
Root authentication ReactJS component, having only router switches for showing different content depending on the current route.
#### AuthUIFunctions.jsx
Component with 2 functions:
- validateEmail - validates a text if it's a proper email address
- handleResponse - analizes the authentication response and returns errors (if any) or redirects to the corresponding route if a response has indication to do it.

#### RegisterFrom.jsx
Component with registration form, validates entered email, checks if password and confirmation are the same, sends the request to the registrations API endpoint.

#### LoginForm.jsx
Component with login form. Validates entered data (email, password), sends data to the logint API endpoint.

#### FinishRegistrationPage.jsx
A text page thanking for the registration and informing a user to complete the registration by clicking on the link in the sent email. Also has a link to resend the confirmation email if not received.

#### ConfirmationPage.jsx
This page is loaded when user tries to confirm his/her email. Sends the user id (taken from URL) to the confirmation endpoint and after confirmation redirects to the EmailConfirmedThanksPage.

#### EmailConfirmedThanksPage.jsx
The page with text thanking for the confirmation email. Redirects to the login page in 5 seconds.

## Authentication workflow
1. A user is no the registration page, enters his/her username, email, password, and password confirmation, clicks the Register button.
2. The backend creates a new user, assigns a specific role, create account, and sends the confirmation email.
3. User is being redirected to the information page (FinishRegistrationPage).
4. User opens his/her mailbox, finds the confirmation email, open it and click the confirmation link.
5. The ConfirmationPage is opening, sending the user id (passing as a part of URL). If a user is found and confirmed, the user will see the corresponding message and then will be redirected to the login page, else the error message will be shown.

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

The values of these keys are depends on the concrete email provider used for sending messages.

ADMIN_EMAIL is used to assign a specific role to the user during the registration. If user's email is the same as ADMIN_EMAIL, the "Admin" role will be assigned, else "User".


### Email format
The confirmation email is based on the following config settings:

- COMPANY_NAME
- MAIL_DEFAULT_SENDER (default company's email).

The subject has the following format: 

```
<Company name>: Confirm your registration
```


### Confirmation token generation
During the registration process, the backend generates a special sequence of symbols representing the user's token. During the verification process this sequence is decoded back and if the extracted user id is the same as the current user, it's considered confirmed.

The config key you need to provide:
- SECRET_KEY (any text that is hard to guessed).

## API endpoints
