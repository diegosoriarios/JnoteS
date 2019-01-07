import React, { Component } from "react";
import Home from './Pages/Home';
import { connect } from 'react-redux';
import { userIsLogged, navIsOpen } from './actions/items';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import './Styles/style.css';
import Header from "./Components/Header";

const About = () => <h2>About</h2>;
const Users = () => <h2>Users</h2>;

class App extends Component {
  showNav = () => {
    this.props.isOpened(!this.props.opened);
  }

  loginStatusClick = () => {
    this.props.isOpened(!this.props.opened)
  }

  render(){
    let loginStatus;
    if(this.props.logged){
      loginStatus = <Link to="/" onClick={dispatch => {dispatch(userIsLogged(false)); this.loginStatusClick()}}>Logout</Link>
    }else{ 
      loginStatus = <Link to="/" onClick={() => this.props.isOpened(!this.props.opened)}>Login</Link>
    }                                     
    return(
      <Router>
        <div>
          <nav className="navigator" style={{left: !this.props.opened ? '-50%' : '0'}}>
          <img src='https://images.freeimages.com/images/large-previews/63d/typo-8-1468401.jpg' alt='type' />
            <ul>
              <li>
                <Link to="/" onClick={() => this.props.isOpened(!this.props.opened)}>Home</Link>
              </li>
              <li>
                <Link to="/about/" onClick={() => this.props.isOpened(!this.props.opened)}>About</Link>
              </li>
              <li>
                <Link to="/users/" onClick={() => this.props.isOpened(!this.props.opened)}>Users</Link>
              </li>
              <li>
                {loginStatus}
              </li>
              <li style={{display: !this.props.logged ? 'block' : 'none'}}>
                <Link to="/signup/" onClick={() => this.props.isOpened(!this.props.opened)}>Sign Up</Link>
              </li>
            </ul>
          </nav>
          <Route path="/" exact component={Home} />
          <Route path="/about/" component={About} />
          <Route path="/users/" component={Users} />
          <Route path="/signup/" component={SignUp} />
          <Header />
        </div>
      </Router>
    );
  }
};

const mapStateToProps = (state) => {
  return {
      logged: state.userIsLogged,
      opened: state.navIsOpen
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      isLogged: (bool) => dispatch(userIsLogged(bool)),
      isOpened: (bool) => dispatch(navIsOpen(bool))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);