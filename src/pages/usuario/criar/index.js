import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class CriarUsuario extends Component {
  constructor(props) {
    super(props);

    this.state = {
      usuario: {
        nome: "",
        cpf: "",
        email: "",
        telefone:""
      },
      erro: null,
      redirect: false
    };
  }

  exibeErro() {
    const { erro } = this.state;

    if (erro) {
      return (
        <div className="alert alert-danger" role="alert">
          Erro de conexão com o servidor
        </div>
      );
    }
  }

  render() {
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to="/" />;
    } else {
      return (
        <form onSubmit={this.handleSubmit}>
          {this.exibeErro()}

          <fieldset>
            <legend>Criar Usuario</legend>
            <div className="form-group">
              <label htmlFor="nome">Nome</label>
              <input
                type="text"
                className="form-control"
                id="nome"
                name="nome"
                placeholder="nome"
                minLength="2"
                maxLength="40"
                value={this.state.usuario.nome}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="cpf">CPF</label>
              <input
                type="text"
                className="form-control"
                id="cpf"
                name="cpf"
                aria-describedby="valueAjuda"
                placeholder="cpf"
                value={this.state.usuario.cpf}
                onChange={this.handleInputChange}
              />
              
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                placeholder="email"
                value={this.state.usuario.email}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="telefone">Telefone</label>
              <input
                type="text"
                className="form-control"
                id="telefone"
                name="telefone"
                placeholder="telefone"
                minLength="2"
                maxLength="40"
                value={this.state.usuario.telefone}
                onChange={this.handleInputChange}
              />
            </div>
            
            <button type="submit" className="btn btn-primary">
              Send
            </button>
          </fieldset>
        </form>
      );
    }
  }

  handleInputChange = event => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState(prevState => ({
      usuario: { ...prevState.usuario, [name]: value }
    }));
  };

  handleSubmit = event => {
    fetch("http://localhost:3008/pontoeletronico/usuario", {
      method: "post",
      body: JSON.stringify(this.state.usuario),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(data => {
        if (data.ok) {
          this.setState({ redirect: true });
        } else {
          data.json().then(data => {
            if (data.error) {
              this.setState({ erro: data.error });
            }
          });
        }
      })
      .catch(erro => this.setState({ erro: erro }));

    event.preventDefault();
  };
}

export default CriarUsuario;
