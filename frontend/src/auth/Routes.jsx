import React from 'react'
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import Login from '../Login'
import Home from '../Home'
import Geroutes from '../components/Geroutes'
import Tabela from '../pages/Tabela'
import Clientes from '../pages/Clientes'
import Configuracoes from '../pages/Configuracoes'
import Perfil from '../pages/Perfil'
import Relatorio from '../pages/Relatorio'
import CriarFeedback from '../pages/CriarFeedback'
import Usuarios from '../pages/Usuarios'
import cUsuarios from '../pages/subpage/cUsuarios'
import cClientes from '../pages/subpage/cClientes'
import { isAuthenticated } from './auth'

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        isAuthenticated() ? (
            <Component { ...props} />
        ) : (
            <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
    )} />
)
export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login} />
                <PrivateRoute path="/geroutes" component={Geroutes} />
                <PrivateRoute path="/home" component={Home} />
                <PrivateRoute path="/tabela" component={Tabela} />
                <PrivateRoute path="/clientes" component={Clientes} />
                <PrivateRoute path="/configuracoes" component={Configuracoes} />
                <PrivateRoute path="/perfil" component={Perfil} />
                <PrivateRoute path="/relatorio" component={Relatorio} />
                <PrivateRoute path="/criarfeedback" component={CriarFeedback} />
                <PrivateRoute path="/usuarios" component={Usuarios} />
                <PrivateRoute path="/cUsuarios" component={cUsuarios} />
                <PrivateRoute path="/cClientes" component={cClientes} />
                <Redirect from='*' to='/' />
            </Switch>
        </BrowserRouter>
    )
}