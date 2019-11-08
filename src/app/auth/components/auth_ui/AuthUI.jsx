import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { globalVars } from '@src/shared/globalVars'


class AuthUI extends Component {
    render() {
      return (
            <div>
                <BrowserRouter history={history}>
                    <Switch>
                        <Route path="/login" component={LoginForm} />
                        <Route path="/register" component={RegisterForm} />
                    </Switch>
                </BrowserRouter>
                <div className="text-center">
                    <p>{globalVars.COMPANY_NAME} © {new Date().getFullYear()}</p>
                </div>
            </div>
        );
    }
}

export default AuthUI;