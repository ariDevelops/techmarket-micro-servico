const express = require('express');
const tasksController = require('./controllers/tasksController');


const router = express.Router();

// quem cuidará da rota tasks é o tasksController
router.get('/tasks', tasksController.getAll);



module.exports = router;