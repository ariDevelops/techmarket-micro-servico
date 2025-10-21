const connection = require('./connection');

// ================================== GET =============================================
// retornará todas as tarefas do banco de dados
const getAll = async () => {
    // O metodo execute retorna um array com dois elementos
    // O primeiro elemento é o resultado da consulta
    // O segundo elemento são os metadados da consulta

    // adicionaremos o array com o elemento da consulta na variavel tasks
   const [tasks, metadados]= await connection.execute('SELECT * FROM tasks'); 
   return tasks;
}


// ================================== POST =============================================
// realizara a inserção de uma nova tarefa 
// a variavel de parametro task é um body param "json" advindo do front-end
// que conterá os novos valores referentes á title, status e created_at.
// Para o nosso caso só precisaremos do primeiro campo title
// e adicionaremos a uma varivel de mesmo nome "title"
const createTask = async (task) => {
    const {title} = task;

    const dateUTC = new Date(Date.now()).toUTCString();

    const [createdTask, metadados] = await connection.execute(
        'INSERT INTO tasks(title, status, created_at) VALUES (?, ?, ?)',
        [title, 'pendente', dateUTC]
    );

    return createdTask;
    // Uma vez que o createdTask é retornara um objeto como:
//     {
// 	"fieldCount": 0,
// 	"affectedRows": 1,
// 	"insertId": 2,
// 	"info": "",
// 	"serverStatus": 2,
// 	"warningStatus": 0,
// 	"changedRows": 0
//    }
    // Nos podemos retornar apenas a chave desejada ao inves do objeto inteiro
    // como -> return { id: createdTask.insertId };
}


// ================================== DELETE =============================================
const deleteTask = async (id) => {
    const [removedTask, metadados] = await connection.execute('DELETE FROM tasks WHERE id = ?', [id]);

    return removedTask;
}






// ================================== UPDATE =============================================
const updateTask = async (id, taskData) => {
    // recupera algumas informações do objeto referentes ao titulo e status da query
    const { title, status } = taskData;

    // Executa a query sql propriamete dita
    const query = 'UPDATE tasks SET title = ?, status = ? WHERE id = ?';
    const [updatedTask, metadados] = await connection.execute(query, [title, status, id]);

    return updatedTask;
}

module.exports = {
    getAll,
    createTask,
    deleteTask,
    updateTask,
};