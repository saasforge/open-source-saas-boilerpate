import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import DashboardView from '@src/components/dashboard/DashboardView';
// import more components
export default (
    <BrowserRouter>
        <Switch>
            <Route path='/app' component={DashboardView} />
            <Redirect from='/' to='/app' />
        </Switch>
    </BrowserRouter>
);