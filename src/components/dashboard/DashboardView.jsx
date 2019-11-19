import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-free-solid';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'

import './dashboard.scss';

library.add(fab);


const UserData = ()=> {
    const userData = InitialDataFetcher.read();
    return (
        <div>{userData.username}</div>
    );
};

export default class DashboardView extends Component {
    constructor(props) {
        super(props);

        const menuItems = [
            {
                groupName: 'Email',
                items: [
                    {
                        name: 'Inbox',
                        icon: ['fab', 'facebook'],
                        url: '/inbox',
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
                                        url: '/books'
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
    
        this.state = {
            username: '',
            error: '',
            loaded: false,
            menuItems: menuItems
        };
    }
    loadInitialData = async()=>{
        try {
            let response = await axios.get('/app/api/profile');
            if (response.data.result){
                this.setState({ username: response.data.username, loaded: true});
            } else {
                this.setState({ error: response.data.error || 'Some error occured during this request... please try again.' });
            }
        } catch {
            this.setState({ error: 'Some error occured during this request... please try again.' });
        }
    }
    componentWillMount(){
        this.loadInitialData();
    }
    render_view() {

    }
    render_menuItem(item, level){
        return item.items.map((subItem)=>
            <div className={'item-submenu' + (level > 1 ? ' collapsed' : '')} key={subItem.name}>
                <div className="menu-item">
                    {subItem.icon ?<div className="icon-block" style={{color: subItem.color || ''}}><FontAwesomeIcon icon={subItem.icon}  /></div> : ''}
                    {subItem.name}               
                </div>
                {subItem.items ? <button className="button-expand"><FontAwesomeIcon icon="angle-down" /></button>: ''
                    
                    }
                {subItem.items ? <div className="item-submenu">{this.render_menuItem(subItem, level + 1)}</div> : ''}
            </div>
        );
    }
    render_menu() {
        const groupItems = this.state.menuItems.map((group) =>
            <div className="group-block" key={group.groupName}>
                <div className="group-name">{group.groupName}</div>
                <div className="group-items">{this.render_menuItem(group, 1)}</div>
            </div>
        );
        return (
            <div className="aside-menu">{groupItems}</div>
        );
    }
    render(){
        if (this.state.loaded) {
            return (
            <div>
                <div className="header-mobile  header-mobile-fixed ">
                    <div className="header-mobile-logo">
                        <a href="">
                            <img className="logo" alt="Logo" src="/static/media/logo.png"/>
                        </a>
                    </div>
                    <div className="header-mobile-toolbar">          
                        <button className="header-mobile-toggle">
                            <FontAwesomeIcon icon="bars" />
                        </button>                                
                        <button className="header-mobile-toggle">
                            <FontAwesomeIcon icon="chevron-down" />
                        </button>
                    </div>
                </div>
                <div className="grid-root">
                    <aside>
                        <div className="aside-brand">
                            <a href="">
                                <img className="logo" alt="Logo" src="/static/media/logo.png"/>
                                <span>My company</span>
                            </a>
                            <div className="aside-toggle">
                                <button>
                                    <FontAwesomeIcon icon="chevron-left" />
                                </button>
                            </div>
                        </div>
                        <div className="aside-menu">
                            {this.render_menu()}
                        </div>
                    </aside>
                </div>
            </div>
            );
          }
        return <div>Loading...</div>;
    }
};