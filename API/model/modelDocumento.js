const mongoose = require('mongoose');

const documentoSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  ano: { type: Number, required: true },
  ultimoAno: { type: Number, required: true },
  dataArquivamento: { type: Date, required: true },
  volume: { type: Number, required: true },
  anexo: { type: Number, required: true },
  resumo: { type: String, required: true },
  interessado: { type: String, required: true },
  obs: { type: String, required: true },
  dataCriacao: { type: String, required: true },

});

const Documento = mongoose.model('Documento', documentoSchema);

module.exports = Documento;
