import React, { Component } from 'react';

import Alert from '@src/components/alert/Alert';
import FileUploader from '@src/modules/fileUploader/FileUploader.jsx';

class FileUploaderDemoView extends Component {
    constructor(props) {
        super(props);    
        this.state = {
        };
    }
    render() {
        return (
            <div className="panel-light">
                <div className="row">
                    <div className="col-md-6">
                        <h3>Color Picker Field demo</h3>
                        <FileUploader 
                            showFileName={true} 
                            previewWidth="200px" 
                            previewHeight="200px"
                            previewIsRound={true}
                            generateIdName={true} />
                    </div>
                </div>
            </div>
        );
    }
}

export default FileUploaderDemoView;