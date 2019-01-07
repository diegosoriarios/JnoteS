import React, { Component } from 'react';

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
            <div>
                <input
                    type="text"
                    placeholder="username"
                    value={this.state.username}
                    onChange={e => this.setState({username: e.target.value})}
                /><br />
                <input
                    type="password"
                    value={this.state.password}
                    onChange={e => this.setState({password: e.target.value})}
                /><br />
                <button onClick={() => this.handlerClick()}>Login</button>
            </div>
        );
    }
}