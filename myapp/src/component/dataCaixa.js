import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import '../component/dataTables.css'

function App() {
  const [caixas, setCaixas] = useState([]);
  
  const fetchCaixas = async () => {
    try {

      const response = await axios.get('http://localhost:3007/api/v1/caixas/');
      setCaixas(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchCaixas();
  }, []);

  const deleteCaixa = async caixaId => {
    try {
      console.log('Deleting caixa with ID:', caixaId);

      const response = await axios.delete(`http://localhost:3007/api/v1/caixas/${caixaId}`);
      console.log('Response:', response);
      

      if (response.status === 200) {
        fetchCaixas();
      }
    } catch (error) {
      console.error('Error deleting caixa:', error);
    }
  };
  const handleExportCSV = () => {
    const csvData = convertToCSV(caixas);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'caixas.csv');
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
      <a className="btn btn-primary mb-2"  href='/formCaixa'>ADD CAIXA</a>    
      <button className="btn btn-primary mb-2" onClick={() => handleExportCSV()}>Relatórios</button>

      <h1>Caixas</h1>
      <table>
        <thead>
          <tr>
            <th>Número da caixa</th>
            <th>Classificação</th>
            <th>Qtd. Documentos</th>
            <th>Prazo de guarda</th>
            <th>Destino final</th>
            <th>Modificado por</th>
            <th>Docs/cx</th>
            <th>Lote</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {caixas.map(caixa => (
            <tr key={caixa._id}>
              <td>{caixa.numCaixa}</td>
              <td>{caixa.qtdDoc}</td>
              <td>{caixa.situacaoFisica}</td>
              <td>{caixa.tipoDoc}</td>
              <td>{caixa.area}</td>
              <td>{caixa.lote}</td>
              
              <td>
                <button className="btn btn-primary mb-2" onClick={() => deleteCaixa(caixa._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
