import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userIsLogged, signUpUser } from '../actions/items';
import axios from 'axios';
import string from '../String';
import Login from './Login';
import Notes from './Notes';
import SignUp from './SignUp';
import { isAuthenticated, login } from '../actions/auth'
import { API_END } from '../actions/api';

class Home extends Component{
    constructor(){
        super();
        this.state = {
            user: [],
            id: 0,
        }
        this.checkLogin = this.checkLogin.bind(this);
    }

    checkLogin = (name, password) => {
        if (!isAuthenticated) {
            let request = { name: name, password: password }
            axios.post(API_END + 'login/login', request)
                .then(response => response.data)
                .then(response => login(response.access_token))
                .catch(err => console.log(err))
        }
    }

    render(){
        if(!isAuthenticated) {
            if(this.props.sign){
                return (
                    <div className="App">
                        <SignUp />
                    </div>
                );
            }else{
                return  (
                    <div className="App">
                        <Login check={this.checkLogin} />
                    </div>
                );
            }
        } else {
            return  <Notes id={this.state.id} />
        }
    }
}

const mapStateToProps = (state) => {
    return {
        logged: state.userIsLogged,
        sign: state.signUpUser
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        isLogged: (bool) => dispatch(userIsLogged(bool)),
        signUp: (bool) => dispatch(signUpUser(bool))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);