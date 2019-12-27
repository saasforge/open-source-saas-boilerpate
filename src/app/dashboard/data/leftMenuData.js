import { lazy } from 'react';

const dashboardMenu = [
    {
        groupTitle: 'Email',
        items: [
            {
                title: 'Inbox',
                icon: ['fab', 'facebook'],
                color: '#e4951f',
                url: '/app/inbox', 
                component: lazy(() => import('@src/modules/inbox/InboxUI'))
            },
            {
                title: 'Unread',
                icon: 'envelope',
                url: '/unread',
                color: '#1fd2e4'
            },
            {
                title: 'Sent',
                icon: 'paper-plane',
                url: '/sent'
            }
        ]
    },
    {
        groupTitle: 'Demo',
        items: [
            {
                title: 'Alerts', 
                icon: 'exclamation-triangle',
                color: 'yellow',
                url: '/app/demo/alerts',
                component: lazy(() => import('@src/modules/componentsDemo/AlertDemoView'))
            },
            {
                title: 'Tabs control', 
                icon: 'window-maximize',
                color: '#66d9e8',
                url: '/app/demo/tabs',
                component: lazy(() => import('@src/modules/componentsDemo/TabsDemoView'))
            }
        ]
    },
    {
        groupTitle: 'Categories',
        items: [
            {
                title: 'Web',
                //expanded: true,
                items: [
                    {
                        title: 'Personal',
                        items: [
                            {
                                title: 'My photos',
                                url: '/photos'
                            },
                            {
                                title: 'My books',
                                url: '/books',
                                icon: 'book'
                            }
                        ]
                    }
                ]
            },
            {
                title: 'Social',
                url: '/social', // As this is not leaf item this URL will be the part of it
                items: [
                    {
                        title: 'Facebook',
                        icon: ['fab', 'facebook-square'],
                        url: '/facebook'
                    },
                    {
                        title: 'Strava',
                        icon: ['fab', 'strava'],
                        url: '/strava'
                    }
                ]
            }
        ]
    }
];
export default dashboardMenu;