const  tbody = document.querySelector('tbody');
const addForm = document.querySelector('.add-form');
const inputTask = document.querySelector('.input-task');


const formatDate = (dateUTC) => {
    const options = { dateStyle: 'long', timeStyle: 'short' };
    const date = new Date(dateUTC).toLocaleDateString('pt-BR', options);
    return date;
}


const fetchTasks = async () => {
    const response = await fetch('http://localhost:3333/tasks');
    const tasks = await response.json();
    return tasks;
}



const createElement = (tag, innerText = '', innerHTML = '') => {
    const element = document.createElement(tag);
    if (innerText) { element.innerText = innerText; }
    
    if (innerHTML) { element.innerHTML = innerHTML; }

    return element;
}

const createSelect = (value) => {
    const options = `
    <option value="pendente">pendente</option>
    <option value="em andamento">em andamento</option>
    <option value="concluída">concluída</option>
    `;

    const select = createElement('select', '', options);
    select.value = value;

    return select;
}


const createTaskRow = (task) => {
//desestruturação, poderiamos usar tambem task.title
    const {id, title, created_at, status} = task; 

    const tr = createElement('tr');
    const tdTitle = createElement('td', title);
    const tdCreatedAt = createElement('td', formatDate(created_at));
    const tdStatus = createElement('td');
    const tdActions = createElement('td');

    const select = createSelect(status);
    // target sempre recupera o valor da propriedade "value" do elemento que disparou o evento
    select.addEventListener('change', ({target}) => updateTask({id, title, created_at, status: target.value}));

    const editButton = createElement('button', '','<span class="material-symbols-outlined">edit</span>');
    const deleteButton = createElement('button', '','<span class="material-symbols-outlined">delete</span>');
    deleteButton.addEventListener('click', () => deleteTask(id));

    editButton.classList.add('btn-action');
    deleteButton.classList.add('btn-action');

    tdStatus.appendChild(select);
    tdActions.appendChild(editButton);
    tdActions.appendChild(deleteButton);

     tr.appendChild(tdTitle);
     tr.appendChild(tdCreatedAt);
     tr.appendChild(tdStatus);
     tr.appendChild(tdActions);


      return tr; 
}

const loadTasks = async () => {
    const tasks = await fetchTasks();

    //limpa a tela antes de carregar as tasks
    tbody.innerHTML = '';


    tasks.forEach((task) => { 
     const tr = createTaskRow(task);
     tbody.appendChild(tr);
    });
}

const addTask = async (event) => {
    event.preventDefault();

    const task = { title: inputTask.value };

    await fetch('http://localhost:3333/tasks', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });

    loadTasks();
    // limpa o input
    inputTask.value = '';
}

const deleteTask = async (id) => { 
    await fetch(`http://localhost:3333/tasks/${id}`, {
        method: 'delete',
    });
    
    loadTasks();
}

const updateTask = async (task) => {
    const {id, title, created_at, status} = task; 

    await fetch(`http://localhost:3333/tasks/${id}`, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, created_at, status }),
    });

    loadTasks();
}

addForm.addEventListener('submit', addTask);