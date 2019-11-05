import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            usuario: [],
            erro: null
        };
    }

    componentDidMount() {
        fetch(`http://localhost:3008/pontoeletronico/usuarios`)
            .then(usuario =>
                usuario.json().then(usuario => this.setState({ usuario }))
            )
            .catch(erro => this.setState({ erro }));
    }

    render() {
        const { usuario } = this.state;
        return usuario.map((usuario, index) => (

            <div className="usuario-info">
                <div key={index} className="card mb-4">
                    <h5 className="card-header">{usuario.nome}</h5>
                    <div className="card-body">
                        <div className="media">
                           <p><strong>{usuario.cpf}</strong></p>
                        </div>
                        <div className="text-right">
                            <Link
                                to={`/DetalhesUsuario/${usuario.id}`}
                                className="btn btn-success mr-3"
                                role="button"
                            >
                                Detalhes
              </Link>
                            <Link
                                to={`/DeletarUsuario/${usuario.id}`}
                                className="btn btn-danger mr-3"
                                role="button"
                            >
                                Remover
              </Link>
                            <Link
                                to={`/EditarUsuario/${usuario.id}`}
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