import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStickyNote, faBars, faSave } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux';
import { userIsLogged, navIsOpen, createNote } from '../actions/items';

library.add(faStickyNote, faBars, faSave)

class Header extends Component {
    handleNotes = () => {
        this.props.createNote(true);
    }

    render(){
        return(
            <div className="header" style={{left: !this.props.opened ? '0' : '50%'}}>
                <div className="left" onClick={() => this.props.isOpened(!this.props.opened)}><FontAwesomeIcon icon="bars" /></div>
                <h3>Notes</h3>
                <div 
                    className="right" 
                    style={{display: this.props.logged ? 'block' : 'none'}}
                    onClick={() => this.handleNotes()}
                >
                    <FontAwesomeIcon icon={!this.props.opened ? "sticky-note" : "save"} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        logged: state.userIsLogged,
        opened: state.navIsOpen,
        openEditor: state.createNote
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        isLogged: (bool) => dispatch(userIsLogged(bool)),
        isOpened: (bool) => dispatch(navIsOpen(bool)),
        createNote: (bool) => dispatch(createNote(bool))
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Header);