const express = require('express');
const router = require('./router');
const cors = require('cors');

// Inicializacao do express
const app = express();
// Permite que o express entenda JSON no body das requisições
app.use(express.json());

app.use(cors());

// Usa o router para gerenciar as rotas
app.use(router);


// app.get('/', (req, res) => { res.status(200).send('Hello World!'); });

module.exports = app;
