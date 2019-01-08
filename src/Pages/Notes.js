import React, { Component } from 'react';
import string from '../String';
import axios from 'axios';
import '../Styles/style.css';
import { connect } from 'react-redux';
import { userIsLogged, navIsOpen, createNote } from '../actions/items';

class Notes extends Component{
    state = {
        notas: [],
        create: false,
        text: 'Digite alguma coisa',
        postId: '',
        edit: false,
    };

    componentDidMount = () => {
        this.getNotes();
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
                <li key={i} onClick={() => this.editNote(value)}>
                    <p>{value.texto}</p>
                    <p>{`${date[2]}/${date[1]}/${date[0]}`}</p>
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
                notas: []
            }, () => {
                this.props.createNote(false)
                this.getNotes();
            })
        }
    }

    editNote = i => {
        console.log(i)
        this.setState({
            text: i.texto,
            postId: i.id,
            edit: true
        })
        this.props.createNote(true);
    }

    updateNote = () => {
        console.log(typeof this.props.id)
        console.log(typeof this.state.postId)
        let date = new Date()
        axios.put(`${string.URL}/login/${this.props.id}/notes/${this.state.postId}`, {
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

    render(){
        if(this.props.openEditor){
            return (
                <div className="App">
                    <button className="saveBtn" onClick={() => this.saveNote()}>Salvar</button>
                    <button className="cancelBtn" onClick={() => this.props.createNote(false)}>Cancelar</button>
                    <textarea
                        value={this.state.text}
                        onChange={e => this.setState({text: e.target.value})}
                    >
                        {this.state.text}
                    </textarea>
                </div>
            )
        }else{
            return(
                <ul className="notes App">
                    {this.renderNotas()}
                </ul>
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