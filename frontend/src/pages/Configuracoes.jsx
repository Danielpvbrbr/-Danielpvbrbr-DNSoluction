import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Container, Row } from 'reactstrap'

import "../Home.css"
import Menu from '../components/Menu'

export default class Configuracoes extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }


  async handleSubmit(event) {
    event.preventDefault()

  }


  render() {

    return (

      <div className="main container-sm|md|lg|xl p-0 m-0 ">


        <div className=" row main-principal">

          <div className="col col-md-2  p-0 m-0">

            <Menu />

          </div>

          <div className=" main-direito col col-md-10">

            <div className="col-md-12 d-flex justify-content-center">



               
              
            </div>
          </div>

        </div>

      </div>
    )
  }
}
