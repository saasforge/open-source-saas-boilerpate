import React, { Component } from 'react';
import { Link, useParams} from 'react-router-dom';
import axios from 'axios';

import { AuthUIFunctions } from './AuthUIFunctions';
import Alert from '@src/components/alert/Alert';

export default class ConfirmationPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: [], 
            title: 'Confirming your email...',
            confirmed: false,
            text: ''
        };
    }
    confirm = async()=> {
        try {
            let response = await axios.get(`/api/auth/confirm/${this.token}/${this.userId}`);
            this.setState({ errors: AuthUIFunctions.handleResponse(response) });
            if (response.data.result){
                this.setState({ title: 'Thanks for the confirmation!', confirmed: true});
                setTimeout(()=>window.location.href = '/auth/login', 5000);
            }
        } catch {
            this.setState({ errors: ['Some error occured during this request... please try again.'] });
        }
    }
    componentDidMount(){
        this.confirm();
    }
    renderTextBlock(){
        if (!this.state.confirmed){
            return (<span>Please wait until we finish the confirmation process...</span>)
        } else {
            return ( 
                <div>                 
                    <p className="w-100">
                        You email is confirmed. If you are not automatically redirected in 5 seconds please use the 
                        following link to 
                    </p>
                    <Link to={'/auth/login/'} className="w-100">the login page</Link>
                </div>  
            );
        }
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
                    <h1>{this.state.title}</h1>
                </div>
                <div className="row text-center">
                    <div className="col-md-10 offset-md-1">
                        {this.renderTextBlock()}
                    </div>
                    <div className="col-md-6 offset-md-3">
                        { this.state.errors.length ? <Alert status={'error'} message={this.state.errors} /> : null }
                    </div>
                </div>
            </div>
        );
    }
}