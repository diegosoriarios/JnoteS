import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userIsLogged, signUpUser } from '../actions/items';
import axios from 'axios';
import string from '../String';
import Login from './Login';
import Notes from './Notes';
import SignUp from './SignUp';

class Home extends Component{
    constructor(){
        super();
        this.state = {
            user: [],
            id: 0,
        }
        this.checkLogin = this.checkLogin.bind(this);
    }
    
    componentDidMount = () => {
        axios.get(`${string.URL}/login`)
            .then(response => {
                response.data.forEach((value) => {
                    this.setState({
                        user: this.state.user.concat(value),
                    })
                })
            })
            .catch(function (error) {
                console.log(error);
            })
        if(localStorage.getItem('logged') !== null){
            this.props.isLogged(true);
            this.setState({
                id: JSON.parse(localStorage.getItem('logged'))
            })
        }
    }

    checkLogin = (username, password) => {
        this.state.user.forEach((value) => {
            if(value.name === username){
                if(value.password === password){
                    this.setState({
                        id: value.id
                    })
                    this.props.isLogged(true);
                    localStorage.setItem('logged', JSON.stringify(value.id))
                }
            }
        })
    }

    render(){
        if(!this.props.logged) {
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