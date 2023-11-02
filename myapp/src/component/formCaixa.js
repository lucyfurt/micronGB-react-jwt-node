import React, { useState } from 'react';
import axios from 'axios';

import './formCaixa.css'

const FormCaixa = () => {
  const [formData, setFormData] = useState({
    numCaixa: '',
    qtdDoc: '',
    situacaoFisica: '',
    tipoDoc: '',
    area: '',
    lote: '',
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
      const response = await axios.post('http://localhost:3007/api/v1/caixas/', formData);
      setSubmissionMessage('Formulário enviado com sucesso!');
      console.log(response.data);
    } catch (error) {
      setSubmissionMessage('Erro ao submeter o formulário. Por favor, Tente novamente mais tarde!');
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-heading">Caixas</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="numCaixa" className="form-label">Num. caixa</label>
          <input
            type="text"
            id="numCaixa"
            name="numCaixa"
            value={formData.numCaixa}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="qtdDoc" className="form-label">Qtd. doc:</label>
          <input
            type="text"
            id="qtdDoc"
            name="qtdDoc"
            value={formData.qtdDoc}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="situacaoFisica" className="form-label">Situação física:</label>
          <input
            type="text"
            id="situacaoFisica"
            name="situacaoFisica"
            value={formData.situacaoFisica}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="tipoDoc" className="form-label"> Tipo de documento:</label>
          <input
            type="text"
            id="tipoDoc"
            name="tipoDoc"
            value={formData.tipoDoc}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="area" className="form-label">Área:</label>
          <input
            type="text"
            id="area"
            name="area"
            value={formData.area}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="lote" className="form-label">Lote:</label>
          <input
            type="text"
            id="lote"
            name="lote"
            value={formData.lote}
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

export default FormCaixa;
