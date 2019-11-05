import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class EditarPonto extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ponto: {
        data_hora_entrada: "",
        data_hora_inicio_intervalo: "",
        data_hora_fim_intervalo: "",
        data_hora_saida:"",
        observacao: ""
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

  componentDidMount() {
    const { id } = this.props.match.params;

    fetch(`http://localhost:3008/pontoeletronico/ponto/${id}`)
      .then(data => {
        data.json().then(data => {
          if (data.error) {
            this.setState({ erro: data.error });
          } else {
            this.setState({ ponto: data });
          }
        });
      })
      .catch(erro => this.setState({ erro: erro }));
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
            <legend>Criar Ponto</legend>
            <div className="form-group">
              <label htmlFor="data_hora_entrada">Data hora entrada</label>
              <input
                type="text"
                className="form-control"
                id="data_hora_entrada"
                name="data_hora_entrada"
                placeholder="data_hora_entrada"
                minLength="2"
                maxLength="40"
                value={this.state.ponto.data_hora_entrada}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="data_hora_inicio_intervalo">Data hora inicio intervalo</label>
              <input
                type="text"
                className="form-control"
                id="data_hora_inicio_intervalo"
                name="data_hora_inicio_intervalo"
                aria-describedby="valueAjuda"
                placeholder="data_hora_inicio_intervalo"
                value={this.state.ponto.data_hora_inicio_intervalo}
                onChange={this.handleInputChange}
              />
              
            </div>
            <div className="form-group">
              <label htmlFor="data_hora_fim_intervalo">Data hora fim intervalo</label>
              <input
                type="date"
                className="form-control"
                id="data_hora_fim_intervalo"
                name="data_hora_fim_intervalo"
                placeholder="data_hora_fim_intervalo"
                value={this.state.ponto.data_hora_fim_intervalo}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="data_hora_saida">Data hora saida</label>
              <input
                type="text"
                className="form-control"
                id="data_hora_saida"
                name="data_hora_saida"
                placeholder="data_hora_saida"
                minLength="2"
                maxLength="40"
                value={this.state.ponto.data_hora_saida}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="observacao">Observacao</label>
              <input
                type="text"
                className="form-control"
                id="observacao"
                name="observacao"
                placeholder="observacao"
                minLength="2"
                maxLength="40"
                value={this.state.ponto.observacao}
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
        ponto: { ...prevState.ponto, [name]: value }
    }));
  };

  handleSubmit = event => {
    const { id } = this.state.funcionario;

    fetch(`http://localhost:3008/pontoeletronico/ponto/${id}`, {
      method: "put",
      body: JSON.stringify(this.state.ponto),
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

export default EditarPonto;
