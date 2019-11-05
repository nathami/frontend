import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class ponto extends Component {
    state = {
        ponto: {},
    };

    componentDidMount() {
        const { id } = this.props.match.params;

        fetch(`http://localhost:3008/pontoeletronico/ponto/${id}`)
            .then(ponto =>
                ponto.json().then(ponto => this.setState({ ponto }))
            )
            .catch(erro => this.setState({ erro }));
    }

    render() {
        const { ponto, index } = this.state;

        console.log(ponto);
        return (
            <div className="ponto-info">
                <div key={index} className="card mb-4">
                    <h5 className="card-header">{ponto.data_hora_entrada}</h5>
                    <div className="card-body">
                        <div className="media">
                            <div className="media-body">
                                <h5 className="mt-0 mb-1">{ponto.data_hora_inicio_intervalo}</h5>
                                <p>{ponto.data_hora_fim_intervalo}</p>
                                <p>{ponto.data_hora_saida}</p>
                                <p>{ponto.observacao}</p>
                                
                            </div>
                        </div>
                        <div className="text-right">
                        <Link
                                to={`/ponto`}
                                className="btn btn-success mr-3"
                                role="button"
                            >
                                Voltar
              </Link>
                            <Link
                                to={`/DeletarPonto/${ponto.id}`}
                                className="btn btn-danger mr-3"
                                role="button"
                            >
                                Remover
              </Link>
                            <Link
                                to={`/EditarPonto/${ponto.id}`}
                                className="btn btn-primary"
                                role="button"
                            >
                                Editar
              </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}