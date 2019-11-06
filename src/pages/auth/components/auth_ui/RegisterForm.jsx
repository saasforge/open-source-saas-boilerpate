import React from 'react';
import { Link } from 'react-router-dom';
import AuthUIFunctions from './AuthUIFunctions';

export default function RegisterForm () {
    return (
        <div>
            <div className="row md-form">
                <label htmlFor="inputUserName">User name (visible by others)</label>
                <input type="text" id="inputUserName" 
                    className={this.state.validEmail ? 'form-control' : 'form-control non-valid'} 
                    autoFocus />
            </div>

            <div className="row md-form">
                <label htmlFor="inputEmail">Email address</label>
                <input type="email" id="inputEmail" 
                    className={this.state.validEmail ? 'form-control' : 'form-control non-valid'} />
            </div>

            <div className="row md-form">
                <label htmlFor="inputPassword">Password</label>
                <input type="password" id="inputPassword" 
                    className={this.state.validEmail ? 'form-control' : 'form-control non-valid'} />
            </div>

            <div className="row md-form">
                <label htmlFor="inputPassword">Confirm password</label>
                <input type="password" id="inputPassword2" 
                    className={this.state.validEmail ? 'form-control' : 'form-control non-valid'} />
            </div>

            <div className="row md-form">
                <p className="text">Already have an account? Sign in <Link to="/login">here</Link>.</p>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <button className="btn btn-lg btn-primary-dark btn-block">Create account</button>
                </div>
            </div>
        </div>
    );
}