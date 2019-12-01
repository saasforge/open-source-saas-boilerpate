import React, { Component } from 'react';
import { Link, useParams} from 'react-router-dom';
import axios from 'axios';

import { AuthUIFunctions } from './AuthUIFunctions';
import Alert from '@src/components/alert/Alert';

export default class ConfirmationPage extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            errors: []
        };
    }
    confirm = async()=> {
        try {
            let response = await axios.get(`/api/auth/confirm/${this.token}/${this.userId}`);
            this.setState({ errors: AuthUIFunctions.handleResponse(response) });
        } catch {
            this.setState({ errors: ['Some error occured during this request... please try again.'] });
        }
    }
    componentDidMount(){
        this.confirm();
    }
    render(){
        this.userId = this.props.match.params.userid;
        this.token = this.props.match.params.token;
        return (
            <div className="form-container">
                <div className="text-center mb-5 mt-5">
                    <img src="/static/media/logo.png" />
                </div>
                <div className="text-center mb-5 mt-5">
                    <h1>Confirming your email...</h1>
                </div>
                <div className="row text-center">
                    <div className="col-md-10 offset-md-1">
                        <div>Please wait until we finish the confirmation proces...
                        </div>
                    </div>
                    <div className="col-md-6 offset-md-3">
                        { this.state.errors.length ? <Alert status={'error'} message={this.state.errors} /> : null }
                    </div>
                </div>
            </div>
        );
    }
}