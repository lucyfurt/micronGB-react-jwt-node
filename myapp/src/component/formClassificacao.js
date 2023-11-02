import React, { useState } from 'react';
import axios from 'axios';

import './formCaixa.css'

const FormClassificacao = () => {
  const [formData, setFormData] = useState({
    titulo: '',
    direito: '',
    tempoArquivo: '',

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
      const response = await axios.post('http://localhost:3007/api/v1/classificacoes/', formData);
      setSubmissionMessage('Formulário enviado com sucesso!');
      console.log(response.data);
    } catch (error) {
      setSubmissionMessage('Erro ao submeter o formulário. Por favor, Tente novamente mais tarde!');
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-heading">Assunto Classificação</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="titulo" className="form-label">Título</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            value={formData.numCaixa}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="direito" className="form-label">Direito:</label>
          <input
            type="text"
            id="direito"
            name="direito"
            value={formData.direito}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="tempoArquivo" className="form-label">Tempo em arquivamento:</label>
          <input
            type="text"
            id="tempoArquivo"
            name="tempoArquivo"
            value={formData.tempoArquivo}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="form-submit">Enviar</button>
        <button type="submit" className="form-submit">Voltar</button>
      </form>
      {submissionMessage && <p>{submissionMessage}</p>}
    </div>
  );
};

export default FormClassificacao;
