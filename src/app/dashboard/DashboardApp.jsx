import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import DashboardShell from './DashboardShell';

import '@src/shared/theme/common.scss';
const dashboardRoute = (
    <BrowserRouter>
        <Switch>
            <Route path='/app' component={DashboardShell} />
        </Switch>
    </BrowserRouter>
);
ReactDOM.render(dashboardRoute, document.getElementById('root'));