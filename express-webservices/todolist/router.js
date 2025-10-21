const express = require('express');
const tasksController = require('./controllers/tasksController');
const tasksMiddleware = require('./middlewares/tasksMiddleware');


const router = express.Router();

// quem cuidará da rota tasks é o tasksController
router.get('/tasks', tasksController.getAll);
router.post('/tasks', tasksMiddleware.validateTitleField, tasksController.createTask);

router.delete('/tasks/:id', tasksController.deleteTask); // os 2 ":" pontos significam parametro
router.put('/tasks/:id', 
    tasksMiddleware.validateStatusField, 
    tasksMiddleware.validateTitleField,
    tasksController.updateTask
);



module.exports = router;