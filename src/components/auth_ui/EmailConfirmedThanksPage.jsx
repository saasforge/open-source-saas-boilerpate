import React, { Component } from 'react';
import { Link, useParams} from 'react-router-dom';

export default class EmailConfirmedThanksPage extends Component {
    render(){
        setTimeout(()=>window.location.href = '/auth/login', 5000);
        return (
            <div className="form-container">
                <div className="text-center mb-5 mt-5">
                    <img src="/static/media/logo.png" />
                </div>
                <div className="text-center mb-5 mt-5">
                    <h1>Thanks for the email confirmation</h1>
                </div>
                <div className="row text-center">
                    <div className="w-100">
                        If you are not automatically redirected in 5 seconds please use the 
                        following link to 
                    </div>
                    <Link to={'/auth/login/' + this.userId} className="w-100">the login page</Link>
                </div>
            </div>
        );
    }
}