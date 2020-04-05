import React, { Component } from 'react';
import axios from 'axios';
import Alert from '@src/components/alert/Alert';
import Icon from '@src/components/icon/Icon';

import './fileUploader.scss';

/*
Props:
src - URL to the file to show
showFileName - bool, if you want the file name to be shown (true by default)
noFileText - the text that should be shown if no file is selected and showFileName is true ('No file selected' by default)
previewWidth - width of preview image
previewHeight - height of preview image
previewIsRound - false or true (false by default)
generateIdName - false or true (false by default), indicates if the module should generate ID name for 
the newly uploaded image
*/

class FileUploader extends Component {
    constructor(props) {
        super(props);    
        this.state = {
            src: this.props.src || '',
            fileName: (this.props.src ? this.props.src.replace(/[\#\?].*$/,'') : ''),
            showFileName: (this.props.showFileName != null ? this.props.showFileName : true),
            noFileText: this.props.noFileText || 'No file selected',
            status: '', 
            message: '',
            fileSelected: false,
            previewWidth: this.props.previewWidth || '100px',
            previewHeight: this.props.previewHeight || '80px',
            previewIsRound: (this.props.previewIsRound != null ? this.props.previewIsRound : false),
            generateIdName: (this.props.generateIdName != null ? this.props.generateIdName : false)
        };
        this.fileInput = React.createRef();
    }
    updatePreview = ()=>{
        const self = this;
        if (this.fileInput.current.files[0]) {
            var reader = new FileReader();               
            reader.onload = function(e) {
                self.setState({
                    src: e.target.result, 
                    fileName: self.fileInput.current.files[0].name,
                    fileSelected: true
                });
            }                
            reader.readAsDataURL(this.fileInput.current.files[0]);
        }
    }
    selectFile = ()=>{
        this.fileInput.current.click()
    }
    uploadFile = async()=>{
        this.setState({ status: 'info', message: 'Uploading...' });
        try {
            var file = this.fileInput.current.files[0];
            let formData = new FormData();
            formData.append('file', file);
            const generateFlag = (this.state.generateIdName ? 'generate' : 'original');
            let response = await axios.post(`/app/api/upload/${generateFlag}`, formData);
            if (response.data.result){
                this.setState({
                    status: 'success',
                    message: 'Image has been upload successfully!',
                    src: response.data.file_url,
                    fileName: response.data.file_name
                });
            } else {
                this.setState({ status: 'error', message: response.data.error || 'Some error occured during this request... please try again.' });
            }
        } catch {
            this.setState({ status: 'error', message: 'Some error occured during this request... please try again.' });
        }
    }
    render() {
        let backgroundSize = '';
        if (this.state.previewIsRound){
            if (this.state.src){
                backgroundSize = 'cover';
            } else {
                backgroundSize = '76%';
            }
        } else {
            backgroundSize = 'contain';
        }
        return   (     
            <div>          
                <div className="image-upload-block">
                    <input type="file" className="form-control" onChange={this.updatePreview} 
                        id={this.state.id} hidden ref={this.fileInput}/>
                    {this.state.showFileName ? <span className="mr-2">{this.state.fileName || this.state.noFileText}</span>: ''}
                    <button className="btn btn-primary mr-2" onClick={this.selectFile}>Select a file</button>
                    {this.state.fileSelected ?
                        <button className="btn btn-primary" onClick={this.uploadFile}>Upload</button>
                        :''
                    }
                </div>
                <div className="placeholder-block" 
                    style={{width: this.state.previewWidth,
                            height: this.state.previewHeight,
                            verticalAlign: 'middle',
                            textAlign: 'center',
                            marginTop: '10px',
                            padding: '5px',
                            border: '1px solid #e9e9e9',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                            backgroundClip: (this.state.previewIsRound ? 'unset': 'content-box'),
                            backgroundSize: backgroundSize,
                            borderRadius: (this.state.previewIsRound ? '50%' : '5px'),
                            backgroundImage: `url(${this.state.src || '/static/media/image-placeholder.png'})`}}>
                    {/*<img className="img-placeholder"
                        style={{borderRadius: 
                            (this.state.previewIsRound ? '50%' : '5px')}}
                        src={this.state.src || '/static/media/image-placeholder.png'} />*/}
                </div>
                <Alert status={this.state.status} message={this.state.message} />
            </div>  );
    }
}

export default FileUploader;