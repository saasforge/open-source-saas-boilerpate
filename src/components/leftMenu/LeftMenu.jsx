import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@src/components/icon/Icon';

class LeftMenu extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            menuItems: props.menuItems
        };
        this.toggleSubMenu = this.toggleSubMenu.bind(this);
    }
    findMenuItemByTitle(item, title){
        var foundItem = null;
        if (item.title == title){
            foundItem = item
        } else {
            if (item.items){
                for (var i = 0; i < item.items.length; i++){
                    foundItem = this.findMenuItemByTitle(item.items[i], title);
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
            foundItem = this.findMenuItemByTitle(menuItems[i], submenuObject.title);
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
        level = this.props.collapsed ? 2 : level; // If the menu is collapsed all icons should be on the same level.
        const menuItemStyle = {paddingLeft: 10 * level + 'px'};
        // Set up class for expanding
        const subitemClassName = (item.title ? (item.expanded == true ? '' : ' collapsed') : '');
        let itemBlock;
        if (item.title){
            if (!this.props.collapsed){
                itemBlock = (
                    <div className={'menu-item ' + (window.location.pathname == item.url ? 'current-url' : '')}  style={menuItemStyle}>
                        {item.icon ?<div className="icon-block" style={{color: item.color || ''}}><Icon icon={item.icon}  /></div> : ''}
                        {item.url ? <Link to={item.url} onClick={()=>this.props.linkClickHandler()}>{item.title}</Link> : <span>{item.title}</span> }
                        {item.items ? <button className="button-expand" onClick={() => this.toggleSubMenu(item)}><Icon icon="angle-down" /></button>: ''}  
                    </div>
                );
            } else {
                // Show only icon or default icon
                const itemCollapsedIcon = item.icon ? 
                                        <Icon icon={item.icon} style={{color: item.color || ''}} /> : 
                                        <Icon className="default-color" icon='arrow-alt-circle-right' />;
                itemBlock = (
                    <div className="menu-item" style={menuItemStyle}>
                        <div className="icon-block" title={item.title}>{item.url ? <Link to={item.url}>{itemCollapsedIcon}</Link> : <span>{itemCollapsedIcon}</span> }</div>
                        {item.items ? <button className="button-expand" onClick={() => this.toggleSubMenu(item)}><Icon icon="angle-down" /></button>: ''}  
                    </div>
                );
            }
        } else {
            itemBlock = '';
        }
        return (
            <div key={item.title || item.groupTitle}>
                {itemBlock}
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
            {
                const groupRendering = this.props.collapsed ? 
                    (<Icon icon="ellipsis-h" />):
                    group.groupTitle;
                return (<div className="group-block" key={group.groupTitle}>
                    <div className="group-title">{groupRendering}</div>
                    <div className="group-items">{this.renderMenuItemBlock(group, 1)}</div>
                </div>);
            }
        );
        return (
            <div className="aside-menu">{groupItems}</div>
        );
    }
}

export default LeftMenu;