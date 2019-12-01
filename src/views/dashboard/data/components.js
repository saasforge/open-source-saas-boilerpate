// In this file you specify route and according component to be loaded into the central part of dashboard. 
// Provide links to this route in menu and everywhere else.

import { lazy } from 'react';

const dashboardComponents = [
    {url: '/app/profile', component: lazy(() => import('@src/views/profile/ProfileView'))},
    {url: '/app/password', component: lazy(() => import('@src/views/password/ChangePasswordUI'))},
    {url: '/app/inbox', component: lazy(() => import('@src/views/inbox/InboxUI'))},
];
export default dashboardComponents;