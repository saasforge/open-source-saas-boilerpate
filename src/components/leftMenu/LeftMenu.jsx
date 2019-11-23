import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-free-solid';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';

import dashboardMenu from './leftMenuData';

library.add(fab);

class LeftMenu extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            menuItems: dashboardMenu
        };
        this.toggleSubMenu = this.toggleSubMenu.bind(this);
    }
    findMenuItemByName(item, name){
        var foundItem = null;
        if (item.name == name){
            foundItem = item
        } else {
            if (item.items){
                for (var i = 0; i < item.items.length; i++){
                    foundItem = this.findMenuItemByName(item.items[i], name);
                    if (foundItem){
                        break;
                    }
                }
            }
        }
        return foundItem;
    }
    toggleSubMenu(submenuObject){
        const menuItems = this.state.menuItems;
        var foundItem = null;
        for (var i = 0; i < menuItems.length; i++){
            foundItem = this.findMenuItemByName(menuItems[i], submenuObject.name);
            if (foundItem){
                break;
            }
        }
        if (foundItem){
            foundItem.expanded = !foundItem.expanded;
        }
        this.setState({menuItems: menuItems});
    }
    /*
    item - menu item
    level - number of level
    */
    renderMenuItemBlock(item, level){
        const menuItemStyle = {paddingLeft: 10 * level + 'px'};
        // Set up class for expanding
        const subitemClassName = (item.name ? (item.expanded == true ? '' : ' collapsed') : '');
        var itemTitle;
        if (item.name){
            let itemBlock = (
                <div>
                    {item.icon ?<div className="icon-block" style={{color: item.color || ''}}><FontAwesomeIcon icon={item.icon}  /></div> : ''}
                    <span>{item.name}</span> 
                    {item.items ? <button className="button-expand" onClick={() => this.toggleSubMenu(item)}><FontAwesomeIcon icon="angle-down" /></button>: ''}  
                </div>
            );
            if (item.url){
                itemTitle = (
                    <Link className="menu-item" style={menuItemStyle} to={item.url}>
                        {itemBlock}
                    </Link>
                );
            } else {
                itemTitle = (                
                    <div className="menu-item" style={menuItemStyle}>
                        {itemBlock}
                    </div>
                );
            }
        } else {
            itemTitle = '';
        }
        return (
            <div key={item.name || item.groupName}>
                {itemTitle}
                {item.items ? 
                    <div className={'item-submenu' + subitemClassName}>
                    {
                        item.items.map((subItem)=>this.renderMenuItemBlock(subItem, level + 1))
                    }
                    </div> 
                    : ''
                }
            </div>
        );
    }
    render() {
        const groupItems = this.state.menuItems.map((group) =>
            <div className="group-block" key={group.groupName}>
                <div className="group-name">{group.groupName}</div>
                <div className="group-items">{this.renderMenuItemBlock(group, 1)}</div>
            </div>
        );
        return (
            <div className="aside-menu">{groupItems}</div>
        );
    }
}

export default LeftMenu;