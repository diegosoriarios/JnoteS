import React, { Component } from "react";
import Home from './Pages/Home';
import Todo from './Pages/Todo';
import { connect } from 'react-redux';
import { userIsLogged, navIsOpen, signUpUser } from './actions/items';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './Styles/style.css';
import Header from "./Components/Header";
import { CSSTransition, transit } from 'react-css-transition'

const About = () => <h2>About</h2>;
const Users = () => <h2>Users</h2>;

class App extends Component {

  componentDidMount() {
    document.body.style = "background: black"
  }

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
          className="list-group-item"
        >
          Logout
        </Link>
    }else{ 
      loginStatus = 
        <Link to="/" className="list-group-item" onClick={() => {this.props.isOpened(!this.props.opened); this.props.signUp(false)}}>Login</Link>
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
              <Link to="/"        className={`list-group-item ${location === '/' && this.props.logged ? 'active' : ''}`} onClick={() => {this.props.isOpened(!this.props.opened); this.props.signUp(false)}}>Home</Link>
              <Link to="/about/"  className={`list-group-item ${location === '/about/' ? 'active' : ''}`} onClick={() => this.props.isOpened(!this.props.opened)}>About</Link>
              <Link to="/todo/"   className={`list-group-item ${location === '/todo/' ? 'active' : ''}`} onClick={() => this.props.isOpened(!this.props.opened)}>To-do</Link>
              <Link to="/users/"  className={`list-group-item ${location === '/users/' ? 'active' : ''}`} onClick={() => this.props.isOpened(!this.props.opened)} >Users</Link>
              {loginStatus}
              <Link to="/"        className={`list-group-item ${location === '/' && !this.props.logged && !this.props.sign ? 'active' : ''}`} onClick={() => {this.props.isOpened(!this.props.opened); this.props.signUp(true)}}>Sign Up</Link>
              {/*<li className={location === '/' && this.props.logged ? 'selected' : 'notSelected'} >
                <Link to="/" onClick={() => {this.props.isOpened(!this.props.opened); this.props.signUp(false)}}>Home</Link>
              </li>
              <li className={location === '/about/' ? 'selected' : 'notSelected'} >
                <Link to="/about/" onClick={() => this.props.isOpened(!this.props.opened)}>About</Link>
              </li>
              <li className={location === '/todo/' ? 'selected' : 'notSelected'}>
                <Link to="/todo/" onClick={() => this.props.isOpened(!this.props.opened)}>To-do</Link>
              </li>
              <li className={location === '/todo/' ? 'selected' : 'notSelected'}>
                <Link to="/users/" onClick={() => this.props.isOpened(!this.props.opened)} >Users</Link>
              </li>
              <li className={location === '/' && !this.props.logged && !this.props.sign ? 'selected' : 'notSelected'}>
                {loginStatus}
              </li>
              <li 
                style={{display: !this.props.logged ? 'block' : 'none'}} 
                className={location === '/' && this.props.sign ? 'selected' : 'notSelected'}

              >
                <Link to="/" onClick={() => {this.props.isOpened(!this.props.opened); this.props.signUp(true)}}>Sign Up</Link>
            </li>*/}
            </div>
          </nav>
        </CSSTransition>
          <Route path="/" exact component={Home} />
          <Route path="/about/" component={About} />
          <Route path="/users/" component={Users} />
          <Route path="/todo/" component={Todo} />
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