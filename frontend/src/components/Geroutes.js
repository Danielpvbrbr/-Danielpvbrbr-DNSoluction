
import React, { Component } from 'react'
import {Form,Input, FormGroup, Label, Button } from 'reactstrap'
import axios from 'axios'

export default class Geroutes extends Component{
  constructor(props){
    super(props)

    this.state = {
      name: '',
      email: '',
      mensagem: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }
  
async handleSubmit(event)  {
  event.preventDefault()
  const { name, email, mensagem } = this.state
  const form = await axios.post('http://localhost:3030/api/form',{
    name,
    email,
    mensagem
  })
  .then(res => {
    console.log(res);
    console.log(res.data);
  })
}

  render() {//Inicio do render

      return(//Inicio do return
        
        <Form  onSubmit={this.handleSubmit} style={{width: '500px'}}>
            <FormGroup>
              <Label for="name">Name:</Label>
              <Input
                type="text"
                name="name"
                autoComplete="off"
                onChange={this.handleChange}/>
            </FormGroup>

            <FormGroup>
              <Label for="email">Email:</Label>
              <Input
                type="email"
                name="email"
                autoComplete="off"
                onChange={this.handleChange}/>
            </FormGroup>

            <FormGroup>
              <Label for="mensagem">Menssagens:</Label>
              <Input
                type="textarea"
                name="mensagem"
                onChange={this.handleChange}/>
            </FormGroup>
            <Button>Submit</Button>
        </Form>
      )//final do return

   } //Final do render
}
