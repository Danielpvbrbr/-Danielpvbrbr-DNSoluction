import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Row } from 'reactstrap'
import axios from 'axios'

import "../../Home.css"
import Menu from '../../components/Menu'


export default class Usuarios extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nome: '',
      email: '',
      username: '',
      nascimento: [],
      password: '',
      celular: '',
      cpf: ''

    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  async handleSubmit(event) {
    event.preventDefault()
     // if (this.state.nome) {
    //   alert("Autenticação realizado com sucesso")

    // } else {
    //   alert('Usuário digitado não atende ao requisto de 6 digitos, Tente novamente.')
    // }

    const { nome, email, username, nascimento, password, celular, cpf } = this.state
    const cadastrar = await axios.post('http://localhost:3030/cadastrar', {
      nome,
      email,
      username,
      nascimento,
      password,
      celular,
      cpf
    })
      .then(res => {
        console.log(res);
        alert(res.data);
      })

  }

  render() {
    return (

      <div className="main container-sm|md|lg|xl p-0 m-0 ">

        <div className=" row main-principal">

          <div className="col col-md-2  p-0 m-0">

            <Menu />

          </div>

          <div className="main-direito col col-md-10">

            <div className="d-flex justify-content-center">

            <form className="w-50" onSubmit={this.handleSubmit}>
              <h4>Registro de Usuario</h4>
              <div className="form-group">
                <label for="nome">Nome sobrenome</label>
                <input className="form-control"
                  type="text"
                  autoComplete="off"
                  placeholder="Nome completo"
                  onChange={this.handleChange}
                  name="nome"
                  id="nome"
                  required
                />

                <div className="form-group">
                  <label for="email">Endereço de E-mail</label>
                  <input className="form-control"
                    type="text"
                    autoComplete="off"
                    placeholder="E-email@example.com"
                    onChange={this.handleChange}
                    name="email"
                    id="email"
                    required
                  />
                </div>


                <div className="form-group">
                  <label for="nascimento">Data de Nascimento</label>
                  <input className="form-control"
                    type="date"
                    autoComplete="off"
                    onChange={this.handleChange}
                    name="nascimento"
                    id="nascimento"
                    required
                  />
                </div>


                <div className="form-group">
                  <label for="username">Usuario</label>
                  <input className="form-control"
                    type="text"
                    autoComplete="off"
                    placeholder="Usuario"
                    onChange={this.handleChange}
                    name="username"
                    maxLength="17"
                    id="username"
                    required
                  />
                </div>


                <div className="form-group">
                  <label for="password">Senha</label>
                  <input className="form-control"
                    type="password"
                    maxLength="6"
                    autoComplete="off"
                    placeholder="Senha min 6 digitos"
                    onChange={this.handleChange}
                    name="password"
                    id="password"
                    required
                  />
                </div>

                <div className="form-group">
                  <label for="cPassword">Confirme sua Senha</label>
                  <input className="form-control"
                    type="password"
                    maxLength="6"
                    autoComplete="off"
                    placeholder="Senha min 6 digitos"
                    onChange={this.handleChange}
                    name="cPassword"
                    id="cPassword"
                    required
                  />
                </div>

                <div className="form-group">
                  <label for="celular">Email address</label>
                  <input className="form-control"
                    type="number"
                    autoComplete="off"
                    placeholder="Celular"
                    onChange={this.handleChange}
                    name="celular"
                    id="celular"
                    required
                  />
                </div>


                <div className="form-group">
                  <label for="cpf">Email address</label>
                  <input className="form-control"
                    type="number"
                    autoComplete="off"
                    placeholder="CPF"
                    onChange={this.handleChange}
                    name="cpf"
                    id="cpf"
                    required
                  />


                </div>

                <input className="btn btn-success mr-1" type="submit" value="Cadastrar" />
                <Link to="/">
                  <input className="btn btn-info" type="submit" value="Voltar" />
                </Link>
              </div>


            </form>
            </div>
          </div>

        </div>

      </div>
    )
  }
}
