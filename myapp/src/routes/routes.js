import React from 'react';
import { isAuthenticated } from '../services/serverApi';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';

import Login from '../component/login';
import Cadastrar from '../component/cadastrar';
import Logado from '../component/logado';
import Form from '../component/formDocumento';
import Home from '../component/Home'
import FormCaixa from '../component/formCaixa';
import FormClassificacao from '../component/formClassificacao';
import FormAssuntoTDD from '../component/formAssuntoTDD';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest}
    render={props =>
      isAuthenticated('@guarda-local/token') != null ? (
        <Component {...props} />
      ) : (
          <Redirect to={{ pathname: "/home", state: { from: props.location } }} />
        )
    }
  />
)
const RouteLogin = () => (
  <BrowserRouter>
    <Switch>
    <Route exact path="/home" component={Home}/>
      <Route exact path="/login" component={Login} />
      <Route exact path="/cadastro" component={Cadastrar} />
      <Route exact path="/form" component={Form} />
      <Route exact path="/formCaixa" component={FormCaixa}/> 
      <Route exact path="/formClassificacao" component={FormClassificacao}/>   
      <Route exact path="/formAssuntoTDD" component={FormAssuntoTDD}/>     
      <PrivateRoute exact path="/" component={Logado} />
    </Switch>
  </ BrowserRouter>
)

export default RouteLogin;

