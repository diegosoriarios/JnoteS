import React, { Component } from 'react';
import '../Styles/style.css';

export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
        }
    }

    handlerClick = () => {
        this.props.check(this.state.username, this.state.password);
    }

    render(){
        return(
            <div className="login-box">
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
                <button onClick={() => this.handlerClick()}>Login</button>
            </div>
        );
    }
}