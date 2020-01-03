import React, { Component, Suspense, lazy } from 'react';
import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import axios from 'axios';

import Popper from 'popper.js';
import Icon from '@src/components/icon/Icon';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import jsonpath from 'jsonpath';

import { globalVars } from '@src/shared/globalVars';

import FileNotFoundView from '@src/modules/errorPages/FileNotFoundView';
import Alert from '@src/components/alert/Alert';

// Left menu
import LeftMenu from '@src/components/leftMenu/LeftMenu';
import leftMenuItems from './data/leftMenuData';

// Top dropdown menu
import DropdownMenu from '@src/components/dropdownMenu/DropdownMenu';
import topMenuItems from './data/topMenuData';


import '@src/shared/theme/dashboard.scss';

const mapStateToProps = state => {
    return { username: state.username };
};

class DashboardShell extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            error: '',
            loaded: false,
            leftMenuCollapsed: false,
            centralPartExpanded: false,
            leftMenuMobileShow: false
        };
        const leftMenuComponents = this.extractComponents(leftMenuItems);
        const topMenuComponents = this.extractComponents(topMenuItems);
        this.components = leftMenuComponents.concat(topMenuComponents.filter( ({url}) => !leftMenuComponents.find(item => item.url == url) ));
        this.toggleLeftMenuOnClick = this.toggleLeftMenuOnClick.bind(this);
        this.toggleLeftMenuOnHover = this.toggleLeftMenuOnHover.bind(this);
        this.toggleLeftMenuMobile = this.toggleLeftMenuMobile.bind(this);
        this.closeLeftMenuMobile = this.closeLeftMenuMobile.bind(this);
    }
    extractComponents(menuObject){
        let items = jsonpath.query(menuObject, '$..items');
        if (!items.length){
            if (Array.isArray(menuObject)){
                items = menuObject;
            }
        }
        return items.flat().filter((item)=>{
            return (item.url && item.component);
        }).map((item)=>{
            return {
                url: item.url,
                component: item.component
            }
        });
    }
    toggleLeftMenuOnClick(){
        if (this.state.centralPartExpanded){
            // Collapse central, expand menu
            this.setState({centralPartExpanded: false, leftMenuCollapsed: false});
        } else {
            // Expand central, collapse menu
            this.setState({centralPartExpanded: true, leftMenuCollapsed: true});
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
                this.props.dispatch({
                    type: 'UPDATE_USERNAME', newName: response.data.username
                });
                this.setState({ loaded: true});
            } else {
                this.setState({ error: response.data.error || 'Some error occured during this request... please try again.' });
                
                // Something went wrong, logout user
                try {
                    await axios.post('/api/auth/logout', {});
                    window.location.href = '/auth/login';
                } catch {
                    console.log('Error while trying logout user.'); // Console log for now
                }
            }
        } catch {
            this.setState({ error: 'Some error occured during this request... please try again.' });
        }
    }
    componentWillMount(){
        this.loadInitialData();
    }
    componentDidCatch(error, errorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo
        });
    }
    render(){
        if (this.state.loaded) {
            const centralPart = this.state.error ?
                (<Alert status="error" message="Something went wrong and page was not loaded..." />):
                (                            
                    <Suspense fallback={<div>
                        <Alert status="info" message="Loading, please wait..." />
                    </div>}>
                        <Switch>
                            {this.components.map((componentElement)=>{
                                return <Route path={componentElement.url} component={componentElement.component} key={componentElement.url} />
                            })}
                            <Redirect exact from='/app' to='/app/profile' />
                            <Route component={ FileNotFoundView } />
                        </Switch>
                    </Suspense>
                );
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
                            <Icon icon="bars" />
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
                                    <Icon icon={this.state.leftMenuCollapsed ? 'chevron-right': 'chevron-left'} />
                                </button>
                            </div>
                        </div>
                        <LeftMenu menuItems={leftMenuItems} 
                                collapsed={this.state.leftMenuCollapsed} 
                                linkClickHandler={()=>this.closeLeftMenuMobile()}/>
                        <div className="blur-mobile-element" 
                            onClick={()=>this.toggleLeftMenuMobile()}></div>
                    </aside>
                    <div className="dashboard-main">
                        <div className="header-main">
                            <div></div>
                            <div className="bar-right">
                                <DropdownMenu menuItems={topMenuItems} title={this.props.username} />
                            </div>
                        </div>
                        <div className="dashboard-central">
                            {centralPart}
                        </div>
                    </div>
                </div>
            </div>
            );
          }
        return (
            <div className="loading-full">
                <div className="loading-central">
                    <img alt="Logo-loading..." src="/static/media/logo-stroke.png"/>
                    <div>Loading...</div>
                </div>
            </div>
        );
    }
};

export default connect(mapStateToProps)(DashboardShell);