import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';

import '../component/dataTables.css'

function App() {
  const [documentos, setDocumentos] = useState([]);

  const fetchDocumentos = async () => {
    try {

      const response = await axios.get('http://localhost:3007/api/v1/documentos/');
      setDocumentos(response.data);
    } catch (error) {
      console.error('Error fetching documentos:', error);
    }
  };

  useEffect(() => {
    fetchDocumentos();
  }, []);

  const deleteDocumento = async documentoId => {
    try {
      console.log('Deleting documento with ID:', documentoId);

      const response = await axios.delete(`http://localhost:3007/api/v1/documentos/${documentoId}`);
      console.log('Response:', response);

      if (response.status === 200) {
        fetchDocumentos();
      }
    } catch (error) {
      console.error('Error deleting doumento:', error);
    }
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

  const handleExportCSV = () => {
    const csvData = convertToCSV(documentos);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'documentos.csv');
  };

  return (
    <div className="App">
      <a className="btn btn-primary mb-2"  href='/form'>ADD DOCUMENTO</a>
      <button className="btn btn-primary mb-2" onClick={() => handleExportCSV()}>Relatórios</button>

      <h1>Documentos</h1>

      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Ano</th>
            <th>Último ano</th>
            <th>Data arquivamento</th>
            <th>Volume</th>
            <th>Anexo</th>
            <th>Resumo</th>
            <th>Interessado</th>
            <th>Obs</th>
            <th>Data criação</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {documentos.map(documento=> (
            <tr key={documento._id}>
              <td>{documento.titulo}</td>
              <td>{documento.ano}</td>
              <td>{documento.ultimoAno}</td>
              <td>{documento.dataArquivamento}</td>
              <td>{documento.volume}</td>
              <td>{documento.anexo}</td>
              <td>{documento.resumo}</td>
              <td>{documento.interessado}</td>
              <td>{documento.obs}</td>
              <td>{documento.dataCriacao}</td>
              <td>
                <button className="btn btn-primary mb-2" onClick={() => deleteDocumento(documento._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default App;
