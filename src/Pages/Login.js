import React, { Component } from 'react';
import '../Styles/style.css';
import { isAuthenticated, login } from '../actions/auth'
import { API_END } from '../actions/api';
import axios from 'axios'
import { Link } from "react-router-dom";

export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            password: '',
        }
    }

    handlerClick = () => {
        let { name, password } = this.state
        if (!isAuthenticated) {
            let request = { name: name, password: password }
            axios.post(API_END + 'login/login', request)
                .then(response => response.data)
                .then(response => login(response.access_token))
                .catch(err => console.log(err))
        }
    }

    render(){
        return(
            <div className="login-box">
                <h2>Login</h2>
                <input
                    type="text"
                    placeholder="name"
                    value={this.state.name}
                    onChange={e => this.setState({name: e.target.value})}
                /><br />
                <input
                    type="password"
                    placeholder="password"
                    value={this.state.password}
                    onChange={e => this.setState({password: e.target.value})}
                /><br />
                <Link to="/notes" onClick={() => this.handlerClick()}>Login</Link>
            </div>
        );
    }
}