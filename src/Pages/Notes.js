import React, { Component } from 'react';
import string from '../String';
import axios from 'axios';

export default class Notes extends Component{
    state = {
        notas: [],
        create: false,
        text: ''
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
                <li key={i}>
                    <p>{value.texto}</p>
                    <p>{value.anexo}</p>
                    <p>{`${date[2]}/${date[1]}/${date[0]}`}</p>
                </li>
            );
        })
    }

    handleNotes = () => {
        this.setState({
            create: true
        })
    }

    saveNote = () => {
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
            create: false,
            notas: []
        }, () => {
            this.getNotes();
        })
    }

    render(){
        if(this.state.create){
            return (
                <div>
                    <textarea
                        value={this.state.text}
                        onChange={e => this.setState({text: e.target.value})}
                    >
                        Digite alguma coisa
                    </textarea>
                    <button onClick={() => this.saveNote()}>Salvar</button>
                </div>
            )
        }else{
            return(
                <ul>
                    <span onClick={() => this.handleNotes()}>+</span>
                    {this.renderNotas()}
                </ul>
            );
        }
    }
}