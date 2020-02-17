import React, { Component } from 'react';
import axios from 'axios';
import Alert from '@src/components/alert/Alert';

class ChangePassword extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            oldPassword: '',
            newPassword: '',
            newPasswordConfirm: '',
            status: '', 
            message: '',
            oldPasswordValid: true,
            newPasswordValid: true
        };
    }
    handleFieldChange = (fieldName)=>{
        const newValue = {};
        newValue[fieldName] = event.target.value;
        this.setState(newValue);
    }
    validate = ()=>{
        let errors = [];
        if (!this.state.oldPassword) {
            errors.push('Please provide your current password.')
        }
        if (!this.state.newPassword) {
            errors.push('Please provide a new password.')
        }
        if (!this.state.newPasswordConfirm) {
            errors.push('Please confirm a new password.')
        }
        if (this.state.newPassword != this.state.newPasswordConfirm) {
            errors.push('New password and its confirmation should be the same')
        }
        if (errors.length){
            this.setState({status: 'error', message: errors});
            return false;
        }
        return true;
    }
    save = async()=> {
        if (!this.validate()){
            return;
        }
        this.setState({ status: 'info', message: 'Saving your new password...' });
        try {
            let response = await axios.post('/app/api/password', 
                                        { password: this.state.oldPassword,
                                        new_password: this.state.newPassword
            });
            if (response.data.result){
                this.setState({
                    status: 'success',
                    message: 'Your new password has been saved successfully!'
                });
            } else {
                this.setState({ status: 'error', message: response.data.error || 'Some error occured during this request... please try again.' });
            }
        } catch (ex) {
            this.setState({ status: 'error', message: 'Some error occured during this request... please try again.' });
        }
    }
    render() {
        return (
            <div className="panel-light">
                <div className="col-md-6">
                    <h5>Change password</h5>
                    <div className="form-group">
                        <label>Your current password</label>
                        <input type="password" 
                            className={`form-control ${this.state.oldPasswordValid ? '' : 'non-valid'}`} 
                            onChange={()=>this.handleFieldChange('oldPassword')}/>
                    </div>
                    <div className="form-group">
                        <label>New password</label>
                        <input type="password" 
                            className={`form-control ${this.state.newPasswordValid ? '' : 'non-valid'}`}
                            onChange={()=>this.handleFieldChange('newPassword')}/>
                    </div>
                    <div className="form-group">
                        <label>Confirm your new password</label>
                        <input type="password" className="form-control" 
                            className={`form-control ${this.state.newPasswordValid ? '' : 'non-valid'}`}
                            onChange={()=>this.handleFieldChange('newPasswordConfirm')}/>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={()=>this.save()}>Save changes</button>
                </div>
                <div className="col-md-6">
                    <Alert status={this.state.status} message={this.state.message} />
                </div>
            </div>
        );
    }
}

export default ChangePassword;