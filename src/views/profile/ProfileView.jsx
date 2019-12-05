import React, { Component } from 'react';
import axios from 'axios';

import Alert from '@src/components/alert/Alert';

class ProfileView extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            username: '',
            status: '',
            message: ''
        };
        this.save = this.save.bind(this);
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
    }
    componentDidMount = async()=> {
        // Load user data
        try {
            let response = await axios.get('/app/api/profile');
            if (response.data.result){
                this.setState({ username: response.data.username});
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
            let response = await axios.post('/app/api/profile', {username: this.state.username});
            if (response.data.result){
                this.setState({
                    status: 'success',
                    message: 'Profile has been saved successfully!'
                });
            } else {
                this.setState({ status: 'error', message: response.data.error || 'Some error occured during this request... please try again.' });
            }
        } catch {
            this.setState({ status: 'error', message: 'Some error occured during this request... please try again.' });
        }
    }
    render() {
      return (
            <div className="container panel-light">
                <div className="col-md-6">
                    <h5>User profile</h5>
                    <div className="form-group">
                        <label>User name</label>
                        <input type="text" className="form-control" 
                            onChange={this.handleChangeUsername}
                            value={this.state.username} 
                            placeholder="Enter your user name (nick)"/>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={()=>this.save()}>Save</button>
                </div>
                <div className="col-md-6">
                    <Alert status={this.state.status} message={this.state.message} hideInSecs={8} />
                </div>
            </div>
        );
    }
}

export default ProfileView;