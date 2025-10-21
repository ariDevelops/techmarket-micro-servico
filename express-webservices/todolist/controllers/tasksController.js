const tasksModel = require('../models/tasksModel');

// ================================== GET =============================================
const getAll = async (request, response) => {

    const retorno_do_model = await tasksModel.getAll();
    return response.status(200).json(retorno_do_model);
};

// ================================== POST =============================================
const createTask = async (request, response) => { 
    const newtask = await tasksModel.createTask(request.body);
    return response.status(201).json(newtask);
};



// ================================== DELETE =============================================
const deleteTask = async (request, response) => {
    const { id } = request.params;

    await tasksModel.deleteTask(id);
    return response.status(204).json();
};

// ================================== UPDATE =============================================
const updateTask = async (request, response) => {
    console.log(request.params);
    const  { id }  = request.params;

    await tasksModel.updateTask(id, request.body);
    return response.status(204).json();
}

module.exports = {
    getAll,
    createTask,
    deleteTask,
    updateTask,
};