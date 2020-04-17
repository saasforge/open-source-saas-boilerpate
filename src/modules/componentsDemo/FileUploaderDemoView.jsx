import React, { Component } from 'react';

import Alert from '@src/components/alert/Alert';
import FileUploader from '@src/modules/fileUploader/FileUploader.jsx';

class FileUploaderDemoView extends Component {
    constructor(props) {
        super(props);    
        this.state = {
            srcSingle: null,
            srcMultiple: ["https://s3-ca-central-1.amazonaws.com/fbc-userpic/test-multiple/4f647317d2544a94a4d8d68d49506d25.JPG", "https://s3-ca-central-1.amazonaws.com/fbc-userpic/test-multiple/20d2886d35ad42749dcef20234535b2f.JPG"],
        };
        this.singleFileUploader = React.createRef();
        this.multipleFileUploader = React.createRef();
    }
    singleFileUploaded = (result, fileUrl, error)=>{
        if (result){
            console.log(fileUrl);
        }
    }
    uploadSingleFile = async()=>{
        const uploadData = await this.singleFileUploader.current.upload();
        console.log(uploadData.result);
        console.log(uploadData.urls);
    }
    uploadMultipleFile = async()=>{
        const uploadData = await this.multipleFileUploader.current.upload();
        console.log(uploadData.result);
        console.log(uploadData.urls);
    }
    deleteFileFromServer = (result, fileUrl)=>{
        console.log('Result of file deletion: ', result, ' file url: ', fileUrl);
    }
    render() {
        return (
            <div className="panel-light">
                <div className="row">
                    <div className="col-md-10">
                        <h3>Files upload demo</h3>
                        <h5 className="mt-4">Single file upload</h5>
                        <FileUploader 
                            ref={this.singleFileUploader}
                            showFileName={true} 
                            previewWidth="200px" 
                            previewHeight="200px"
                            previewIsRound={true}
                            generateIdName={true}
                            showAlert={false}
                            src={this.state.srcSingle} 
                            deleteFileHandler={this.deleteFileFromServer}
                            folderName="test-single"
                            showModalOnClick={false}/>
                        <div className="mt-3">
                            <button className="btn btn-primary" onClick={this.uploadSingleFile}>Initiate uploading</button>
                        </div>
                        <h5 className="mt-4">Multiple file upload</h5>
                        <FileUploader 
                            ref={this.multipleFileUploader}
                            multiple={true}
                            showFileName={true} 
                            previewWidth="300px" 
                            previewHeight="200px"
                            previewIsRound={false}
                            generateIdName={true} 
                            showAlert={false}
                            deleteFileHandler={this.deleteFileFromServer}
                            folderName="test-multiple" 
                            src={this.state.srcMultiple}/>
                        <div className="mt-3">
                            <button className="btn btn-primary"  onClick={this.uploadMultipleFile}>Initiate uploading multiple</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default FileUploaderDemoView;