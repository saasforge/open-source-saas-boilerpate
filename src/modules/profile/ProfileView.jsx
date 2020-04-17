import React, { Component } from 'react';
import { connect } from "react-redux";
import axios from 'axios';

import Alert from '@src/components/alert/Alert';
import FileUploader from '@src/modules/fileUploader/FileUploader.jsx';

class ConnectedProfileView extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            username: '',
            userpic_url: '',
            status: '',
            message: '',
            userPicChanged: false
        };
        this.save = this.save.bind(this);
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.userpicUploader = React.createRef();
    }
    componentDidMount = async()=> {
        // Load user data
        try {
            let response = await axios.get('/app/api/profile');
            if (response.data.result){
                this.setState({ username: response.data.username, userpic_url: response.data.userpic_url});
            } else {
                this.setState({ status: 'error', message: response.data.error || 'Some error occured during this request... please try again.' });
            }
        } catch {
            this.setState({ status: 'error', message: 'Some error occured during this request... please try again.' });
        }
    }
    handleChangeUsername(event) {
        this.setState({username: event.target.value});
    }
    save = async()=> {
        this.setState({ status: 'info', message: 'Saving...' });
        try {
            let response = await axios.post('/app/api/profile', {username: this.state.username, userpic_url: this.state.userpic_url});
            if (response.data.result){
                this.setState({
                    status: 'success',
                    message: 'Profile has been saved successfully!'
                });
                //this.props.updateUserName(this.state.username);
                this.props.dispatch({
                    type: 'UPDATE_USERNAME', name: 'username', value: this.state.username
                });
            } else {
                this.setState({ status: 'error', message: response.data.error || 'Some error occured during this request... please try again.' });
            }
        } catch {
            this.setState({ status: 'error', message: 'Some error occured during this request... please try again.' });
        }
    }
    deleteUserPic = ()=>{
        this.setState({userpic_url: null});
        this.save();
    }
    uploadUserPic = async()=>{
        this.setState({ status: 'info', message: 'Uploading userpic...' });
        const uploadData = await this.userpicUploader.current.upload();
        console.log(uploadData.result);
        console.log(uploadData.urls);
        if (uploadData.result){
            this.setState({userpic_url: uploadData.urls[0]});
            this.save();
        }
    }
    saveHandler = ()=>{
        if (this.state.userPicChanged){
            this.uploadUserPic();
        } else {
            this.save();
        }
    }
    render() {
      return (
            <div className="panel-light">
                <div className="col-md-6">
                    <h5>User profile</h5>
                    <div className="form-group">
                        <label>User name</label>
                        <input type="text" className="form-control" 
                            onChange={this.handleChangeUsername}
                            value={this.state.username} 
                            placeholder="Enter your user name (nick)"/>
                    </div>
                    <div className="form-group">
                        <label>User picture</label>
                        <FileUploader 
                            ref={this.userpicUploader}
                            previewWidth="100px" 
                            previewHeight="100px"
                            previewIsRound={true}
                            generateIdName={true}
                            showAlert={false}
                            src={this.state.userpic_url} 
                            deleteFileHandler={this.deleteUserPic}
                            folderName="userpic"
                            defaultIcon="user-circle"
                            showModalOnClick={false}
                            filesChangeHandler={()=>this.setState({userPicChanged: true})}/>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={()=>this.saveHandler()}>Save</button>
                </div>
                <div className="col-md-6">
                    <Alert status={this.state.status} message={this.state.message} hideInSecs={8} />
                </div>
            </div>
        );
    }
}

const ProfileView = connect()(ConnectedProfileView);

export default ProfileView;