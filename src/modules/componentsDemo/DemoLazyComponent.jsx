import React, { Component } from 'react';

import Alert from '@src/components/alert/Alert';

class DemoLazyComponent extends Component {
    render() {
        return (
            <div>
                <Alert status="info" message="This component was loaded lazy." />
                <div>And this text was passed from the data object:</div>
                <div><strong>{this.props.data.text}</strong></div>
            </div>
        );
    }
}

export default DemoLazyComponent;