const mongoose = require('mongoose');

const classificacaoSchema = new mongoose.Schema({
  titulo: { type:String, required: true },
  direito: { type: String, required: true },
  tempoArquivo: { type: Number, required: true },  
   
});

const Classificacao = mongoose.model('Classificacao', classificacaoSchema);

module.exports = Classificacao;
