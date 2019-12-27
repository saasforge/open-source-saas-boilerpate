import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class DropdownMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
            menuItems: props.menuItems
        };
        this.doRequest = this.doRequest.bind(this);
    }
    doRequest = async(menuItem) =>{
        try {
            await axios.post(menuItem.url, {});
            if (menuItem.redirectUrl){
                window.location.href = menuItem.redirectUrl;
            }
        } catch {
        }
    }
    render() {
        const items = this.state.menuItems;
        const renderItems = items.map((item, index) =>
            { return item.divider ? 
                <div className="dropdown-divider" key={'divider' + index}></div> :
                (item.method == 'post'?
                    <div className="dropdown-item" key={item.title} onClick={()=>this.doRequest(item)}>{item.title}</div>:
                    <Link className="dropdown-item" to={item.url} key={item.title}>{item.title}</Link> 
                )}
        );
        return(
            <div>
                <button className="button-dropdown-menu dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">                                       
                    {this.state.title}
                </button>
                <div className="dropdown-menu">
                    {renderItems}
                </div>
            </div>);
    }
}

export default DropdownMenu;