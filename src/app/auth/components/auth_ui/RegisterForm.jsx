import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { AuthUIFunctions } from './AuthUIFunctions';
import ErrorMessage from './ErrorMessage';

export default class RegisterForm extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            username: '',
            email: '',
            password: '',
            password2: '',
            validUsername: true,
            validEmail: true,
            validPassword: true,
            validPassword2: true,
            errors: []
        };
    }
    addError = (error) => {
        this.setState(prevState => ({
            errors: [...prevState.errors, error]
        }));
    }
    clearError = () => {
        this.setState(prevState => ({
            errors: [],
            validUsername: true,
            validEmail: true,
            validPassword: true,
            validPassword2: true
        }));
    }
    sendData = async () => {
        var isValid = true;
        this.clearError();

        if (!(this.state.username)){
            this.setState({ validUsername: false });
            this.addError('Please enter a valid username.');
            isValid = false;
        }
        if (!(this.state.email) || !AuthUIFunctions.validateEmail(this.state.email)){
            this.setState({ validEmail: false });
            this.addError('Please enter a valid email.');
            isValid = false;
        }
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
            username: this.state.username,
            email: this.state.email, 
            password: this.state.password,
            password2: this.state.password2,
        };
        try {
            let response = await axios.post('/api/auth/register', data);
            this.setState({ errors: AuthUIFunctions.handleResponse(response) });
        } catch {
            this.setState({ errors: ['Some error occured during this request... please try again.'] });
        }
    }
    handleChange = (event) =>  {
        this.setState({ [event.target.name]: event.target.value});
    }
    render(){
        return (
            <div>
                <div className="text-center mb-5 mt-5">
                    <h1>Please register</h1>
                </div>
                <div className="row md-form">
                    <label htmlFor="inputUserName">User name (visible to others)</label>
                    <input type="text" id="inputUserName" 
                        className={this.state.validUsername ? 'form-control' : 'form-control non-valid'} 
                        onChange={this.handleChange} name="username"
                        autoFocus />
                </div>

                <div className="row md-form">
                    <label htmlFor="inputEmail">Email address</label>
                    <input type="email" id="inputEmail" 
                        className={this.state.validEmail ? 'form-control' : 'form-control non-valid'} 
                        onChange={this.handleChange} name="email"/>
                </div>

                <div className="row md-form">
                    <label htmlFor="inputPassword">Password</label>
                    <input type="password" id="inputPassword" 
                        className={this.state.validPassword ? 'form-control' : 'form-control non-valid'}
                        onChange={this.handleChange} name="password" />
                </div>

                <div className="row md-form">
                    <label htmlFor="inputPassword">Confirm password</label>
                    <input type="password" id="inputPassword2" 
                        className={this.state.validPassword2 ? 'form-control' : 'form-control non-valid'}
                        onChange={this.handleChange} name="password2" />
                </div>

                <div className="row md-form">
                    <p className="text">Already have an account? Sign in <Link to="/login">here</Link>.</p>
                </div>
                <div className="text-center mb-5 mt-5">
                    <div className="col-md-12">
                        <button className="btn btn-lg btn-primary" onClick={this.sendData}>Create account</button>
                    </div>
                </div>
                { this.state.errors.length ? <ErrorMessage errors={this.state.errors} /> : null }
            </div>
        );
    }
}