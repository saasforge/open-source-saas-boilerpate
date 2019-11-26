import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-free-solid';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import './alert.css';

library.add(fab);



class Alert extends Component {
    constructor(props) {
        super(props);    
        this.state = {
            text: '',
            hide: true
        };
        this.defaultTimeoutInSeconds = 5;
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.text != nextProps.message && nextProps.message){
            return {
                text: nextProps.message,
                hide: false
            };
        } else {
            return {};
        }
    }
    render() {
        const alertClasses = {
            'ok': 'alert-success',
            'info': 'alert-info', 
            'error': 'alert-error', 
            'warning': 'alert-warning'
        };
        const iconClass = {
            'ok': 'thumbs-up',
            'info': 'info-circle', 
            'error': 'exclamation-circle', 
            'warning': 'exclamation-triangle'
        };
        const statusName = this.props.status || 'info';
        const alertStyle = this.state.hide ? ' d-none' : 'alert-box ' + alertClasses[statusName];
        if (!this.state.hide){
            if (this.props.hideInSecs){
                setTimeout(() => this.setState({hide: true}), (this.props.hideInSecs * 1000 || this.defaultTimeoutInSeconds));
            }
        }
        return (
                <div className={alertStyle}>
                    <div className="icon-block">
                        <FontAwesomeIcon icon={iconClass[statusName] || 'info'} />
                    </div>
                    <span>{this.state.text}</span>
                </div>
            );
    }
}

export default Alert;