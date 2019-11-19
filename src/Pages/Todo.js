import React, { Component } from 'react'
import DatePicker from '../Components/DatePicker';
import "../Styles/Todo.css"
import { CSSTransition, transit } from 'react-css-transition'
import { connect } from 'react-redux';
import { userIsLogged, navIsOpen, createNote } from '../actions/items';
import Modal from 'react-modal'

class Todo extends Component {
    state = {
        list: [
            {text: 'Terminar esse projeto', data: '6-11-2019', finished: false},
        ],
        day: '',
        showModal: false
    }

    done = index => {
        let item = [...this.state.list]
        item[index].finished = !item[index].finished

        this.setState({list: item})
    }

    edit = index => {

    }

    remove = index => {

    }

    renderList = () => {
        if(this.state.list.length > 0) {
            return this.state.list.map(({text, data, finished}, i) => {
                if(data === this.state.day) {
                    return (
                        <div key={i} className="list-item list-group-item d-flex justify-content-between align-items-center">
                            <h2 className="list-item-text" 
                                style={{textDecoration: !finished ? 'none' : 'line-through' }}
                                onClick={() => this.done(i)}>{text}</h2>
                            <span className="badge badge-dark badge-pill">✎</span>
                            <span className="badge badge-dark badge-pill">☓</span>
                        </div>
                    )
                } else return null
            })
        } else {
            return <p>Nenhuma lista pra esse dia</p>
        }
    }

    filterList = filter => {
        this.setState({
            day: `${filter.getDate()}-${filter.getMonth()+1}-${filter.getFullYear()}`
        }, () => console.log(this.state.day ))
    }

    render() {
        if (this.state.showModal) {
            return (
                <Modal
                    isOpen={this.state.modal}
                    onRequestClose={this.closeModal}
                    contentLabel="Example Modal"
                    className="modal"
                >
                    <input type="text" />
                </Modal>
            )
        } else {
            return(
                <div className="App">
                    <CSSTransition
                        defaultStyle={{ transform: "scale(.7)"}}
                        enterStyle={{ transform: transit("scale(1)", 200, "ease-in-out") }}
                        leaveStyle={{ transform: transit("scale(0.7)", 500, "ease-in-out")}}
                        activeStyle={{ transform: "scale(1)"}}
                        active={!this.props.opened}
                    >
                    <CSSTransition
                        defaultStyle={{ transform: "translate(90%, 0)"}}
                        enterStyle={{ transform: transit("translate(0, 0)", 500, "ease-in-out") }}
                        leaveStyle={{ transform: transit("translate(90%, 0)", 500, "ease-in-out")}}
                        activeStyle={{ transform: "translate(0, 0)"}}
                        active={!this.props.opened}
                    >
                    <div>
                    
                        <DatePicker filterList={this.filterList} />
                    
                        <div className="currentList list-group">
                            {this.renderList()}
                        </div>

                        <div className="xyz">
                            <button type="button" className="btn btn-dark btn-circle btn-xl">+</button> 
                            <button type="button" className="btn btn-primary btn-circle btn-xl">Edit</button>
                        </div>
                    </div></CSSTransition></CSSTransition>
                </div>
            )
        }
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(Todo);