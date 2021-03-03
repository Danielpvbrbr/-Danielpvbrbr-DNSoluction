import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Container, Row } from 'reactstrap'

import "./Home.css"
import Menu from './components/Menu'
import BarChart from './components/BarChart'


export default class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
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

          <div className="col col-md-10 main-direito">

            <div className="border col-md-12 d-flex justify-content-center">

              <div class="card text-white bg-primary m-4 w-25">
                <div class="card-header">Compras</div>
                <div class="card-body">
                  <h5 class="card-title">$5,0000</h5>
                </div>
              </div>

              <div class="card text-white bg-warning m-4 w-25">
                <div class="card-header">Compras</div>
                <div class="card-body">
                  <h5 class="card-title">$5,0000</h5>

                </div>
              </div>

              <div class="card text-white bg-success m-4 w-25">
                <div class="card-header">Compras</div>
                <div class="card-body">
                  <h5 class="card-title">$5,0000</h5>

                </div>
              </div>

              <div class="card text-white bg-danger m-4 w-25">
                <div class="card-header">Compras</div>
                <div class="card-body">
                  <h5 class="card-title">$5,0000</h5>

                </div>
              </div>

            </div>

            <div className=" col col-md-12  p-0">
              <div className="w-25 mt-4">

                <BarChart/>  
              </div>

            </div>

          </div>

        </div>

      </div>
    )
  }
}
