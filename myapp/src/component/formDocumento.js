import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './formCaixa.css'
const Form = () => {
  const [formData, setFormData] = useState({
    titulo: '',
    ano: '',
    ultimoAno: '',
    dataArquivamento: '',
    volume: '',
    anexo: '',
    resumo: '',
    interessado: '',
    obs: '',
    dataCriacao: '',
  });
  const [submissionMessage, setSubmissionMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3007/api/v1/documentos/', formData);
      setSubmissionMessage('Formulário enviado com sucesso!');
      console.log(response.data);
    } catch (error) {
      setSubmissionMessage('Erro ao submeter o formulário. Por favor, Tente novamente mais tarde!');
      console.error('Error submitting form:', error);
    }
  };
//PUXAR DADOS DA TABELA ASSUNTOS TDD

const [dadosSelecionados, setDadosSelecionados] = useState([]);
  const [opcoesSelect, setOpcoesSelect] = useState([]);
  
  useEffect(() => {
    // Fazer uma solicitação ao servidor para buscar os dados da outra coleção
    axios.get('/sua-rota-para-buscar-dados').then((response) => {
      if (response.status === 200) {
        const dados = response.data;
        setDadosSelecionados(dados);
        
        // Manipular os dados para criar as opções do select
        const opcoes = dados.map((item) => ({
          value: item._id, // O valor a ser enviado no formulário
          label: item.nome // O texto a ser exibido no select
        }));
        
        setOpcoesSelect(opcoes);
      } else {
        console.error('Erro na solicitação à API.');
      }
    });
  }, []);
  return (
    <div className="form-container">
      <h2 className="form-heading">Documentos</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="titulo" className="form-label">Título:</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
          />
        </div>
        <div>
        <label>Selecione um item:</label>
      <select>
        {opcoesSelect.map((opcao) => (
          <option key={opcao.value} value={opcao.value}>
            {opcao.label}
          </option>
        ))}
      </select>
        </div>
        <div>
          <label htmlFor="ano" className="form-label">Ano:</label>
          <input
            type="text"
            id="ano"
            name="ano"
            value={formData.ano}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="ultimoAno" className="form-label">Último ano:</label>
          <input
            type="text"
            id="ultimoAno"
            name="ultimoAno"
            value={formData.ultimoAno}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="dataArquivamento" className="form-label">Data Arquivamento:</label>
          <input
            type="text"
            id="dataArquivamento"
            name="dataArquivamento"
            value={formData.dataArquivamento}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="volume" className="form-label">Volume:</label>
          <input
            type="text"
            id="volume"
            name="volume"
            value={formData.volume}
            onChange={handleChange}
          />
        </div>
         <div>
          <label htmlFor="anexo" className="form-label">Anexo:</label>
          <input
            type="text"
            id="anexo"
            name="anexo"
            value={formData.anexo}
            onChange={handleChange}
          />
        </div>   
        <div>
          <label htmlFor="resumo" className="form-label">Resumo:</label>
          <input
            type="text"
            id="resumo"
            name="resumo"
            value={formData.resumo}
            onChange={handleChange}
          />
        </div>  
        <div>
          <label htmlFor="interessado" className="form-label">Interessado:</label>
          <input
            type="text"
            id="interessado"
            name="interessado"
            value={formData.interessado}
            onChange={handleChange}
          />
        </div>  
        <div>
          <label htmlFor="obs" className="form-label">Obs:</label>
          <input
            type="text"
            id="obs"
            name="obs"
            value={formData.obs}
            onChange={handleChange}
          />
        </div>  
        <div>
          <label htmlFor="dataCriacao" className="form-label">Data de criação:</label>
          <input
            type="text"
            id="dataCriacao"
            name="dataCriacao"
            value={formData.dataCriacao}
            onChange={handleChange}
          />
        </div>  
        <button type="submit" className="form-submit">Enviar</button>
        <button className="form-submit">Voltar</button>
      </form>
      {submissionMessage && <p>{submissionMessage}</p>}
    </div>
  );
};

export default Form;
