import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import '../component/dataTables.css'

function App() {
    const [classificacoes, setClassificacoes] = useState([]);

    const fetchClassificacoes = async () => {
        try {

            const response = await axios.get('http://localhost:3007/api/v1/classificacoes/');
            setClassificacoes(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        fetchClassificacoes();
    }, []);

    const deleteClassificacao = async classificacaoId => {
        try {
            console.log('Deleting classificação with ID:', classificacaoId);

            const response = await axios.delete(`http://localhost:3007/api/v1/classificacoes/${classificacaoId}`);
            console.log('Response:', response);

            if (response.status === 200) {
                fetchClassificacoes();
            }
        } catch (error) {
            console.error('Error deleting classificacao:', error);
        }
    };
    const handleExportCSV = () => {
        const csvData = convertToCSV(classificacoes);
        const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, 'classificacoes.csv');
    };
    const convertToCSV = (data) => {
        const csvRows = [];

        // Header row
        const headers = Object.keys(data[0]);
        csvRows.push(headers.join(','));

        // Data rows
        for (const row of data) {
            const values = headers.map(header => {
                const cellValue = row[header];
                // Handle values that might contain commas or quotes
                if (typeof cellValue === 'string') {
                    return `"${cellValue}"`;
                }
                return cellValue;
            });
            csvRows.push(values.join(','));
        }

        return csvRows.join('\n');
    };

    return (
        <div className="App">
            <a className="btn btn-primary mb-2" href='/formClassificacao'>ADD Classificação</a>
            <button className="btn btn-primary mb-2" onClick={() => handleExportCSV()}>Relatórios</button>

            <h1>Assunto Classificação</h1>
            <table>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Direito</th>
                        <th>Tempo em Arquivo</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {classificacoes.map(classificacao => (
                        <tr key={classificacao._id}>
                            <td>{classificacao.titulo}</td>
                            <td>{classificacao.direito}</td>
                            <td>{classificacao.tempoArquivo}
                            </td>
                            <td>
                                <button className="btn btn-primary mb-2" onClick={() => deleteClassificacao(classificacao._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;
