import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ForgotPasswordForm from './ForgotPasswordForm';
import FinishRegistrationPage from './FinishRegistrationPage';
import ConfirmationPage from './ConfirmationPage';
import { globalVars } from '@src/shared/globalVars';
import MakerBrand from '@src/components/makerBrand/MakerBrand';
import ResetPasswordForm from './ResetPasswordForm';



class AuthUI extends Component {
    render() {
      return (
            <div className="auth-switcher-container">
                <BrowserRouter history={history}>
                    <Switch>
                        <Route path="/auth/login" component={LoginForm} />
                        <Route path="/auth/register" component={RegisterForm} />
                        <Route path="/auth/forgot" component={ForgotPasswordForm} />
                        <Route path="/auth/resetpassword/:token/:userid" component={ResetPasswordForm} />
                        <Route path="/auth/finishregister/:userid" component={FinishRegistrationPage} />
                        <Route path="/auth/confirm/:token/:userid/" component={ConfirmationPage} />
                    </Switch>
                </BrowserRouter>
                <div className="legal">
                    <MakerBrand />
                </div>
            </div>
        );
    }
}

export default AuthUI;