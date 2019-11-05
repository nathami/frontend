import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ponto: [],
            erro: null
        };
    }

    componentDidMount() {
        fetch(`http://localhost:3008/pontoeletronico/ponto`)
            .then(ponto =>
                ponto.json().then(ponto => this.setState({ ponto }))
            )
            .catch(erro => this.setState({ erro }));
    }

    render() {
        const { ponto } = this.state;
        return ponto.map((ponto, index) => (

            <div className="ponto-info">
                <div key={index} className="card mb-4">
                    <h5 className="card-header">{ponto.data_hora_entrada}</h5>
                    <div className="card-body">
                        <div className="media">
                           <p><strong>{ponto.data_hora_inicio_intervalo}</strong></p>
                        </div>
                        <div className="text-right">
                            <Link
                                to={`/DetalhesPonto/${ponto.codigo}`}
                                className="btn btn-success mr-3"
                                role="button"
                            >
                                Detalhes
              </Link>
                            <Link
                                to={`/DeletarPonto/${ponto.codigo}`}
                                className="btn btn-danger mr-3"
                                role="button"
                            >
                                Remover
              </Link>
                            <Link
                                to={`/EditarPonto/${ponto.codigo}`}
                                className="btn btn-primary"
                                role="button"
                            >
                                Editar
              </Link>
                        </div>
                    </div>
                </div>
            </div>
        ))
    };
}