const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const formDocumentos = require('../controller/formDocumento');
const formCaixa = require('../controller/formCaixa');

const assuntoClassificacao = require('../controller/classificacaoController')
const assuntoTDD = require('../controller/assuntoTDD')
const mongoURI = 'mongodb+srv://lucianafurtado10:lulu1010@cluster0.rxe1syz.mongodb.net/?retryWrites=true&w=majority';

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 3007;
const router = express.Router();

app.use('/api/v1', router);

/*Rotas*/
const rotas = require('../route/rotas')
router.route('/usuarios').get(require('../JWT'), rotas.getUsuarios).post(rotas.postUsuarios);
router.route('/login').post(rotas.login);

/*Rotas formDocumento*/
router.post('/documentos', formDocumentos.createDocumentos);
router.get('/documentos', formDocumentos.getDocumentos);
router.delete('/documentos/:id', formDocumentos.deleteDocumento);


/*Rotas formCaixa*/
router.post('/caixas', formCaixa.createCaixa);
router.get('/caixas', formCaixa.getCaixas);
router.delete('/caixas/:id', formCaixa.deleteCaixa);

/*Rotas assuntoClassificacao*/
router.post('/classificacoes', assuntoClassificacao.createClassificacao);
router.get('/classificacoes', assuntoClassificacao.getClassificacoes);
router.delete('/classificacoes/:id', assuntoClassificacao.deleteClassificacao);

/*Rotas assuntoTDD*/
router.post('/assuntotdd', assuntoTDD.createAssuntoTDD);
router.get('/assuntotdd', assuntoTDD.getAssuntosTDD);
router.delete('/assuntotdd/:id', assuntoTDD.deleteAssuntoTDD);


mongoose.connect(mongoURI, { useUnifiedTopology: true, useNewUrlParser: true });
app.listen(port);
console.log('conectado a porta ' + port);