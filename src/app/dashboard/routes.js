import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Home from '@src/app/dashboard/Home';
import DashboardView from '@src/components/dashboard/DashboardView';
// import more components
export default (
    <HashRouter>
        <div>
            <Route path='/' component={DashboardView} />
        </div>
    </HashRouter>
);