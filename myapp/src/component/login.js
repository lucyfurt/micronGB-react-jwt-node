import React, { Component } from 'react';
import './login.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import Axios from 'axios';

import Logo from '../temp/logo';
import Footer from '../temp/footer';

import { Link } from 'react-router-dom';
import { Growl } from 'primereact/growl';

const urlLogin = 'http://localhost:3007/api/v1/login/'

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: [],
      email: '',
      password: '',
      auth: true
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  }

  logar = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const obj = {
      email: email.toLowerCase(),
      password: password
    }
    Axios.post(urlLogin, obj)
      .then((response) => {
        this.setState({ item: response.data })
        this.showSuccess();
        localStorage.setItem('@guarda-local/token', this.state.item.token);
        this.props.history.push('/');
        console.log(this.state.item);
      })
      .catch((error) => {
        this.showError()
        console.log(error);
      });
  }

  showSuccess = () => {
    this.growl.show({ severity: 'success', summary: 'Sucesso!!', detail: 'Usuário válido!!' });
  }
  showError = () => {
    this.growl.show({ severity: 'error', summary: 'Erro!!', detail: 'Email ou senha inválido!' });
  }

  render() {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-12 col-md-9">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                <Growl ref={(el) => this.growl = el} />
                <div className="row">
                  <div className="col-lg-4 d-none d-lg-block ml-2 container-logo">
                    <Logo className="scarpim-logo" />
                  </div>
                  <div className="col-lg-6">
                    <div className="p-5">
                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4">Seja bem-vindo (a)!</h1>
                      </div>
                      <form className="user">
                        <div className="form-group">
                          <input type="email" className="form-control form-control-user" id="email"
                            placeholder="Enter Email Address..." value={this.state.email} onChange={this.onChange} required />
                        </div>
                        <div className="form-group">
                          <input type="password" className="form-control form-control-user" id="password"
                            placeholder="Password" value={this.state.password} onChange={this.onChange} required />
                        </div>
                        <Link to="/logado" className="btn btn-primary btn-user btn-block" onClick={this.logar}>
                          Login
                           </Link>
                      </form>
                      <hr />
                      <div className="text-center">
                        <Link to="/cadastro" className="small">Crie sua conta!</Link>
                      </div>
                    </div>
                  

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}