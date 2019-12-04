import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import FinishRegistrationPage from './FinishRegistrationPage';
import ConfirmationPage from './ConfirmationPage';
import { globalVars } from '@src/shared/globalVars';
import MakerBrand from '@src/components/makerBrand/MakerBrand';

// Plug authentication library here if you want to provide interceptions.
import { JWTFunctions } from '@src/components/jwt/JWTFunctions';


class AuthUI extends Component {
    render() {
      return (
            <div className="auth-switcher-container">
                <BrowserRouter history={history}>
                    <Switch>
                        <Route path="/auth/login" component={LoginForm} />
                        <Route path="/auth/register" component={RegisterForm} />
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