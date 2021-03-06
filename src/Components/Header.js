import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStickyNote, faBars, faSave, faTimes, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux';
import { userIsLogged, navIsOpen, createNote } from '../actions/items';
import { CSSTransition, transit } from 'react-css-transition'

library.add(faStickyNote, faBars, faSave, faTimes, faTimesCircle)

CSSTransition.childContextTypes = {
    // this can be empty
}

class Header extends Component {
    handleNotes = () => {
        if(this.props.openEditor){
            this.props.createNote(false);
        }else{
            this.props.createNote(true);
        }
    }

    render(){
        return(
            <CSSTransition
                defaultStyle={{ transform: "translate(0, 0)" }}
                enterStyle={{ transform: transit("translate(78%, 0)", 500, "ease-in-out") }}
                leaveStyle={{ transform: transit("translate(0, 0)", 500, "ease-in-out") }}
                activeStyle={{ transform: "translate(78%, 0)" }}
                active={this.props.opened}
                className="header"
            >
                <div>
                    <div className="left" onClick={() => this.props.isOpened(!this.props.opened)}>
                        <FontAwesomeIcon icon={!this.props.opened ? "bars" : "times"} />
                    </div>
                    <h3>Notes</h3>
                    <div 
                        className="right" 
                        style={{display: this.props.logged ? 'block' : 'none'}}
                        onClick={() => this.handleNotes()}
                    >
                        <FontAwesomeIcon icon={!this.props.openEditor ? "sticky-note" : "times-circle"} />
                    </div>
                </div>
            </CSSTransition>
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