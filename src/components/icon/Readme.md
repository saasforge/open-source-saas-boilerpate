# Tabs Control
This ReactJS-based, customizable icon, based on [Fontawesome](https://fontawesome.com/) icons.

See them in action:
![Tabs control](https://github.com/saasforge/saas-forge-public-docs/blob/master/TabsControl.png?raw=true)

## Features
Fully customizable icons, specify:
- icon image
- color
- custom class.

## How to use

```javascript
import TabsControl from '@src/components/tabsControl/TabsControl';

this.state = {
    tabsData: [{
        title: 'First tab',
        id: 'firstTab',
        content: (<div>
            <Alert status="error" message="This tab was loaded from tab data item's content." />
        </div>),
        icon: 'charging-station',
        iconColor: 'blue'
    }, {
        title: 'Second tab - active by default, no icon',
        id: 'secondTab',
        active: true,
        component: lazy(() => import('@src/modules/componentsDemo/DemoLazyComponent'))
    }, {
        title: 'Third tab',
        id: 'thirdTab',
        icon: 'biohazard',
        iconClassName: 'icon-big-red'
    }]
};
```

```html
<TabsControl data={this.state.tabsData} />
```

#### Component props
- **data**(JSON array of objects) - tabs items (see explanation below)

##### data JSON structure

Every object in this array has the following fields:
1. Common

- **title** (String) - a tab title
- **id** (String) - a tab id, may be any string but should be unique for all tabs as it's used as keys

2. Look

- **active** (Boolean) - if *true*, the tab will be active by default 
- **icon** (String) - Fontawesome-based name of icon, for example, "charging-station"
If the previous "icon" props is null, the following props will be ignored:

- **iconColor** (String) - Any string color like "yellow" or "#FFF"
- **iconClassName** (String) - Any custom class that will be applied to the icon

3. Behavior

- **content** (String) - JSX variable or code describing the layout of the tab content
- **component** (lazy loaded component) - a tab lazy-loaded import variable defined in the following format:
```javascript
lazy(() => import(string_path_to_component))
```
