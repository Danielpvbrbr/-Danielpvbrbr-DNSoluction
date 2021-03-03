import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import "../Home.css"
import Menu from '../components/Menu'


export default class Clientes extends Component {
  constructor(props) {
    super(props)

    this.state = {
      acessos: [],
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }
  async componentDidMount() {
    const Lclientes = await axios.get('http://localhost:8000/clientes')
      .then(res => {
        console.log(res.data)
        this.setState({ acessos: res.data })
      })

  }

  async handleSubmit(event) {
    event.preventDefault()

  }


  render() {
    const { acessos } = this.state
    return (

      <div className="main-direito container-sm|md|lg|xl p-0 m-0 ">


        <div className=" row main-principal">

          <div className="col col-md-2  p-0 m-0">

            <Menu />

          </div>

          <div className="col col-md-10">

            <div className="col-md-12 d-flex justify-content-center">

              <table class="table table-hover table-sm table-striped">

                <thead className="thead-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Login</th>
                    <th scope="col">Senha</th>
                    <th scope="col">Acesso</th>
                  </tr>
                </thead>

                <tbody>

                  {/* {
                    acessos.map(acessos => (
                      <tr key={acessos._id}>
                        <th scope="row">{acessos.id}</th>
                        <td>{acessos.name}</td>
                        <td>{acessos.senha}</td>
                        <td>{acessos.tpacesso}</td>
                      </tr>
                    ))
                  } */}

                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>
    )
  }
}


