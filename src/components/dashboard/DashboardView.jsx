import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-free-solid';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import jsonPath from '@src/components/json_path/jsonpath';

import { observable, computed, autorun } from 'mobx';
import { observer } from "mobx-react"

import './dashboard.scss';

import TodoList from './todo'

library.add(fab);


const UserData = ()=> {
    const userData = InitialDataFetcher.read();
    return (
        <div>{userData.username}</div>
    );
};

class ObservableTodoStore {
	@observable todos = [];
    @observable pendingRequests = 0;

    constructor() {
        autorun(() => console.log(this.report));
    }

	@computed get completedTodosCount() {
    	return this.todos.filter(
			todo => todo.completed === true
		).length;
    }

	@computed get report() {
		if (this.todos.length === 0)
			return "<none>";
		return `Next todo: "${this.todos[0].task}". ` +
			`Progress: ${this.completedTodosCount}/${this.todos.length}`;
	}

	addTodo(task) {
		this.todos.push({
			task: task,
			completed: false,
			assignee: null
		});
	}
}


const observableTodoStore = new ObservableTodoStore();


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
        this.toggleSubMenu = this.toggleSubMenu.bind(this);
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
    toggleSubMenu(submenuObject){
        const menuObject = this.state.menuItems;
        const searchString = `$..items[?(@.name=="${submenuObject.name}")]`;
        const item = jsonPath(menuObject, searchString); // For now, by name
        if (item){
            item.expanded = !item.expanded;
        }
        this.setState({menuItems: menuObject});
    }
    /*
    item - menu item
    level - number of level
    expandedParent - true if parent item should be expanded
    */
    render_menuItem(item, level, expandedParent){
        const menuItemStyle = {paddingLeft: 10 * level + 'px'};
        // Find out if there is any subitems to be expanded
        window.jsonPath = jsonPath;
        //var childsWithSubitems = jsonPath(item, '$..items[?(@.items)]');
        var subitemsExpanded = jsonPath(item, '$..items[?(@.expanded)]');
        // Set up class for expanding
        const subitemClassName = (item.expanded || subitemsExpanded || expandedParent ? '' : ' collapsed');
        return item.items.map((subItem)=>
            <div className={'item-submenu' + subitemClassName} key={subItem.name}>
                <div className="menu-item" style={menuItemStyle}>
                    {subItem.icon ?<div className="icon-block" style={{color: subItem.color || ''}}><FontAwesomeIcon icon={subItem.icon}  /></div> : ''}
                    <span>{subItem.name}</span> 
                    {subItem.items ? <button className="button-expand" onClick={() => this.toggleSubMenu(subItem)}><FontAwesomeIcon icon="angle-down" /></button>: ''}            
                </div>
                <div>
                    {subItem.items ? <div className="">{this.render_menuItem(subItem, level + 1, item.expanded)}</div> : ''}
                </div>
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
                    <div style={{'marginLeft': '300px'}}>
                        <TodoList store={ observableTodoStore } />
                    </div>
                </div>
            </div>
            );
          }
        return <div>Loading...</div>;
    }
};