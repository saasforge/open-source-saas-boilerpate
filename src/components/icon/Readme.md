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
import Icon from '@src/components/icon/Icon';


```

```html
<Icon icon={['fab', 'facebook']} color="blue" />
```

#### Component props
- **icon**(string or array of strings) - icon name (accordingly to Fontawesome naming)
- **color**(string) - color name, for example "green" or "#FFF"
- **className**(string or array of strings) - custom icon class name
