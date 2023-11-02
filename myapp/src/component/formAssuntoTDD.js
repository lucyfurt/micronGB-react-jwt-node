import React, { useState } from 'react';
import axios from 'axios';

import './formCaixa.css'

const FormAssuntoTDD = () => {
    const [formData, setFormData] = useState({
        codigoAssunto: '',
        tituloAssunto: '',
        faseCorrente: '',
        faseIntermediaria: '',
        tempoArquivo: '',
        destinacaoFinal: '',
        obs: '',
        area: '',
        procendencia: '',
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
            const response = await axios.post('http://localhost:3007/api/v1/assuntoTDD/', formData);
            setSubmissionMessage('Formulário enviado com sucesso!');
            console.log(response.data);
        } catch (error) {
            setSubmissionMessage('Erro ao submeter o formulário. Por favor, Tente novamente mais tarde!');
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="form-container">
            <h2 className="form-heading">Assunto TDD</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="codigoAssunto" className="form-label">Código do assunto</label>
                    <input
                        type="text"
                        id="codigoAssunto"
                        name="codigoAssunto"
                        value={formData.codigoAssunto}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="tituloAssunto" className="form-label">Título do assunto:</label>
                    <input
                        type="text"
                        id="tituloAssunto"
                        name="tituloAssunto"
                        value={formData.tituloAssunto}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="faseCorrente" className="form-label">Fase corrente:</label>
                    <input
                        type="text"
                        id="faseCorrente"
                        name="faseCorrente"
                        value={formData.faseCorrente}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="faseIntermediaria" className="form-label">Fase intermediária:</label>
                    <input
                        type="text"
                        id="faseIntermediaria"
                        name="faseIntermediaria"
                        value={formData.faseIntermediaria}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="tempoArquivo" className="form-label">Tempo em arquivo:</label>
                    <input
                        type="text"
                        id="tempoArquivo"
                        name="tempoArquivo"
                        value={formData.tempoArquivo}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="destinacaoFinal" className="form-label">Destinação final:</label>
                    <input
                        type="text"
                        id="destinacaoFinal"
                        name="destinacaoFinal"
                        value={formData.destinacaoFinal}
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
                    <label htmlFor="procendencia" className="form-label">Procendência:</label>
                    <input
                        type="text"
                        id="procendencia"
                        name="procendencia"
                        value={formData.procendencia}
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

export default FormAssuntoTDD;
