import React, { Component, Suspense, lazy } from 'react';
import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-free-solid';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';

import { globalVars } from '@src/shared/globalVars';

import dashboardComponents from './data/components';
import FileNotFoundView from '@src/views/errorPages/FileNotFoundView';

// Left menu
import LeftMenu from '@src/components/leftMenu/LeftMenu';
import menuItems from './data/leftMenuData';

// Top dropdown menu
import DropdownMenu from '@src/components/dropdownMenu/DropdownMenu';
import topMenuItems from './data/topMenuData';


import '@src/shared/theme/dashboard.scss';


library.add(fab);

export default class DashboardView extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            username: '',
            error: '',
            loaded: false,
            leftMenuCollapsed: false,
            centralPartExpanded: false,
            leftMenuMobileShow: false
        };
        this.components = dashboardComponents;
        this.toggleLeftMenuOnClick = this.toggleLeftMenuOnClick.bind(this);
        this.toggleLeftMenuOnHover = this.toggleLeftMenuOnHover.bind(this);
        this.toggleLeftMenuMobile = this.toggleLeftMenuMobile.bind(this);
        this.closeLeftMenuMobile = this.closeLeftMenuMobile.bind(this);
    }
    toggleLeftMenuOnClick(){
        if (this.state.centralPartExpanded){
            // Collapse central, expand menu
            this.setState({centralPartExpanded: false, leftMenuCollapsed: false});
            console.log('expand menu on click')
        } else {
            // Expand central, collapse menu
            this.setState({centralPartExpanded: true, leftMenuCollapsed: true});
            console.log('collapse menu on click')
        }
     //this.setState({leftMenuCollapsed: !this.state.leftMenuCollapsed});
        //this.setState({centralPartExpanded: !this.state.centralPartExpanded});
    }
    toggleLeftMenuOnHover(){
        /*if (this.state.centralPartExpanded && this.state.leftMenuCollapsed){
            this.setState({leftMenuCollapsed: !this.state.leftMenuCollapsed});
            console.log('hover')
        }*/
    }
    toggleLeftMenuOnMouseOut(){
        /*if (this.state.centralPartExpanded && !this.state.leftMenuCollapsed){
            this.setState({leftMenuCollapsed: !this.state.leftMenuCollapsed});
            console.log('out')
        }*/
    }
    toggleLeftMenuMobile(){
        this.setState({leftMenuMobileShow: !this.state.leftMenuMobileShow});
    }
    closeLeftMenuMobile(){
        if (this.state.leftMenuMobileShow){
            this.setState({leftMenuMobileShow: false});
            return true;
        }
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
    render(){

        if (this.state.loaded) {
            return (
            <div className="dashboard-view-block">
                <div className="header-mobile  header-mobile-fixed ">
                    <div className="header-mobile-logo">
                        <a href="/app">
                            <img className="logo" alt="Logo" src="/static/media/logo.png"/>
                        </a>
                    </div>
                    <div className="header-mobile-toolbar">          
                        <button className="header-mobile-toggle" 
                            onClick={()=>this.toggleLeftMenuMobile()}>
                            <FontAwesomeIcon icon="bars" />
                        </button>                                
                    </div>
                </div>
                <div className="grid-root">
                    <aside 
                        className={this.state.leftMenuMobileShow ? 
                                'mobile-show' : 
                                (this.state.leftMenuCollapsed ? 'collapsed' : '')}>
                        <div className="aside-brand" 
                            onMouseOver={()=>this.toggleLeftMenuOnHover()}
                            onMouseOut={()=>this.toggleLeftMenuOnMouseOut()}>
                            <a href="/app">
                                <img className="logo" alt="Logo" src="/static/media/logo.png"/>
                                <span>{globalVars.COMPANY_NAME}</span>
                            </a>
                            <div className="aside-toggle">
                                <button 
                                    onClick={()=>this.toggleLeftMenuOnClick()} >
                                    <FontAwesomeIcon icon={this.state.leftMenuCollapsed ? 'chevron-right': 'chevron-left'} />
                                </button>
                            </div>
                        </div>
                        <LeftMenu menuItems={menuItems} 
                                collapsed={this.state.leftMenuCollapsed} 
                                linkClickHandler={()=>this.closeLeftMenuMobile()}/>
                        <div className="blur-mobile-element" 
                            onClick={()=>this.toggleLeftMenuMobile()}></div>
                    </aside>
                    <div className="dashboard-main">
                        <div className="header-main">
                            <div></div>
                            <div className="bar-right">
                                <DropdownMenu menuItems={topMenuItems} title={this.state.username} />
                            </div>
                        </div>
                        <div className="dashboard-central">
                            <Suspense fallback={<div>Loading...</div>}>
                                <Switch>
                                    {this.components.map((componentElement)=>{
                                        return <Route path={componentElement.url} component={componentElement.component} key={componentElement.url} />
                                    })}
                                    <Redirect exact from='/app' to='/app/profile' />
                                    <Route component={ FileNotFoundView } />
                                </Switch>
                            </Suspense>
                        </div>
                    </div>
                </div>
            </div>
            );
          }
        return <div>Loading...</div>;
    }

};