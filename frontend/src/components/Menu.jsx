import React from 'react'
import { Link } from 'react-router-dom';
import { UncontrolledCollapse, Nav, NavItem, NavLink } from 'reactstrap'
import perfil2 from "../icones/perfil2.png"

import {
  IoSpeedometerOutline,
  IoReaderOutline, IoPeopleOutline,
  IoPeopleCircle,
  IoPersonCircleOutline,
  IoAppsSharp,
  IoSettingsOutline
} from "react-icons/io5";
import "./Menu.css"

export default function Menu() {
  return (
    <div className="main container-sm|md|lg|xl p-0 m-0 ">

      <div vertical className="menu-lateral bg-dark ">

        <Link to="/perfil">
        <div className="perfil">
          <h2 className="text-center text-light mb-2">DNSolution</h2>
          <img className="img-fluid" src={perfil2} />
          <p className="text-white">Admin</p>
        </div>
        </Link>

        <Nav className="nav nav-pills nav-fill ml-3 ">
          <NavItem className="text-md-left ">

            <Link  to="/home">
              <IoSpeedometerOutline className="float-left align-self-center icones" />
              <NavLink className="text-light ">Dashboords</NavLink>
            </Link>

            <Link  to="/tabela">
              <IoAppsSharp className="float-left align-self-center icones" />
              <NavLink className="text-light">Tabela</NavLink>
            </Link>

            <Link  to="/relatorio">
              <IoReaderOutline className="float-left align-self-center  icones" />
              <NavLink className="text-light " id="toggler1">Relatorio</NavLink>

              <UncontrolledCollapse  toggler="#toggler1">
              <NavLink className="text-light bg-dark teste">Listas de feedback</NavLink>
                <Link to="/criarfeedback"><NavLink className="text-light bg-dark ">Criar Feedback</NavLink></Link>
              </UncontrolledCollapse>
            </Link>

            <Link  to="/usuarios">
              <IoPeopleOutline className="float-left align-self-center  icones" />
              <NavLink className="text-light " id="toggler2">Lista de Usuarios</NavLink>

              <UncontrolledCollapse className="teste" toggler="#toggler2">
                <NavLink className="text-light bg-dark teste">Usuarios</NavLink>
                <Link to="/cUsuarios"><NavLink className="text-light bg-dark ">Criar Usuarios</NavLink></Link>
              </UncontrolledCollapse>
            </Link>

            <Link  to="/clientes">
              <IoPeopleCircle className="float-left align-self-center  icones" />
              <NavLink className="text-light " id="toggler3">Lista de Clientes</NavLink>

              <UncontrolledCollapse className="teste" toggler="#toggler3">
                <NavLink className="text-light bg-dark teste">Clientes</NavLink>
                <Link to="/cClientes"><NavLink className="text-light bg-dark ">Criar Clientes</NavLink></Link>
              </UncontrolledCollapse>
            </Link>

            <Link  to="/perfil">
              <IoPersonCircleOutline className="float-left align-self-center icones" />
              <NavLink className="text-light">Perfil</NavLink>
            </Link>
            <Link to="/configuracoes">
              <IoSettingsOutline className="float-left align-self-center icones" />
              <NavLink className="text-light">Configuraçóes</NavLink>
            </Link>

          </NavItem>

        </Nav>
      </div>

    </div>
  )
}


