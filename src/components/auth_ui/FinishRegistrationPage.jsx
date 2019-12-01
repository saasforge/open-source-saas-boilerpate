import React, { Component } from 'react';
import { Link, useParams} from 'react-router-dom';
import axios from 'axios';

import { AuthUIFunctions } from './AuthUIFunctions';
import Alert from '@src/components/alert/Alert';

export default class FinishRegistrationPage extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            errors: []
        };
    }
    resendConfirm = async (e) => {
        e.stopPropagation();
        try {
            let response = await axios.get('/api/auth/resendconfirm/' + this.userId);
            this.setState({ errors: AuthUIFunctions.handleResponse(response) });
        } catch {
            this.setState({ errors: ['Some error occured during this request... please try again.'] });
        }
    }
    render(){
        this.userId = this.props.match.params.userid
        return (
            <div className="form-container">
                <div className="text-center mb-5 mt-5">
                    <img src="/static/media/logo.png" />
                </div>
                <div className="text-center mb-5 mt-5">
                    <h1>Please confrim your email</h1>
                </div>
                <div className="row text-center">
                    <div className="col-md-12 col-sm-10">
                        <p>Thanks for the registration! We've sent you email to be confirmed.</p>
                        <p>If for some reason you didn't get a confirmation email please&nbsp;</p>
                        <p>
                            <Link to="#" onClick={(e)=>this.resendConfirm(e)}>resend it</Link>
                            </p>
                    </div>
                    <div className="col-lg-6 offset-lg-3 col-md-10 offset-md-1 col-sm-10 offset-sm-12">
                        { this.state.errors.length ? <Alert status={'error'} message={this.state.errors} /> : null }
                    </div>
                </div>
            </div>
        );
    }
}