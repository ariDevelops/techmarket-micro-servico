const tasksModel = require('../models/tasksModel');

const getAll = async (request, response) => {

    const retorno_do_model = await tasksModel.getAll();
    return response.status(200).json(retorno_do_model);
};

module.exports = {
    getAll
};