import React, { Component } from "react";
import Home from './Pages/Home';
import Todo from './Pages/Todo';
import { connect } from 'react-redux';
import { userIsLogged, navIsOpen, signUpUser } from './actions/items';
import { isAuthenticated, logout as auth_logout } from './actions/auth'
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";
import './Styles/style.css';
import Header from "./Components/Header";
import { CSSTransition, transit } from 'react-css-transition'
import axios from 'axios'
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Notes from './Pages/Notes';

function Logout() {
  auth_logout()
  return <Login />;
}

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}
class App extends Component {

  componentDidMount() {
    document.body.style = "background: black"
  }

  showNav = () => this.props.isOpened(!this.props.opened)
  handleLoginStatus = () => {this.props.isOpened(!this.props.opened); this.props.signUp(false)}

  render(){
    let location = window.location.pathname;
    let loginStatus;
    
    if(isAuthenticated){
      loginStatus = 
        <Link to="/logout" onClick={() => auth_logout()} className="list-group-item">
          Logout
        </Link>
    }else{ 
      loginStatus = 
        <Link to="/login" className="list-group-item" onClick={() => this.handleLoginStatus()}>Login</Link>
    }                                     
    
    return(
      <Router>
        <div>
        <CSSTransition
          defaultStyle={{ transform: "translate(-101%, 0)" }}
          enterStyle={{ transform: transit("translate(0, 0)", 500, "ease-in-out") }}
          leaveStyle={{ transform: transit("translate(-101%, 0)", 500, "ease-in-out") }}
          activeStyle={{ transform: "translate(0, 0)" }}
          active={this.props.opened}
          className="navigator" style={{width: '80%'}}
        >
          <nav>
            <div className="nav-top">
              <img src="https://api.adorable.io/avatars/400/abott@adorable.io.png" alt="avatar" className="avatar-img" />
              <h2>{ /*{'nome'} || */"Diego"}</h2>
            </div>
            <div className="list-group">
              <Link to="/"        className={`list-group-item ${location === '/notes' && !isAuthenticated ? 'active' : ''}`} onClick={() => {this.props.isOpened(!this.props.opened); this.props.signUp(false)}}>Home</Link>
              {//<Link to="/about/"  className={`list-group-item ${location === '/about/' ? 'active' : ''}`} onClick={() => this.props.isOpened(!this.props.opened)}>About</Link>
    }
              <Link to="/todo/"   className={`list-group-item ${location === '/todo/' ? 'active' : ''}`} onClick={() => this.props.isOpened(!this.props.opened)}>To-do</Link>
              {//<Link to="/users/"  className={`list-group-item ${location === '/users/' ? 'active' : ''}`} onClick={() => this.props.isOpened(!this.props.opened)} >Users</Link>
  }
              {loginStatus}
              <Link to="/"        className={`list-group-item ${location === '/signup' && !isAuthenticated && !this.props.sign ? 'active' : ''}`} onClick={() => {this.props.isOpened(!this.props.opened); this.props.signUp(true)}}>Sign Up</Link>
            </div>
          </nav>
        </CSSTransition>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
            <PrivateRoute path="/notes">
              <Notes />
            </PrivateRoute>
            <PrivateRoute path="/">
              <Notes />
            </PrivateRoute>
            <PrivateRoute path="/todo">
              <Todo />
            </PrivateRoute>
            <Route path="/logout">
              <Logout />
            </Route>
          </Switch>
          <Header />
        </div>
      </Router>
    );
  }
};

const mapStateToProps = (state) => {
  return {
      logged: state.userIsLogged,
      opened: state.navIsOpen,
      sign: state.signUpUser
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      isLogged: (bool) => dispatch(userIsLogged(bool)),
      isOpened: (bool) => dispatch(navIsOpen(bool)),
      signUp: (bool) => dispatch(signUpUser(bool))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);