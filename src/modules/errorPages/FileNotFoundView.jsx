import React, { Component } from 'react';

import Alert from '@src/components/alert/Alert';

class FileNotFoundView extends Component {
    render() {
      return (
            <div>
                <Alert status={'error'} message="Requested file (URL) not found" />
            </div>
        );
    }
}

export default FileNotFoundView;