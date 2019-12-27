import React, { Component } from 'react';

import Alert from '@src/components/alert/Alert';

class AlertDemoView extends Component {
    render() {
        return (
            <div className="panel-light">
                <div className="row">
                    <div className="col-md-6">
                        <h3>Alerts</h3>
                        <h5>Success</h5>
                        <div>
                            <Alert status="success" message="The operation you requested finished successfully!" />
                        </div>
                        <h5>Info</h5>
                        <div>
                            <Alert status="info" message="Tip: you send an inner message to your users." />
                        </div>
                        <h5>Warning</h5>
                        <div>
                            <Alert status="warning" message="The operation finished but notification will be send later." />
                        </div>
                        <h5>Error</h5>
                        <div>
                            <Alert status="error" message="This user doesn't have enough privileges to accomplish this operation." />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AlertDemoView;