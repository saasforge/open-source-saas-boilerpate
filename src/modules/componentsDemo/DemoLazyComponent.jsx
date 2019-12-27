import React, { Component } from 'react';

import Alert from '@src/components/alert/Alert';

class DemoLazyComponent extends Component {
    render() {
        return (
            <div>
                <Alert status="info" message="This component was loaded lazy." />
            </div>
        );
    }
}

export default DemoLazyComponent;