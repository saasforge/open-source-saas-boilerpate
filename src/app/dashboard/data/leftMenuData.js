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
                url: '/app/unread',
                color: '#1fd2e4',
                component: lazy(() => import('@src/modules/test/TestView')),
                data: {title: 'Unread emails'}
            },
            {
                title: 'Sent',
                icon: 'paper-plane',
                url: '/app/sent',
                component: lazy(() => import('@src/modules/test/TestView')),
                data: {title: 'Sent emails'}
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
            },
            {
                title: 'Modal', 
                icon: 'door-open',
                color: '#f18e13',
                url: '/app/demo/modal',
                component: lazy(() => import('@src/modules/componentsDemo/ModalDemoView'))
            },
            {
                title: 'Color picker field',
                icon: 'palette',
                color: 'red',
                url: '/app/demo/color-picker-field',
                component: lazy(() => import('@src/modules/componentsDemo/ColorPickerFieldDemoView'))
            },
            {
                title: 'File uploader',
                icon: 'image',
                color: '#f7e834',
                url: '/app/demo/file-upload',
                component: lazy(() => import('@src/modules/componentsDemo/FileUploaderDemoView'))
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
                                url: '/app/photos',
                                component: lazy(() => import('@src/modules/test/TestView')),
                                data: {title: 'My photos'}
                            },
                            {
                                title: 'My books',
                                url: '/app/books',
                                icon: 'book',
                                component: lazy(() => import('@src/modules/test/TestView')),
                                data: {title: 'My books'}
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
                        url: '/app/facebook',
                        component: lazy(() => import('@src/modules/test/TestView')),
                        data: {title: 'Some data from my Facebook profile (actually not)'}
                    },
                    {
                        title: 'Strava',
                        icon: ['fab', 'strava'],
                        url: '/app/strava',
                        component: lazy(() => import('@src/modules/test/TestView')),
                        data: {title: 'Strava profile (may be)'}
                    }
                ]
            }
        ]
    }
];
export default dashboardMenu;