import React, { Component } from 'react';
import string from '../String';
import axios from 'axios';
import '../Styles/style.css';
import { connect } from 'react-redux';
import { userIsLogged, navIsOpen, createNote } from '../actions/items';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
import { CSSTransition, transit } from 'react-css-transition';
import Modal from 'react-modal';

library.add(faSave, faTrash)

class Notes extends Component{
    constructor(){
        super()
        this.state = {
            notas: [],
            create: false,
            text: '',
            postId: '',
            edit: false,
            modal: false
        };
    }

    componentDidMount = () => {
        this.getNotes();
        Modal.setAppElement('#root')
    }

    getNotes = () => {
        axios.get(`${string.URL}/login/${this.props.id}/notes`)
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
            let date = value.createdAt.split('T');
            date = date[0].split('-')
            return (
                <li key={i}>
                    <div onClick={() => this.editNote(value)}>
                        <p>{value.texto}</p>
                        <p>{`${date[2]}/${date[1]}/${date[0]}`}</p>
                    </div>
                    <button onClick={() => this.handleModal(value)} className="delete"><FontAwesomeIcon icon="trash" /></button>
                </li>
            );
        })
    }

    saveNote = () => {
        if(this.state.edit){
            this.updateNote()
        }else{
            let date = new Date();
            axios.post(`${string.URL}/login/${this.props.id}/notes`, {
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
        axios.put(`${string.URL}/notes/${this.state.postId}`, {
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
        axios.delete(`${string.URL}/notes/${this.state.postId}`)
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
        if(this.props.openEditor){
            return (
                <div className="App">
                    <CSSTransition
                        defaultStyle={{ transform: "translate(0, 0)" }}
                        enterStyle={{ transform: transit("translate(1000%, 0)", 500, "ease-in-out") }}
                        leaveStyle={{ transform: transit("translate(0, 0)", 500, "ease-in-out") }}
                        activeStyle={{ transform: "translate(1000%, 0)" }}
                        active={this.props.opened}
                        className="saveNote" 
                        onClick={() => this.saveNote()}
                    >
                        <FontAwesomeIcon icon="save" />
                    </CSSTransition>
                    <textarea
                        value={this.state.text}
                        onChange={e => this.setState({text: e.target.value})}
                        placeholder="Digite alguma coisa"
                    >
                        {this.state.text}
                    </textarea>
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
                    <ul className="notes App">
                        {this.renderNotas()}
                    </ul>
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