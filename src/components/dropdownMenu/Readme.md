# Dropdown menu
This ReactJS menu is currently used in the header of dashboard but you can use it in any place.

![Example top menu](https://github.com/saasforge/saas-forge-public-docs/blob/master/topMenu.png?raw=true)

## Features
- Based on a simple JSON structure
- you can add a divider.

## How to use

```javascript
import DropdownMenu from '@src/components/dropdownMenu/DropdownMenu';
```

```html
<DropdownMenu menuItems={topMenuItems} title={this.state.username} />
```

#### Component props
- **menuItems**(JSON array) - menu items (see explanation below)
- **title** (String) - title to show when menu is collapsed.

##### menuItems JSON structure
JSON array of objects. Each object may have the following fields:
- **title** (String): menu item title 
- **url** (String): menu item url
- **component** (lazy loaded component): the component (view) that will be loaded into a container (accroding to its route), has the following format:
```javascript
lazy(() => import('@src/<path_to_component>'))
```
- **divider** (Boolean): if true, all other fields are ignored and divider will be rendered
- **method** (String): any other than 'get' method 
- **redirectUrl** (String): any url you want a user to be redirected after selecting this menu item.

Example of the top menu JSON:

```javascript
const topMenu = [
    {title: 'Profile', url: '/app/profile', component: lazy(() => import('@src/modules/profile/ProfileView'))},
    {title: 'Change password', url: '/app/password', component: lazy(() => import('@src/modules/password/ChangePasswordUI'))},
    {divider: true},
    {title: 'Logout', url: '/api/auth/logout', method: 'post', redirectUrl: '/auth/login'}
];
```