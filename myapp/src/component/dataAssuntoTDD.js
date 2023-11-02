import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import '../component/dataTables.css'

function App() {
    const [assuntoTDD, setAssuntoTDD] = useState([]);

    const fetchAssuntoTDD = async () => {
        try {

            const response = await axios.get('http://localhost:3007/api/v1/assuntoTDD/');
            setAssuntoTDD(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        fetchAssuntoTDD();
    }, []);

    const deleteAssuntoTDD = async assuntoTDDId => {
        try {
            console.log('Deleting assuntoTDD with ID:', assuntoTDDId);

            const response = await axios.delete(`http://localhost:3007/api/v1/assuntoTDD/${assuntoTDDId}`);
            console.log('Response:', response);

            if (response.status === 200) {
                fetchAssuntoTDD();
            }
        } catch (error) {
            console.error('Error deleting assuntoTDD:', error);
        }
    };
    const handleExportCSV = () => {
        const csvData = convertToCSV(assuntoTDD);
        const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, 'assuntoTDD.csv');
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
            <a className="btn btn-primary mb-2" href='/formAssuntoTDD'>ADD ASSUNTO TDD</a>
            <button className="btn btn-primary mb-2" onClick={() => handleExportCSV()}>Relatórios</button>

            <h1>Assunto TDD</h1>
            <table>
                <thead>
                    <tr>
                        <th>Código do assunto </th>
                        <th>Título do Assunto</th>
                        <th>Fase corrente</th>
                        <th>Fase intermediária</th>
                        <th>Tempo em arquivo</th>
                        <th>Destinação final</th>
                        <th>Obs</th>
                        <th>Área</th>
                        <th>Procendência</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {assuntoTDD.map(assunto => (
                        <tr key={assunto._id}>
                            <td>{assunto.codigoAssunto}</td>
                            <td>{assunto.tituloAssunto}</td>
                            <td>{assunto.faseCorrente}</td>
                            <td>{assunto.faseIntermediaria}</td>
                            <td>{assunto.tempoArquivo}</td>
                            <td>{assunto.destinacaoFinal}</td>
                            <td>{assunto.obs}</td>
                            <td>{assunto.area}</td>
                            <td>{assunto.procendencia}</td>

                            <td>
                                <button className="btn btn-primary mb-2" onClick={() => deleteAssuntoTDD(assunto._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;
