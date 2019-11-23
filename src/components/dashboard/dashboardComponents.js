// In this file you specify route and according component to be loaded into the central part of dashboard. 
// Provide links to this route in menu and everywhere else.

import { lazy } from 'react';

const dashboardComponents = [
    {url: '/app/profile', component: lazy(() => import('@src/components/profile/ProfileUI'))},
    {url: '/app/password', component: lazy(() => import('@src/components/password/ChangePasswordUI'))},
    {url: '/app/inbox', component: lazy(() => import('@src/components/inbox/InboxUI'))},
];
export default dashboardComponents;