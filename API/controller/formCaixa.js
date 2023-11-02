const Caixa = require('../model/modelCaixa');

exports.createCaixa = async (req, res) => {
  try {
    const caixa = new Caixa(req.body);
    await caixa.save();
    res.status(201).json(caixa);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getCaixas = async (req, res) => {
  try {
    const caixas = await Caixa.find();
    res.status(200).json(caixas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCaixa = async (req, res) => {
  try {
    const caixaId = req.params.id;
    await Caixa.findByIdAndDelete(caixaId);
    res.status(200).json({ message: 'Caixa excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir caixa:', error);
    res.status(500).json({ message: 'Erro ao excluir caixa' });
  }
};