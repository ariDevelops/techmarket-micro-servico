const express = require('express');
const router = require('./router');

// Inicializacao do express e call do router
const app = express();
app.use(router);


// app.get('/', (req, res) => { res.status(200).send('Hello World!'); });

module.exports = app;