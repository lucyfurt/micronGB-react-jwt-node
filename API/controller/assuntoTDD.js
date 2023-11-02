const AssuntoTDD = require('../model/modelAssuntoTDD');


exports.createAssuntoTDD = async (req, res) => {
  try {
    const assuntoTDD = new AssuntoTDD(req.body);
    await assuntoTDD.save();
    res.status(201).json(assuntoTDD);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAssuntosTDD = async (req, res) => {
  try {
    const assuntosTDD = await AssuntoTDD.find();
    res.status(200).json(assuntosTDD);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAssuntoTDD = async (req, res) => {
  try {
    const assuntoTDDId = req.params.id;
    await AssuntoTDD.findByIdAndDelete(assuntoTDDId);
    res.status(200).json({ message: 'Assunto TDD excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir assunto TDD:', error);
    res.status(500).json({ message: 'Erro ao excluir assunto TDD' });
  }
};