import React, { Component, lazy} from 'react';
import { Link } from 'react-router-dom';
import Alert from '@src/components/alert/Alert';
import Icon from '@src/components/icon/Icon';
import './tabControlStyle.scss';

class TabsControl extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        if (!this.props.data){
            return (
                <div>
                    <Alert status="warning" message="Please provide some data for this tabs control." />
                </div>);
        };
        const tabs = this.props.data.map((item)=>{
            return (
                <li className="nav-item" key={item.id}>
                    <a className={'nav-link ' + (item.active ? 'active' : '')} data-toggle="tab" href={'#' + item.id}>
                        <Icon icon={item.icon} 
                            color={item.iconColor} 
                            className={item.iconClassName} 
                        />
                        <span>{item.title}</span>
                    </a>
                </li>);
            });
        const content = this.props.data.map((item)=>{
            const ItemComponent = item.component;
            const itemContent = (ItemComponent ?
                <ItemComponent data = {item.data} />:
                (item.content ? item.content : ''));
            return (
                <div id={item.id} key={item.id} className={'tab-pane fade ' + (item.active ? 'show active' : '')}>
                    {itemContent}
                </div>
            );
        });
        return(
            <div className="top-buffer-20 panel-light">
                <ul className="nav nav-tabs">
                    {tabs}
                </ul>
                <div className="tab-content">
                    {content}
                </div>
            </div>
        );
    }
}

export default TabsControl;