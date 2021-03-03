import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Row } from 'reactstrap'
import axios from 'axios'

import "../Home.css"
import Menu from '../components/Menu'


export default class Usuarios extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cUser: '',
      cPass: '',
      valores: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange = (event)=> {
    this.setState({ [event.target.name]: event.target.value })
  }
  async componentDidMount() {
    const cadastro = await axios.get('http://localhost:3030/cadastro')
      .then(res => {
        // console.log(res.data)
        this.setState({ valores: res.data })
      })

  }

  async handleSubmit(event) {
    event.preventDefault()
   

  }

  render() {
    const { valores } = this.state
    return (

      <div className="main container-sm|md|lg|xl p-0 m-0 ">

        <div className="row main-principal">

          <div className="col col-md-2  p-0 m-0">

            <Menu />

          </div>

          <div className="main-direito col col-md-10">

            <div className="d-flex justify-content-center">
                <table class="table table-hover table-sm table-striped">

                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Nome</th>
                      <th scope="col">Usuario</th>
                      <th scope="col">E-mail</th>
                      <th scope="col">Data/Nascimento</th>
                      <th scope="col">Celular</th>
                      <th scope="col">CPF</th>
                    </tr>
                  </thead>

                  <tbody>

                    {
                      valores.map(valores => (
                        <tr key={valores._id}>
                          <th scope="row">{valores.id}</th>
                          <td>{valores.nome}</td>
                          <td>{valores.username}</td>
                          <td>{valores.email}</td>
                          <td>{valores.nascimento}</td>
                          <td>{valores.celular}</td>
                          <td>{valores.cpf}</td>
                        </tr>
                      ))
                    }

                  </tbody>
                </table>
            </div>
          </div>

        </div>

      </div>
    )
  }
}
