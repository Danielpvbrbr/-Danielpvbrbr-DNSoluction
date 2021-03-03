import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import "../Home.css"
import Menu from '../components/Menu'
import axios from 'axios';
import  CheckBox  from './CheckBox'

export default class Relatorio extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      search: '',
      result: []
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSearchChange = ({ target }) => {
    const { list } = this.state
    const pattern = new RegExp(target.value, 'i')
    const result = list.filter(it => !!it.data_hora_atual.match(pattern))

    if (!!target.value) {
      this.setState({ search: target.value, result });
    }
    if (!target.value) {
      this.setState({ search: target.value, result: list })
    }
    
  };

 componentDidMount = async () => {

    this.getValores_list();
    
  }

  getValores_list = async () => {

    try {
      const url = "http://localhost:3030/listjust";
      const { data } = await axios.get(url)
      if (data?.length) {
        this.setState(state => ({ ...state, list: data, result: data }))
      }
    } catch (e) {
      console.log('request error: ', e.message)
    }

  }
  handleSubmit = async () =>{
    console.log(this.state.search)
  }

  handleAllChecked = (event) => {
    let list = this.state.list
    list.forEach(result => result.isChecked = event.target.checked) 
    this.setState({list: list})
  }

  handleCheckChieldElement = (event) => {
    let list = this.state.list
    list.forEach(result => {
       if (result.value === event.target.value)
          result.isChecked =  event.target.checked
    })
    this.setState({list: list})
  }

// time = (e) =>{
// var utc = new Date().toJSON().slice(0,10).replace(/-/g,'-');
// console.log(utc)

// }
  render() {
    
    const { search, result } = this.state
    
    return (

      <div className="main-direito container-sm|md|lg|xl p-0 m-0 ">

        <div className=" row main-principal">

          <div className="col col-md-2  p-0 m-0">

            <Menu />

          </div>

          <div className="col col-md-10" >
            <div className="mainlist" >

              <div className="cont_lateral" onSubmit={this.handleSubmit}>
                <p>Selecione a data para visualização </p>

                <input
                  type="date"
                  className="promotion-search__input"
                  placeholder="Buscar"
                  value={search}
                  onChange={this.handleSearchChange}
                  />
    
              </div>
              <div className="listJust" onSubmit={this.handleSubmit}>
              <input type="checkbox" onClick={this.handleAllChecked}  value="checkedall" />
                <ol >
                  {
                    result.map((item, i) => (

                      <li key={item._id}>

                        <table colspan="2" className="listTable">
                       
                          <tbody>
                          <CheckBox handleCheckChieldElement={this.handleCheckChieldElement} {...item}/>
                            <tr >
                              <td>Matrícula:</td>
                              <td>{item.matricula}</td>
                            </tr>

                            <tr>
                              <td>Nome:</td>
                              <td>{item.nome}</td>
                            </tr>
                            <tr>
                              <td>Função:</td>
                              <td>{item.funcao}</td>
                            </tr>
                            <tr>
                              <td>Setor:</td>
                              <td>{item.setor}</td>
                            </tr>
                            <tr>
                              <td>Data e ocorrencia:</td>
                              <td>{item.data_ocorrencia}</td>
                            </tr>
                            <tr>
                              <td>Data e hora da justificativa:</td>
                              <td>{item.data_hora_atual}</td>
                            </tr>
                            <tr>
                              <td colspan="2">Justificativa:</td>
                            </tr>
                            <tr>
                              <td colspan="2">{item.campo_just}</td>
                            </tr>
                            <tr colspan="2">
                              <td >{item.nome_admin}</td>
                              <td >{item.matricula_admin}</td>
                            </tr>
                          </tbody>

                        </table>
                        
                      </li>
                    ))
                  }
                </ol>

              </div>

            </div>



          </div>

        </div>

      </div>
    )
  }

}
