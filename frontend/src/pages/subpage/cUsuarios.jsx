import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'

import "../../Home.css"
import Menu from '../../components/Menu'


export default class Usuarios extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cUser: '',
      cPass: '',
      date:[]
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }
  
  async handleSubmit(event) {
    event.preventDefault()
    
    const { date,cUser, cPass } = this.state
    // const register = await axios.post('http://localhost:3030/register', {
    //   cUser,
    //   cPass
    // })
    //   .then(res => {
    //     console.log(res);
    //     alert(res.data);
    //     window.location.reload();
    //   })
      console.log(date)
  }

  render() {

    return (

      <div className="container-sm|md|lg|xl p-0 m-0 ">

        <div className=" row">

          <div className="col col-md-2  p-0 m-0">

            <Menu />

          </div>

          <div className="main-direito col col-md-10  main-direito">

            <div className="d-flex justify-content-center mt-4">

              <form className="border p-4 w-50 " onSubmit={this.handleSubmit}>
                <h4 className="text-center">Criar Usuário</h4>

                <div class="form-group">
                  <label for="Usuário">Usuário</label>
                  {/* <input className="form-control"
                    type="text"
                    autoComplete="off"
                    placeholder="Usuário"
                    onChange={this.handleChange}
                    name="cUser"
                    id="Usuário"
                    maxLength="20"
                    required
                  /> */}
                  <input className="form-control"
                    type="date"
                    autoComplete="off"
                    placeholder="Usuário"
                    onChange={this.handleChange}
                    name="date"
                    id="Usuário"
                    maxLength="20"
                    required
                  />
                  
                </div>

                <div class="form-group">
                  <label for="senha">Senha:</label>
                  {/* <input className="form-control"
                    type="password"
                    autoComplete="off"
                    placeholder="Criar senha Senha"
                    onChange={this.handleChange}
                    name="cPass"
                    id="senha"
                    maxLength="6"
                    required
                  /> */}
                </div>

                <div class="form-group">
                  <label class="my-1 mr-2" for="acesso">Níveis de acesso</label>
                  <select class="custom-select my-1 mr-sm-2" id="acesso">
                    <option value="2">Usuário</option>
                    <option value="1">Administrador</option>
                  </select>
                </div>
                <button className="btn btn-success">Cadastrar</button>
              </form>


            </div>
          </div>

        </div>

      </div>
    )
  }
}
