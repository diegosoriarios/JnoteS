import React, { Component } from 'react';
import string from '../String';
import axios from 'axios';
import '../Styles/Notes.css'
import { connect } from 'react-redux';
import { userIsLogged, navIsOpen, createNote } from '../actions/items';
import Modal from 'react-modal';
import { CSSTransition, transit } from 'react-css-transition'
import { API_END } from '../actions/api'

CSSTransition.childContextTypes = {
    // this can be empty
}

class Notes extends Component{
    constructor(){
        super()
        this.state = {
            notas: [],
            create: false,
            text: '',
            postId: '',
            edit: false,
            modal: false,
            title: 'Title',
            color: '#ffffff',
            createdAt: ''
        };
    }

    componentDidMount = () => {
        this.getNotes();
        Modal.setAppElement('#root')
    }

    getNotes = () => {
        axios.get(API_END + 'notes/get')
            .then(response => {
                response.data.forEach((value) => {
                    this.setState({
                       notas: this.state.notas.concat(value),
                    })
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    renderNotas = () => {
        return this.state.notas.map((value, i) => {
            //let date = value.createdAt.split('T');
            //date = date[0].split('-')
            let date = value.createdAt
            return (
                <div className="note-card" key={i} style={{zIndex: 1}}>
                    <div className="toast-header">
                        <input type="color" />
                        <div className="mr-auto">
                                {value.title}
                        </div>
                        <small>{date}</small>
                        <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close" onClick={() => this.editNote(value)}>
                            <span aria-hidden="true">✎</span>
                        </button>
                        <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close" onClick={() => this.handleModal(value)}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="toast-body">
                        {value.texto}
                    </div>
                </div>
            );
        })
    }

    saveNote = () => {
        if(this.state.edit){
            this.updateNote()
        }else{
            let date = new Date();
            axios.post(API_END + 'notes/get', {
                texto: this.state.text,
                createdAt: date,
                loginId: this.props.id
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
            this.setState({
                notas: [],
                text: ''
            }, () => {
                this.props.createNote(false)
                this.getNotes();
            })
        }
    }

    editNote = i => {
        this.setState({
            text: i.texto,
            postId: i.id,
            edit: true
        })
        this.props.createNote(true);
    }

    updateNote = () => {
        let date = new Date()
        axios.put(API_END + 'notes/get', {
            texto: this.state.text,
            createdAt: date,
            loginId: this.props.id
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
        this.setState({
            notas: []
        }, () => {
            this.props.createNote(false)
            this.getNotes();
        })
    }

    handleModal = (i = '') => {
        this.setState({
            modal: true,
            postId: i.id
        })
    }

    deleteNote = () => {
        console.log(this.state.postId)
        axios.delete(API_END + 'notes/get')
          .then(function (response) {
            console.log(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
        this.setState({
            notas: [],
            modal: false,
        }, () => {
            this.props.createNote(false)
            this.getNotes();
        })
    }

    render(){
        const { title, text } = this.state
        const newDate = new Date()
        if(this.props.openEditor){
            return (
                <div className="notes App">
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
                    <div className="note-card">
                        <div className="toast-header">
                            <input type="color" />
                            <div className="mr-auto" contentEditable="true" 
                                suppressContentEditableWarning={true}
                                value={title}
                                onInput={e => this.setState({title: e.target.value})}>
                                {title}
                            </div>
                            <small>{newDate.getDate()} - {newDate.getMonth()} - {newDate.getFullYear()}</small>
                            <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close" onClick={() => this.editNote('ok')}>
                                <span aria-hidden="true">✎</span>
                            </button>
                            <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close" onClick={() => this.handleModal('ok')}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="toast-body" 
                            contentEditable="true" 
                            suppressContentEditableWarning={true}
                            value={text}
                            onInput={e => this.setState({text: e.target.value})}
                            >
                            {text}
                        </div>
                </div>
                </CSSTransition></CSSTransition>
            </div>
            )
        }else{
            return(
                <div>
                    <Modal
                        isOpen={this.state.modal}
                        onRequestClose={this.closeModal}
                        contentLabel="Example Modal"
                        className="modal"
                    >
                        <p>Deletar?</p>
                        <button onClick={() => this.deleteNote()}>Sim</button>
                        <button onClick={() => this.setState({modal: false})}>Não</button>
                    </Modal>
                    <CSSTransition
                        defaultStyle={{ transform: "scale(.7)"}}
                        enterStyle={{ transform: transit("scale(1)", 200, "ease-in-out") }}
                        leaveStyle={{ transform: transit("scale(0.7)", 500, "ease-in-out")}}
                        activeStyle={{ transform: "scale(1)"}}
                        active={!this.props.opened}
                    >
                        <CSSTransition
                        defaultStyle={{ transform: "translate(80%, 0)"}}
                        enterStyle={{ transform: transit("translate(0, 0)", 500, "ease-in-out") }}
                        leaveStyle={{ transform: transit("translate(80%, 0)", 500, "ease-in-out")}}
                        activeStyle={{ transform: "translate(0, 0)"}}
                        active={!this.props.opened}
                    >   
                            <div className="notes App">
                                {this.renderNotas()}
                            </div>
                        </CSSTransition>
                    </CSSTransition>
                </div>
            );
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(Notes);