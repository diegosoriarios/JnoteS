import React, { Component } from "react";
import Home from './Pages/Home';
import { connect } from 'react-redux';
import { userIsLogged, navIsOpen, signUpUser } from './actions/items';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './Styles/style.css';
import Header from "./Components/Header";
import { CSSTransition, transit } from 'react-css-transition'

const About = () => <h2>About</h2>;
const Users = () => <h2>Users</h2>;

class App extends Component {
  showNav = () => {
    this.props.isOpened(!this.props.opened);
  }

  loginStatusClick = (dispatch) => {
    localStorage.removeItem('logged');
    this.props.isOpened(!this.props.opened)
    dispatch(userIsLogged(false));
  }

  render(){
    let location = window.location.pathname;
    let loginStatus;
    if(this.props.logged){
      loginStatus = 
        <Link 
          to="/" 
          onClick={dispatch => this.loginStatusClick(dispatch)}
        >
          Logout
        </Link>
    }else{ 
      loginStatus = 
        <Link to="/" onClick={() => {this.props.isOpened(!this.props.opened); this.props.signUp(false)}}>Login</Link>
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
          className="navigator" style={{width: '50%'}}
        >
          <nav>
          <img src='https://images.freeimages.com/images/large-previews/63d/typo-8-1468401.jpg' alt='type' />
            <ul>
              <li className={location === '/' && this.props.logged ? 'selected' : ''} >
                <Link to="/" onClick={() => {this.props.isOpened(!this.props.opened); this.props.signUp(false)}}>Home</Link>
              </li>
              <li className={location === '/about/' ? 'selected' : ''} >
                <Link to="/about/" onClick={() => this.props.isOpened(!this.props.opened)}>About</Link>
              </li>
              <li className={location === '/users/' ? 'selected' : ''}>
                <Link to="/users/" onClick={() => this.props.isOpened(!this.props.opened)}>Users</Link>
              </li>
              <li className={location === '/' && !this.props.logged ? 'selected' : ''}>
                {loginStatus}
              </li>
              <li style={{display: !this.props.logged ? 'block' : 'none'}}>
                <Link to="/" onClick={() => {this.props.isOpened(!this.props.opened); this.props.signUp(true)}}>Sign Up</Link>
              </li>
            </ul>
          </nav>
        </CSSTransition>
          <Route path="/" exact component={Home} />
          <Route path="/about/" component={About} />
          <Route path="/users/" component={Users} />
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