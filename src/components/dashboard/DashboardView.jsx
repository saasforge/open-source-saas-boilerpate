import React, { Component, Suspense, lazy } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-free-solid';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';

import dashboardComponents from './dashboardComponents';

import LeftMenu from '@src/components/leftMenu/LeftMenu';



//import Profile from '@src/components/profile/ProfileUI';
//import ChangePassword from '@src/components/password/ChangePasswordUI';

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
    
        this.state = {
            username: '',
            error: '',
            loaded: false
        };
        this.components = dashboardComponents;
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
                            <LeftMenu />
                        </div>
                    </aside>
                    <div className="dashboard-main">
                        <div className="header-main">
                            <div></div>
                            <div className="bar-right">
                                <div>
                                    <button className="button-dropdown-menu dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">                                       
                                        {this.state.username}
                                    </button>
                                    <div className="dropdown-menu">
                                        <Link className="dropdown-item" to="/app/profile">Profile</Link>
                                        <Link className="dropdown-item" to="/app/password">Change password</Link>
                                        <a className="dropdown-item" href="#">Logout</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="dashboard-central">
                            <Suspense fallback={<div>Loading...</div>}>
                                <Switch>
                                    {this.components.map((componentElement)=>{
                                        return <Route path={componentElement.url} component={componentElement.component} key={componentElement.url} />
                                    })}
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