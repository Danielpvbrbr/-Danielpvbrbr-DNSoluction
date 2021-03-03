import React, { Component } from 'react'
import { Form, Input, FormGroup, Label, Button, Container, Row, Col } from 'reactstrap'
import { Redirect } from 'react-router'
import axios from 'axios'

// import logoUser from "./imagens/logoUser.png"
// import show from "./imagens/show.png"

import './Login.css';
// import { cpfMask } from './mask'

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      User: '',
      Pass: '',
      status: []
      // MostOcul: false,
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) =>{
    this.setState({ [event.target.name]: event.target.value })
  }


  mostraOcultarPassword = () => {
    const { MostOcul } = this.state;
    this.setState({ MostOcul: !MostOcul });
  };


  async handleSubmit(event) {
    event.preventDefault();
    
    try{

    axios.defaults.withCredentials = true

    const { User, Pass } = this.state
    const response = await axios.post('http://localhost:3001/auth', {
      User,
      Pass,
    }).then(res => {
         console.log(res);
      //  console.log(res.data);
        localStorage.setItem('token', res.data.token);
       })
  
      const response_bearer = await axios.get('http://localhost:3001/isUserAuth', {
        headers: {
          "x-access-token" : localStorage.getItem("token"),
        },
      })

        if(response_bearer.data.indexOf("User autenticado")>-1){
          //  alert("Autenticação realizada com sucesso")
           window.location.replace('/home')
        } else if (response.data.indexOf("Nome de usuário ou Senha incorretos!")>-1){
          alert("Usuario ou senha Incorretos!")
          window.location.replace('/')
        }
        
       } catch (e){
        alert('ERRO 002 - Serviço indisponível! Favor entrar em contato com o Suporte.')
       }
}

verificaLogin = () =>{
  if( this.state.User === this.state.Pass){
    return(
      <Redirect to="/home"/>
    )
  }

  else if(this.state.User ===! this.state.User){
    return(
      <Redirect to="/trocasenha" />
    )
  }
  
}


// const { MostOcul } = this.state;
render() {
  
  return (
    <Container >
      <Row className="mt-5" >
        <Col md="12" className="p-5 mt-5 d-flex justify-content-center" >

          <Form onSubmit={this.handleSubmit} className="p-4 w-90 bg-light border">

            <h3 className="text-center p-3">Acessar o Sistema</h3>
            {/* <img className="img-fluid mb-3 w-25 logo" src={logoUser}/> */}
            <div className="w-100">
              <FormGroup>

                <Label for="usuario" hidden>Usuário</Label>
                <Input
                  class="form-control"
                  type="text"
                  name="User"
                  id="usuario"
                  // required
                  placeholder="Digite seu Usuário"
                  onChange={this.handleChange}
                  autoComplete="off"
                />
              </FormGroup>

              {' '}

              <FormGroup>
                <Label for="senha" hidden>Senha</Label>
                <Input
                  class="form-control"
                  type="password"
                  name="Pass"
                  id="senha"
                  //required
                  placeholder="Digite sua senha"
                  onChange={this.handleChange}
                  autocomplete="off"
                />
                {/* <img onClick={this.mostraOcultarPassword} id="show" className="img-fluid mb-3 showImg" src={show}/> */}
              </FormGroup>
            </div>
            {' '}

            <Button color="dark" size="sm" block>Entrar</Button>
          </Form>

        </Col>
      </Row>


    </Container>

  )
}
}