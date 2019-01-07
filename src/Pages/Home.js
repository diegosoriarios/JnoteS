import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userIsLogged } from '../actions/items';
import axios from 'axios';
import string from '../String';
import Login from './Login';
import Notes from './Notes';

class Home extends Component{
    constructor(){
        super();
        this.state = {
            user: []
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
    }

    checkLogin = (username, password) => {
        console.log(this.props.isLogged(true))
        this.state.user.forEach((value) => {
            if(value.name === username){
                if(value.password === password){
                    return userIsLogged(false);
                }
            }
        })
    }

    render(){
        if(!this.props.logged) {
            return  (
                <div>
                    <Login check={this.checkLogin} />
                </div>
            );
        } else {
            return  <Notes />
        }
    }
}

const mapStateToProps = (state) => {
    return {
        logged: state.userIsLogged,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        isLogged: (bool) => dispatch(userIsLogged(bool))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);