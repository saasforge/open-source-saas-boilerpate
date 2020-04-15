import React, { Component } from 'react';

import Alert from '@src/components/alert/Alert';
import FileUploader from '@src/modules/fileUploader/FileUploader.jsx';

class FileUploaderDemoView extends Component {
    constructor(props) {
        super(props);    
        this.state = {
            srcSingle: null,
            srcMultiple: [],
        };
        this.singleFileUploader = React.createRef();
        this.multipleFileUploader = React.createRef();
    }
    singleFileUploaded = (result, fileUrl, error)=>{
        if (result){
            console.log(fileUrl);
        }
    }
    uploadSingleFile=()=>{
        this.singleFileUploader.current.upload()
    }
    render() {
        return (
            <div className="panel-light">
                <div className="row">
                    <div className="col-md-10">
                        <h3>Color Picker Field demo</h3>
                        <h5>Single file upload</h5>
                        <FileUploader 
                            ref={this.singleFileUploader}
                            uploadDoneHandler={this.singleFileUploaded}
                            showFileName={true} 
                            previewWidth="200px" 
                            previewHeight="200px"
                            previewIsRound={true}
                            generateIdName={true}
                            showAlert={false}
                            src={this.state.srcSingle} />
                        <div>
                            <button className="btn btn-primary" onClick={this.uploadSingleFile}>Initiate uploading</button>
                        </div>
                        <h5>Multiple file upload</h5>
                        <FileUploader 
                            ref={this.multipleFileUploader}
                            multiple={true}
                            showFileName={true} 
                            previewWidth="300px" 
                            previewHeight="200px"
                            previewIsRound={false}
                            generateIdName={true} 
                            showAlert={false}
                            src={this.state.srcMultiple}/>
                        <div>
                            <button className="btn btn-primary"  onClick={this.uploadSingleFile}>Initiate uploading multiple</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default FileUploaderDemoView;