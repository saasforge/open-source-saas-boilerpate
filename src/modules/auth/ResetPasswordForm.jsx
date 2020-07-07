import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { AuthUIFunctions } from './AuthUIFunctions';
import Alert from '@src/components/alert/Alert';
import Icon from '@src/components/icon/Icon';

export default class ResetPasswordForm extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            username: '',
            email: '',
            password: '',
            password2: '',
            validPassword: true,
            validPassword2: true,
            errors: [],
            loading: false
        };
        this.token = '';
        this.userId = '';
    }
    addError = (error) => {
        this.setState(prevState => ({
            errors: [...prevState.errors, error]
        }));
    }
    clearError = () => {
        this.setState(prevState => ({
            errors: [],
            validPassword: true,
            validPassword2: true
        }));
    }
    sendData = async () => {
        var isValid = true;
        this.clearError();

        if ( !(this.state.password)){
            this.setState({ validPassword: false });
            this.addError('Please enter a password.');
            isValid = false;
        }
        if ( !(this.state.password2)){
            this.setState({ validPassword2: false });
            this.addError('Please enter a password confirmation.');
            isValid = false;
        }
        if ((this.state.password && this.state.password2) &&  this.state.password != this.state.password2){
            this.setState({ validPassword: false });
            this.setState({ validPassword2: false });
            this.addError('Password and password confirmation should be the same.');
            isValid = false;
        }
        if (!isValid){
            return;
        }

        var data = {
            password: this.state.password,
            password2: this.state.password2,
            token: this.token,
            userid: this.userId
        };
        this.setState({ 
            loading: true,
            status: 'info',
            message: 'Please wait until we verify your data and reset your password.'
        });
        try {
            let response = await axios.post('/api/auth/resetpassword', data);
            this.setState({ errors: AuthUIFunctions.handleResponse(response), loading: false});
            if (response.data.result){
                this.setState({status: 'success', message: 'We reset your password, you will be redirected in several seconds.'});
            } else {
                this.setState({status: ''});
            }
        } catch(ex) {
            console.log('Exception occured trying to send the register request');
            console.log(ex);
            this.setState({ errors: ['Some error occured during this request... please try again.'], loading: false });
        }
    }
    handleChange = (event) =>  {
        this.setState({ [event.target.name]: event.target.value});
    }
    render(){
        this.userId = this.props.match.params.userid;
        this.token = this.props.match.params.token;
        return (
            <div className="form-container">
                <div className="text-center mb-2 mt-2">
                    <div className="auth-logo">
                        <img src="/static/media/logo.png" />
                    </div>
                </div>
                <div className="text-center mb-5 mt-3">
                    <h1>Reset your password</h1>
                </div>
                <div className="form-group">
                    <label htmlFor="inputPassword">Password</label>
                    <input type="password" id="inputPassword" 
                        className={this.state.validPassword ? 'form-control' : 'form-control non-valid'}
                        onChange={this.handleChange} name="password" />
                </div>
                <div className="form-group">
                    <label htmlFor="inputPassword">Confirm password</label>
                    <input type="password" id="inputPassword2" 
                        className={this.state.validPassword2 ? 'form-control' : 'form-control non-valid'}
                        onChange={this.handleChange} name="password2" />
                </div>
                <div className="text-center mb-5 mt-5">
                    <div className="col-md-12">
                        <button className="btn btn-lg btn-primary" onClick={this.sendData} >
                            {this.state.loading ? <Icon icon="circle-notch" className="fa-spin" size="xs" spin /> : ''}
                            Submit
                        </button>
                    </div>
                </div>
                <div className="row text-center">
                    <p className="w-100">Already have an account? Sign in <Link to="/auth/login">here</Link>.</p>
                </div>
                { this.state.errors.length ? <Alert status={'error'} message={this.state.errors} /> : null }
                {this.state.status ? <Alert status={this.state.status} message={this.state.message} />: null}
            </div>
        );
    }
}