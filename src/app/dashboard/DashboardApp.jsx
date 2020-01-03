import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import DashboardShell from './DashboardShell';
import store from "./store/root-store";

import '@src/shared/theme/common.scss';
const dashboardRoute = (
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path='/app' component={DashboardShell} />
            </Switch>
        </BrowserRouter>
    </Provider>
);
ReactDOM.render(dashboardRoute, document.getElementById('root'));