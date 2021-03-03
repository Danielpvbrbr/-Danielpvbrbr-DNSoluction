import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import "../Home.css"
import Menu from '../components/Menu'
import axios from 'axios';

export default class Relatorio extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      response: [],
      valores_list:[]
    }
  }

  handleChange = (event) =>{
    this.setState({ [event.target.nome]: event.target.value })
  }

  async componentDidMount() {
    try{
      const response = await fetch('http://localhost:3030/listjust')
      const data = await response.json()
      this.setState({ valore: response })
      this.setState({ valores_list: data })
      
    } catch (error){
      console.log("error")
    }
    
  }
  render() {

    const { valores_list } = this.state
    return (

      <div className="main-direito container-sm|md|lg|xl p-0 m-0 ">


        <div className=" row main-principal">

          <div className="col col-md-2  p-0 m-0">

            <Menu />

          </div>

          <div className="col col-md-10" >
            <div className="mainlist" >

              <div className="listJust" >
                
                {
                  valores_list.map(valores_list =>

                    <table key={valores_list.id} colspan="2" className="listTable">

                    <tbody>
                      <tr >
                        <td>Matrícula:</td>
                        <td>{valores_list.matricula}</td>
                      </tr>

                      <tr>
                        <td>Nome:</td>
                        <td>{valores_list.nome}</td>
                      </tr>
                      <tr>
                        <td>Função:</td>
                        <td>{valores_list.funcao}</td>
                      </tr>
                      <tr>
                        <td>Setor:</td>
                        <td>{valores_list.setor}</td>
                      </tr>
                      <tr>
                        <td>Data e ocorrencia:</td>
                        <td>{valores_list.data_ocorrencia}</td>
                      </tr>
                      <tr>
                        <td>Data e hora da justificativa:</td>
                        <td>{valores_list.data_hora_atual}</td>
                      </tr>
                      <tr>
                        <td colspan="2">Justificativa:</td>
                      </tr>
                      <tr>
                        <td colspan="2">{valores_list.campo_just}</td>
                      </tr>
                      <tr colspan="2">
                        <td >{valores_list.nome_admin}</td>
                        <td >{valores_list.matricula_admin}</td>
                      </tr>
                    </tbody>

                  </table>
                  )
                }


              </div>

            </div>

          </div>

        </div>

      </div>
    )
  }

}
