import { lazy } from 'react';

const topMenu = [
    {title: 'Profile', url: '/app/profile', component: lazy(() => import('@src/modules/profile/ProfileView'))},
    {title: 'Change password', url: '/app/password', component: lazy(() => import('@src/modules/password/ChangePasswordUI'))},
    {divider: true},
    {title: 'Logout', url: '/api/auth/logout', method: 'post', redirectUrl: '/auth/login'}
];
export default topMenu;