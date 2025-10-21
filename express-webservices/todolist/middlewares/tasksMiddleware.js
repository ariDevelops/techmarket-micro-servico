const validateTitleField = (request, resposnse, next) => {
    const { body } = request;

    if(body.title === undefined) {
       return resposnse.status(400).json({ message: 'O campo title é obrigatorio'})
    }

    if(body.title === '') {
       return resposnse.status(400).json({ message: 'O campo title não pode ser vazio'})
    }

    next(); // caso nenhuma das validacoes ative, entao passamos para o proximo middleware
            // ou o proximo controller
};

const validateStatusField = (request, response, next) => {
    const { body } = request;

    if(body.status === undefined) {
       return response.status(400).json({ message: 'O campo status é obrigatorio'})
    }

    if(body.status === '') {
       return response.status(400).json({ message: 'O campo status não pode ser vazio'})
    }

    next();
}

module.exports = {
    validateTitleField,
    validateStatusField,
};