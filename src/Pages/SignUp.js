import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import axios from 'axios';
import string from '../String';
import Home from './Home';

class SignUp extends Component {
    constructor(){
        super();
        this.state = {
            username: '',
            password: '',
            passwordConfirmation: '',
        }
    }

    register = () => {
        let date = new Date();
        axios.post(`${string.URL}/login`, {
            name: this.state.username,
            createdAt: date,
            password: this.state.password,
          })
          .then(function (response) {
            console.log(response);
          }, () => {
            return <BrowserRouter>
                <Route 
                path='/'
                render={ props => <Home {...props} />}
                />
            </BrowserRouter>
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    checkPassword = () => {
        if(this.state.password !== this.state.passwordConfirmation || this.state.password.length === 0){
            return true;
        }
        return false;
    }

    render(){
        return (
            <div className="login-box App">
                <h2>Sign Up</h2>
                <input
                    type="text"
                    placeholder="username"
                    value={this.state.username}
                    onChange={e => this.setState({username: e.target.value})}
                /><br />
                <input
                    type="password"
                    placeholder="password"
                    value={this.state.password}
                    onChange={e => this.setState({password: e.target.value})}
                /><br />
                <input 
                    type="password"
                    placeholder="repeat password"
                    value={this.state.passwordConfirmation}
                    onChange={e => this.setState({passwordConfirmation: e.target.value})}
                /><br />
                <button onClick={() => this.register()} disabled={this.checkPassword()}>Register</button>
            </div>
        );
    }
}

export default SignUp;