import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './Pages/Home';
import { connect } from 'react-redux';
import { userIsLogged } from './actions/items';

const About = () => <h2>About</h2>;
const Users = () => <h2>Users</h2>;

class App extends Component {
  render(){
    return(
      <Router>
        <div>
          <nav>
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
                <Link to="/" onClick={dispatch => {dispatch(userIsLogged(false))}}>Logout</Link>
              </li>
            </ul>
          </nav>

          <Route path="/" exact component={Home} />
          <Route path="/about/" component={About} />
          <Route path="/users/" component={Users} />
        </div>
      </Router>
    );
  }
};

const mapStateToProps = (state) => {
  return {
      isLogged: state.userIsLogged    
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      isLogged: (bool) => dispatch(userIsLogged(bool))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);