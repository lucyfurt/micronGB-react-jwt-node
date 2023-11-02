const mongoose = require('mongoose');

const assuntoTDDSchema = new mongoose.Schema({
  codigoAssunto: { type:String, required: true },
  tituloAssunto: { type: String, required: true },
  faseCorrente: { type: String },
  faseIntermediaria: { type: String }, 
  tempoArquivo: { type: Number, required: true }, 
  destinacaoFinal: { type: String, required: true },
  obs: { type: String },
  area: { type: String },
  procendencia: { type: String },
   
});

const AssuntoTDD = mongoose.model('AsuntoTDD', assuntoTDDSchema);

module.exports = AssuntoTDD;
