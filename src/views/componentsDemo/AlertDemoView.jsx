import React, { Component } from 'react';

import Alert from '@src/components/alert/Alert';

class AlertDemoView extends Component {
    render() {
        return (
            <div>
                <h3>Alerts</h3>
                <h4>Success</h4>
                <div>
                    <Alert status={'success'} message="The operation you requested finished successfully!" />
                </div>
                <h4>Info</h4>
                <div>
                    <Alert status={'info'} message="Tip: you send an inner message to your users." />
                </div>
                <h4>Warning</h4>
                <div>
                    <Alert status={'warning'} message="The operation finished but notification will be send later." />
                </div>
                <h4>Error</h4>
                <div>
                    <Alert status={'error'} message="This user doesn't have enough privileges to accomplish this operation." />
                </div>
            </div>
        );
    }
}

export default AlertDemoView;