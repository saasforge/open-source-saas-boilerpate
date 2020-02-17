import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { AuthUIFunctions } from './AuthUIFunctions';
import Alert from '@src/components/alert/Alert';
import Icon from '@src/components/icon/Icon';

export default class LoginForm extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            email: '',
            password: '',
            remember: false,
            validEmail: true,
            validPassword: true,
            errors: [],
            message: '',
            loading: false
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
            validPassword: true
        }));
    }
    sendData = async () => {
        this.clearError();
        var isValid = true;

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
        if (!isValid){
            return;
        }

        this.setState({ 
            status: 'info', 
            message: 'Please wait until we authenticate you...',
            loading: true 
        });

        var data = {
            email: this.state.email, 
            password: this.state.password,
            remember: this.state.remember
        };
        try {
            let response = await axios.post('/api/auth/login', data);
            this.setState({ errors: AuthUIFunctions.handleResponse(response, '/app'), loading: false});
        } catch {
            this.setState({ errors: ['Some error occured during this request... please try again.'], 
                loading: false, status: ''});
        }
    }
    handleChange = (event) =>  {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({ [target.name]: value});
    }
    render(){
        return (
            <div className="d-flex flex-column h-100">
                <div className="inner-container">
                    <div className="form-container">
                    <div className="text-center mb-5 mt-5">
                        <img src="/static/media/logo.png" />
                    </div>
                    <div className="text-center mb-5 mt-5">
                        <h1>Please sign in</h1>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputEmail">Email address</label>
                        <input type="email" id="inputEmail" 
                            name="email"
                            onChange={this.handleChange} 
                            className={this.state.validEmail ? 'form-control' : 'form-control non-valid'} autoFocus />
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputPassword">Password</label>
                        <input type="password" id="inputPassword" 
                            name="password"
                            onChange={this.handleChange} 
                            className={this.state.validPassword ? 'form-control' : 'form-control non-valid'}  required  />
                    </div>
                    <div className="form-group">
                        <div className="checkbox mb-3">
                            <label>
                                <input type="checkbox" onChange={this.handleChange} name="remember" /> Remember me
                            </label>
                        </div>
                    </div>
                    <div className="text-center mb-5 mt-5">
                        <div className="col-md-12">
                            <button className="btn btn-lg btn-primary" onClick={this.sendData} >
                                {this.state.loading ? <Icon icon="circle-notch" className="fa-spin" size="xs" spin /> : ''}
                                Sign in
                            </button>
                        </div>
                    </div>
                    <div className="row text-center">
                        <p className="w-100">Don't have an account? Register <Link to="/auth/register">here</Link>.</p>
                    </div>
                </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-10 offset-md-1 col-sm-12">
                                <Alert status={this.state.status} message={this.state.message} />
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-10 offset-md-1 col-sm-12">
                                { this.state.errors.length ? <Alert status={'error'} message={this.state.errors} /> : null }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}