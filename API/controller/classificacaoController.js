const Classificacao = require('../model/assuntoClassificacao');

exports.createClassificacao = async (req, res) => {
  try {
    const classificacao = new Classificacao(req.body);
    await classificacao.save();
    res.status(201).json(classificacao);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getClassificacoes = async (req, res) => {
  try {
    const classificacoes = await Classificacao.find();
    res.status(200).json(classificacoes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteClassificacao = async (req, res) => {
  try {
    const classificacaoId = req.params.id;
    await Classificacao.findByIdAndDelete(classificacaoId);
    res.status(200).json({ message: 'Classificação excluída com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir classificação:', error);
    res.status(500).json({ message: 'Erro ao excluir classiicação' });
  }
};