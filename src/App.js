import React, { Component } from "react";
import Home from './Pages/Home';
import { connect } from 'react-redux';
import { userIsLogged, navIsOpen } from './actions/items';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import './Styles/style.css';

const About = () => <h2>About</h2>;
const Users = () => <h2>Users</h2>;

class App extends Component {
  showNav = () => {
    this.props.isOpened(!this.props.opened);
  }

  render(){
    let loginStatus;
    if(this.props.logged){
      loginStatus = <Link to="/" onClick={dispatch => {dispatch(userIsLogged(false))}}>Logout</Link>
    }else{ 
      loginStatus = <Link to="/">Login</Link>
    }                                     
    return(
      <Router>
        <div>
          <nav className="navigator" style={{left: !this.props.opened ? '-50%' : '0'}}>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about/">About</Link>
              </li>
              <li>
                <Link to="/users/">Users</Link>
              </li>
              <li>
                {loginStatus}
              </li>
              <li>
                <Link to="/signup/">Sign Up</Link>
              </li>
            </ul>
          </nav>
          <Route path="/" exact component={Home} />
          <Route path="/about/" component={About} />
          <Route path="/users/" component={Users} />
          <Route path="/signup/" component={SignUp} />
          <div style={{float: 'right'}} onClick={() => this.showNav()}>Xasfas</div>
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