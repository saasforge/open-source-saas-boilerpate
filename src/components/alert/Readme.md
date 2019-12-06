# Alert 
ReactJS component for showing alerts.

![Alerts](https://github.com/saasforge/saas-forge-public-docs/blob/master/alerts.png?raw=true)

## Features
- 4 types of alerts: success, information, warning, error
- has coloring style and icon
- may be set up to disappear in N of seconds

## How to use

Sample code to use:

```javascript
import Alert from '@src/components/alert/Alert';
```

```html
<Alert status={this.state.status} message={this.state.message} hideInSecs={8} />
```

![Profile saved](https://github.com/saasforge/saas-forge-public-docs/blob/master/profile.png?raw=true)

In this example we use state variables defined in the class like:

```javascript
    constructor(props) {
        super(props);
    
        this.state = {
            status: '',
            message: ''
        };
    }
```

#### Component props

- status (type: String, possible values: 'success', 'info', 'warning', 'error') - defines the alert type
- message (type: String) - defines the alert text
- hideInSecs (type: Number) - defines the number of seconds the alert to disappear after (if not provided, an alert will not disappear).

You may omit