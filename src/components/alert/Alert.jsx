import React, { Component } from 'react';
import Icon from '@src/components/icon/Icon';

import './alert.css';


class Alert extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);    
        this.state = {
            text: '',
            hide: true
        };
        this.defaultTimeoutInSeconds = 5;
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        const notEmptyMessage = Array.isArray(nextProps.message) ? nextProps.message.length : nextProps.message;
        if (prevState.text != nextProps.message && notEmptyMessage){
            return {
                text: nextProps.message,
                hide: false
            };
        } else {
            return {};
        }
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    render() {
        const alertClasses = {
            'success': 'alert-success',
            'info': 'alert-info', 
            'error': 'alert-error', 
            'warning': 'alert-warning'
        };
        const iconClass = {
            'success': 'thumbs-up',
            'info': 'info-circle', 
            'error': 'exclamation-circle', 
            'warning': 'exclamation-triangle'
        };
        const statusName = this.props.status || 'info';
        const alertStyle = this.state.hide ? ' d-none' : 'alert-box ' + alertClasses[statusName];
        if (!this.state.hide){
            if (this.props.hideInSecs){
                this._isMounted = true;
                setTimeout(() => {
                    if (this._isMounted){
                        this.setState({hide: true});
                    }
                }, (this.props.hideInSecs * 1000 || this.defaultTimeoutInSeconds));
            }
        }
        const messageObject = (Array.isArray(this.state.text) ?
            this.state.text.map((item) =>
                <div key={item}>
                    {item}
                </div>
            ): 
            <span>{this.state.text}</span>
        );
        return (
                <div className={alertStyle}>
                    <div className="icon-block">
                        <Icon icon={iconClass[statusName] || 'info'} />
                    </div>
                    <div>
                        {messageObject}
                    </div>
                </div>
            );
    }
}

export default Alert;