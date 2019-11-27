const dashboardMenu = [
    {
        groupName: 'Email',
        items: [
            {
                name: 'Inbox',
                icon: ['fab', 'facebook'],
                url: '/app/inbox',
                color: '#e4951f'
            },
            {
                name: 'Unread',
                icon: 'envelope',
                url: '/unread',
                color: '#1fd2e4'
            },
            {
                name: 'Sent',
                icon: 'paper-plane',
                url: '/sent'
            }
        ]
    },
    {
        groupName: 'Categories',
        items: [
            {
                name: 'Web',
                //expanded: true,
                items: [
                    {
                        name: 'Personal',
                        items: [
                            {
                                name: 'My photos',
                                url: '/photos'
                            },
                            {
                                name: 'My books',
                                url: '/books',
                                icon: 'book'
                            }
                        ]
                    }
                ]
            },
            {
                name: 'Social',
                url: '/social', // As this is not leaf item this URL will be the part of it
                items: [
                    {
                        name: 'Facebook',
                        icon: ['fab', 'facebook-square'],
                        url: '/facebook'
                    },
                    {
                        name: 'Strava',
                        icon: ['fab', 'strava'],
                        url: '/strava'
                    }
                ]
            }
        ]
    }
];
export default dashboardMenu;