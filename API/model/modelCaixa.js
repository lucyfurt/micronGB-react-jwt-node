const mongoose = require('mongoose');

const caixaSchema = new mongoose.Schema({
  numCaixa: { type:Number, required: true },
  qtdDoc: { type: Number },
  situacaoFisica: { type: String, required: true },
  tipoDoc: { type: String, required: true },
  area: { type: String, required: true },
  lote: { type: String, required: true },
   
});

const Caixa = mongoose.model('Caixa', caixaSchema);

module.exports = Caixa;
