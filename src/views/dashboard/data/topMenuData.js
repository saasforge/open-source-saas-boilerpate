import { lazy } from 'react';

const topMenu = [
    {title: 'Profile', url: '/app/profile', component: lazy(() => import('@src/views/profile/ProfileView'))},
    {title: 'Change password', url: '/app/password', component: lazy(() => import('@src/views/password/ChangePasswordUI'))},
    {divider: true},
    {title: 'Logout', url: '/api/auth/logout', method: 'post', redirectUrl: '/auth/login'}
];
export default topMenu;