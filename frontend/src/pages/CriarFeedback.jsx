import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'

import "../Home.css"
import Menu from '../components/Menu'


export default class Usuarios extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nome: '',
      matricula: '',
      setor: '',
      funcao: '',
      date_ocor: [],
      campjust: '',
      data_hora:[]
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange = (event) =>{
    this.setState({ [event.target.name]: event.target.value })
  }

  time = (data_hora) =>{
    var data = new Date().toJSON().slice(0,10).replace(/-/g,'-');
    var horaC = new Date()
    var hora = horaC.getHours(); 
    var min = horaC.getMinutes()
    var data_hora = (`${data} ${hora}:${min}`)
    console.log(data_hora)
    return data_hora
    }

  async handleSubmit(event) {
    event.preventDefault()
    var data_hora = this.time()
    console.log(data_hora)
    
    const {nome, matricula, setor, funcao, date_ocor, campjust} = this.state
    const Createjust = await axios.post('http://localhost:3030/createjust', {
      nome,
      matricula,
      setor,
      funcao,
      date_ocor,
      campjust,
      data_hora
    })
      .then(res => {
        console.log(res);
        console.log(res.data);
        window.location.reload();
      })

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
                <h4 className="text-center">Reclamar erro</h4>

                <div class="form-group">
                  <label for="Nome">Nome</label>
                  <input className="form-control"
                    type="text"
                    autoComplete="off"
                    placeholder="Nome"
                    onChange={this.handleChange}
                    name="nome"
                    id="Nome"
                    // required
                  />
                </div>
                
                <div class="form-group">
                  <label for="Matrícula">Matrícula:</label>
                  <input className="form-control"
                    type="number"
                    autoComplete="off"
                    placeholder="Digite matricula Matrícula"
                    onChange={this.handleChange}
                    name="matricula"
                    maxLength="6"
                    id="Matrícula"
                  />
                </div>

                <div class="form-group">
                  <label for="Setor">Setor:</label>
                  <input className="form-control"
                    type="text"
                    autoComplete="off"
                    placeholder="digite seu setor"
                    onChange={this.handleChange}
                    name="setor"
                    id="Setor"
                  />
                </div>

                <div class="form-group">
                  <label for="Função">Função:</label>
                  <input className="form-control"
                    type="text"
                    autoComplete="off"
                    placeholder="digite sua Função"
                    onChange={this.handleChange}
                    name="funcao"
                    id="Função"

                  />
                </div>

                <div class="form-group">
                  <label for="Data e ocorrencia">Data e ocorrencia:</label>
                  <input className="form-control"
                    type="date"
                    autoComplete="off"
                    onChange={this.handleChange}
                    name="date_ocor"
                    id="Data e ocorrencia"
                  />
                </div>

                <div class="form-group">
                  <label for="Campjust">Justificativa:</label>
                  <textarea className="form-control"
                    type="text"
                    autoComplete="off"
                    placeholder="Digite sua justificativa"
                    onChange={this.handleChange}
                    name="campjust"
                    id="Campjust"
                    maxLength="180"
                  />
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
