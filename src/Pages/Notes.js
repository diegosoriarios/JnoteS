import React, { Component } from 'react';
import string from '../String';
import axios from 'axios';

export default class Notes extends Component{
    state = {
        notas: []
    };

    componentDidMount = () => {
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

    render(){
        return(
            <ul>
                {this.renderNotas()}
            </ul>
        );
    }
}