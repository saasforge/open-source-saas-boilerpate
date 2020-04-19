import React, { Component } from 'react';
import axios from 'axios';
import Alert from '@src/components/alert/Alert';
import Icon from '@src/components/icon/Icon';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {commonFunctions} from '@src/components/commonFunctions';

import './fileUploader.scss';

/*
Props:
src - URL to the file to show
previewWidth - width of preview image
previewHeight - height of preview image
previewIsRound - false or true (false by default)
generateIdName - false or true (false by default), indicates if the module should generate ID name for 
the newly uploaded image
folderName - subBucket (or subfolder) on AWS to upload files to
deleteFileHandler - a function to handle the deleting file from the server. This component provides deleting itself, and notify the handler about this fact
for it to update the database. It passes result and url of the image
showModalOnClick - if true, shows the modal on image click with bigger image. By default is true
filesChangeHandler - pointer to the function that will be called if user selected a new picture(s)
uploadOnSelection - if true, the files should be uploaded immediatelly after selection. False by default
defaultIcon - fontawesom icon name (without "fa"). If not specified, the component's default icon is used.
showAlert - if true show the component's alert. False by default.
*/

class FileUploader extends Component {
    constructor(props) {
        super(props);    
        this.state = {
            src: (Array.isArray(this.props.src) ? this.props.src.slice(0) : (this.props.src ? [this.props.src] : [])), // inner it's always array
            //fileName: (this.props.src ? this.props.src.replace(/[\#\?].*$/,'') : ''),
            //showFileName: (this.props.showFileName != null ? this.props.showFileName : true),
            noFileText: this.props.noFileText || 'No file selected',
            status: '', 
            message: '',
            fileSelected: false,
            previewWidth: this.props.previewWidth || '100px',
            previewHeight: this.props.previewHeight || '80px',
            previewIsRound: (this.props.previewIsRound != null ? this.props.previewIsRound : false),
            generateIdName: (this.props.generateIdName != null ? this.props.generateIdName : false),
            selectedImageSrc: '',
            showModalOnClick: (this.props.showModalOnClick != null ? this.props.showModalOnClick : true),
            showAlert: (this.props.showAlert != null ? this.props.showAlert : false),
            filesChanged: false,
            loaded: false
            //uploadOnSelection: (this.props.uploadOnSelection != null ? this.props.uploadOnSelection : false)
        };
        this.fileInput = React.createRef();
        this.id = commonFunctions.generateShortId('fileUploader_');
        this.files = [];
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.src && !prevState.loaded){
            return {
                src: (Array.isArray(nextProps.src) ? nextProps.src.slice(0) : (nextProps.src ? [nextProps.src] : [])),
                loaded: true
            };
        } else {
            return {};
        }
    }
    updatePreview = ()=>{
        const self = this;
        var filesNumber = this.fileInput.current.files.length;
        let files = [];
        for(var i = 0; i < filesNumber; i++){
            var reader = new FileReader();
            let src = (self.props.multiple ? (self.state.src || []) : []);              
            const index = i;
            reader.onload = function(e){
                src.push(e.target.result);
                files.push(self.fileInput.current.files[index])
                filesNumber -= 1;
                if (filesNumber == 0){
                    // Clear up the file uploader input
                    self.files = files;
                    self.fileInput.current.value = '';
                    self.setState({src: src, filesChanged: true});
                }
            }
            reader.readAsDataURL(this.fileInput.current.files[i]);
        }
    }
    // Returns true if new files have been selected, else false
    filesBeenChanged=()=>{
        return this.state.filesChanged;
    }
    selectFile = ()=>{
        this.fileInput.current.click()
    } 
    upload = async()=>{
        if (!this.files.length){
            return {result: false};
        }
        const self = this;
        return new Promise(async function(resolve) {
            self.setState({ status: 'info', message: 'Uploading...' });
            try {
                const folder = self.props.folderName ? (self.props.folderName + '/') : '';
                let formData = new FormData();
                self.files.forEach((file, index) =>{
                    formData.append(index, file);
                });
                
                const generateFlag = (self.state.generateIdName ? 'generate' : 'original');
                let response = await axios.post(`/app/api/upload/${folder}${generateFlag}`, formData);
                if (response.data.result){
                    let src = self.state.src;
                    let srcIndex = src.length - 1
                    let uploadedIndex = response.data.file_urls.length - 1;
                    for (var i = uploadedIndex; i > -1; i--){
                        src[srcIndex] = response.data.file_urls[uploadedIndex];
                        srcIndex --;
                    }
                    self.files = [];
                    self.setState({
                        src: src,
                        status: 'success',
                        message: 'Image has been upload successfully!',
                        filesChanged: false
                        //src: response.data.file_url,
                        //fileName: response.data.file_name
                    });
                    /*if (this.props.uploadDoneHandler){
                        this.props.uploadDoneHandler(true, response.data.file_url); // For a single file
                    }*/
                    resolve({
                        result: response.data.result,
                        urls: response.data.file_urls
                    });
                } else {
                    self.setState({ status: 'error', message: response.data.error || 
                        'Some error occured during this request... please try again.' });
                    resolve({
                        result: false,
                        urls: []
                    });
                }
                
            } catch (e){
                console.log(e);
                self.setState({ status: 'error', message: 'Some error occured during this request... please try again.' });
                resolve({
                    result: false,
                    urls: []
                });
            }
        });
    }
    imageError = ()=>{

    }
    deleteFileFromServer = async(fileUrl)=>{
        let result = false;
        const folder = this.props.folderName ? (this.props.folderName + '/') : '';
        try {
            let response = await axios.delete(`/app/api/upload/${folder}`, {data: {url: fileUrl}});
            if (!response.data.result){
                this.setState({status: '', message: ''});
            }  
            result = response.data.result;  
        } catch(ex) {
            this.setState({ error: 'Some error occured during this request... please try again.', loading: false });
            result = false;
        }
        return result;
    }
    deleteFile = async(e, index)=>{
        e.stopPropagation();
        if (this.state.src[index]){
            if (this.state.src[index].indexOf('data:') == 0){
                // File in memory, selected but not uploaded yet
                let src = this.state.src;
                src.splice(index, 1);
                this.setState({src: src});
            } else if (this.state.src[index].indexOf('http') == 0){
                // Uploaded and has URL
                const fileUrl = this.state.src[index];
                const deleteResult = await this.deleteFileFromServer(this.state.src[index]);
                if (deleteResult){
                    // Change list here
                    let src = this.state.src;
                    src.splice(index, 1);
                    this.setState({src: src});

                    // Call handler if exists
                    if (this.props.deleteFileHandler){
                        this.props.deleteFileHandler(deleteResult, fileUrl);
                    }
                }
            }
        }
    }
    renderImageBlock = (imageUrl, canBeDeleted, index)=>{
        let backgroundSize = '';
        if (this.state.previewIsRound){
            if (this.state.src.length){
                backgroundSize = 'cover';
            } else {
                backgroundSize = '76%';
            }
        } else {
            backgroundSize = 'contain';
        }
        return (<div className="placeholder-block" 
                onClick={imageUrl ? (this.state.showModalOnClick ? (e)=>this.setState({selectedImageSrc: imageUrl}) : null) :this.selectFile} 
                key={index || ''}
                style={{width: this.state.previewWidth,
                        height: this.state.previewHeight,
                        verticalAlign: 'middle',
                        textAlign: 'center',
                        marginTop: '10px',
                        marginRight: '5px',
                        padding: '5px',
                        border: '1px solid #e9e9e9',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        backgroundClip: (this.state.previewIsRound ? 'unset': 'content-box'),
                        backgroundSize: backgroundSize,
                        borderRadius: (this.state.previewIsRound ? '50%' : '5px'),
                        backgroundImage: (imageUrl ? `url(${imageUrl})`: '') } }>
                        {canBeDeleted ? 
                            <button className="delete-cross-button" onClick={(e)=>this.deleteFile(e, index)}>
                                <Icon icon="times-circle" />
                            </button>
                        :''}
                    {!imageUrl ? <Icon icon={this.props.defaultIcon || 'image'} className="placeholder-icon" />: ''}
            </div>);
    }
    render() {
        
        const placeHolder = this.renderImageBlock(null, false);
        const modal = (      
            <Modal size="lg" show={this.state.selectedImageSrc != ''} onHide={(e)=>this.setState({selectedImageSrc: ''})}>
                <Modal.Header closeButton>
                <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.state.selectedImageSrc ? <img className="image-block" src={this.state.selectedImageSrc} />: ''}
                </Modal.Body>
            </Modal>);
        const images = (this.state.src ? this.state.src.map((src, index)=>{
            return this.renderImageBlock(src, true, index);
        }): '');
        return   (     
            <div>   
                {modal}
                <div className="image-upload-block">
                    <input type="file" className="form-control" onChange={this.updatePreview} 
                        id={this.state.id} hidden ref={this.fileInput} multiple={this.props.multiple ? true: false} />
                    {/*this.state.showFileName ? <span className="mr-2">{this.state.fileName || this.state.noFileText}</span>: ''*/}
                    {/*this.state.fileSelected ?
                        <button className="btn btn-primary" onClick={this.uploadFile}>Upload</button>
                        :''
                    */}
                </div>
                <div className="image-list">
                    {this.props.multiple ? 
                                        images : 
                                        (this.state.src.length ? 
                                            images:
                                            placeHolder)}
                    {this.props.multiple ?
                                        placeHolder:
                                        null}

                </div>
                {this.state.showAlert ? <Alert status={this.state.status} message={this.state.message} />: ''}
            </div>  );
    }
}

export default FileUploader;