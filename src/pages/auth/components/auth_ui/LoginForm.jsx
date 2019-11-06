import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AuthUIFunctions } from './AuthUIFunctions';
//import { httpService } from '@src/global/components/js/httpService'
import axios from 'axios';
export default class LoginForm extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            email: '',
            password: '',
            remember: false,
            validEmail: true,
            validPassword: true,
            errors: []
        };
        /*
        var methods = Object.getOwnPropertyNames(LoginForm.prototype);
        for (var i = 0; i <  methods.length; i++){
            LoginForm.prototype[methods[i]] = LoginForm.prototype[methods[i]].bind(this);
        }*/
        //this.handleClick = this.handleClick.bind(this);
    }
    addError = (error) => {
        this.setState(prevState => ({
            errors: [...prevState.errors, error]
        }));
    }
    sendData = async () => {
        this.setState({ errors: [] });
        this.setState({ validEmail: true });
        this.setState({ validPassword: true });

        if (!(this.state.password && this.state.email)){
            this.setState({ errors: ['Please enter both email and password.'] });
            if (!this.state.password){
                this.setState({ validPassword: false });
            }
            if (!this.state.email){
                this.setState({ validEmail: false });
            }
            return;
        }
        if (!AuthUIFunctions.validateEmail(this.state.email)){
            this.setState({ errors: ['Please enter a valid email.'] });
            return;
        }

        var data = {
            email: this.state.email, 
            password: this.state.password,
            remember: this.state.remember
        };
        try {
            let response = await axios.post('/api/login', data);
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
                <div className="row">
                    <label htmlFor="inputEmail">Email address</label>
                    <input type="email" id="inputEmail" 
                        name="email"
                        onChange={this.handleChange} 
                        className={this.state.validEmail ? 'form-control' : 'form-control non-valid'} autoFocus />
                </div>
                <div className="row">
                    <label htmlFor="inputPassword">Password</label>
                    <input type="password" id="inputPassword" 
                        name="password"
                        onChange={this.handleChange} 
                        className={this.state.validPassword ? 'form-control' : 'form-control non-valid'}  required  />
                </div>
                <div className="row">
                    <div className="checkbox mb-3">
                        <label>
                            <input type="checkbox" onChange={this.handleChange} /> Remember me
                        </label>
                    </div>
                </div>
                <div className="row">
                    <p className="text">Don't have an account? Register <Link to="/register">here</Link>.</p>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <button className="btn btn-lg btn-primary-dark btn-block" onClick={this.sendData} >Sign in</button>
                    </div>
                </div>
                { this.state.errors.length ? <ErrorMessage errors={this.state.errors} /> : null }
            </div>
        );
    }
}

function ErrorMessage(props){
    const errors = props.errors;
    const errorItems = errors.map((error) =>
      <div  key={error}>
        {error}
      </div>
    );
    return (
        <div className="alert alert-danger">
            {errorItems}     
        </div>
    );
}