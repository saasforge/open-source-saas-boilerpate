import React, { Component } from 'react';
import Alert from '@src/components/alert/Alert';

class TestView extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            username: '',
            status: 'info',
            message: 'You are looking at the test page.'
        };
    }
    render() {
      return (
            <div className="panel-light">
                <div className="col-md-6">
                    <h5>{this.props.data.title || 'Test page'}</h5>
                    <Alert status={this.state.status} message={this.state.message} />
                </div>
            </div>
        );
    }
}

export default TestView;