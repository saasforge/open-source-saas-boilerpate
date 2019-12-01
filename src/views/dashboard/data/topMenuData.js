const topMenu = [
    {title: 'Profile', url: '/app/profile'},
    {title: 'Change password', url: '/app/password'},
    {divider: true},
    {title: 'Logout', url: '/api/auth/logout', method: 'post', redirectUrl: '/auth/login'}
];
export default topMenu;