const Documento = require('../model/modelDocumento');

exports.createDocumentos = async (req, res) => {
  try {
    const documento = new Documento(req.body);
    await documento.save();
    res.status(201).json(documento);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getDocumentos = async (req, res) => {
  try {
    const documentos = await Documento.find();
    res.status(200).json(documentos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteDocumento = async (req, res) => {
  try {
    const documentoId = req.params.id;
    await Documento.findByIdAndDelete(documentoId);
    res.status(200).json({ message: 'Documento excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir documento:', error);
    res.status(500).json({ message: 'Erro ao excluir documento' });
  }
};