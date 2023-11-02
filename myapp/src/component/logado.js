import React, { Component } from 'react';
import axios from 'axios';
import Caixas from './dataCaixa';
import Documentos from './dataDocumento';
import Classificacao from './dataClassificacao';
import AssuntoTDD from './dataAssuntoTDD';


import './login.css';

export default class Logado extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: null, 
      caixasData: [],
      documentosData: [],
      classificacoesData: [],
      assuntotddData: [],

    };
  }

  fetchCaixasData = () => {
    axios
      .get('http://localhost:3007/api/v1/caixas/')
      .then((response) => {
        this.setState({
          activeTab: 'caixas',
          caixasData: response.data,
          documentosData: [],
          classificacoesData: [],
          assuntotddData: [],
        });
      })
      .catch((error) => {
        console.error('Erro ao obter os dados das Caixas:', error);
      });
  };

  fetchDocumentosData = () => {
    axios
      .get('http://localhost:3007/api/v1/documentos/')
      .then((response) => {
        this.setState({
          activeTab: 'documentos',
          documentosData: response.data,
          caixasData: [],
          classificacoesData: [], 
          assuntotddData: [],
        });
      })
      .catch((error) => {
        console.error('Erro ao obter os dados dos Documentos:', error);
      });
  };

  fetchClassificacaoData = () => {
    axios
      .get('http://localhost:3007/api/v1/classificacoes/')
      .then((response) => {
        this.setState({
          activeTab: 'classificacoes',
          classificacoesData: response.data,
          caixasData: [],
          documentosData: [],
          assuntotddData: [],
          
        });
      })
      .catch((error) => {
        console.error('Erro ao obter os dados das Classificações:', error);
      });
  };

  fetchAssuntoTDD = () => {
    axios
      .get('http://localhost:3007/api/v1/assuntoTDD/')
      .then((response) => {
        this.setState({
          activeTab: 'assuntoTDD',
          assuntotddData: response.data,
          classificacoesData: [],
          caixasData: [],
          documentosData: [],
          
        });
      })
      .catch((error) => {
        console.error('Erro ao obter os dados dos Assuntos TDD:', error);
      });
  };


  handleLogout = () => {
    localStorage.removeItem('@guarda-local/token');
    window.location.reload();
  };

  render() {
    const { activeTab, caixasData, documentosData, classificacoesData, assuntotddData } = this.state;
    const token = localStorage.getItem('@guarda-local/token');

    if (token !== null) {
      return (
        <div>
         
          <div className="menu">
            <ul>

              <li>
                <a href="#" onClick={this.fetchCaixasData}>
                  Caixas
            
                </a>
              </li>
              <li>
                <a href="#" onClick={this.fetchDocumentosData}>
                  Documentos
                </a>
              </li>
              <li>
                <a href="#" onClick={this.fetchClassificacaoData}>
                  Assuntos Classificação
                </a>
              </li>
              <li>
                <a href="#" onClick={this.fetchAssuntoTDD}>
                  Assuntos TDD
                </a>
              </li>
              <li> <button className="btn btn-primary mb-2" onClick={this.handleLogout}>
            Sair
          </button></li>
            </ul>
          </div>
          <div className="text-center">

            {activeTab === 'caixas' && (
              <Caixas data={caixasData} />
            )}
            {activeTab === 'documentos' && (
              <Documentos data={documentosData} />
            )}
            {activeTab === 'classificacoes' && (
              <Classificacao data={classificacoesData} />
            )}
             {activeTab === 'assuntoTDD' && (
              <AssuntoTDD data={assuntotddData} />
            )}
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}
