import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

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
            </div>
        );
    }
}

export default AuthUI;