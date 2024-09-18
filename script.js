// DOM SELECTORS
const inputElement = document.getElementById('input');
const addButton = document.querySelector('.add-btn');
const clearAllButton = document.querySelector('.clear-btn');
const filterTodos = document.querySelector('#filter-todos');
const taskBoxElement = document.querySelector('.task-box');
// console.log(taskBoxElement);

taskBoxElement.innerHTML = '';

let task;

// empty array of todos
let todos = [];

let todoObject;

const createTodo = (e) => {
    console.log(e)
    task = inputElement.value.trim();
    console.log(task);
    console.log(task.length);

    todoObject = {
        task: task,
        isCompleted: false
    }
    console.log(todoObject);

    if(e.keyCode === 13){
        addToTodosArray();
    }
    
}

function addToTodosArray(){
    todos.push(todoObject);
    console.log(todos);
    updateScreen();
}

console.log(todos);

addButton.addEventListener('click', () => {
    addToTodosArray();
})


// inputElement.addEventListener('keyup', (e) => createTodo(e));

inputElement.addEventListener('keyup', function(e){
    createTodo(e);
});

function updateScreen(){   
    taskBoxElement.innerHTML = ''; 
    for(let index = 0; index < todos.length; index++){
        taskBoxElement.innerHTML+= `
        <li class="task">
                <div class="content">
                    <input type="checkbox">
                    <div class="spans">
                        <span class="text">${todos[index].task}</span>
                        <span class="settings">
                            <button><i class="fa fa-pencil" aria-hidden="true"></i>Edit</button>
                            <button><i class="fa fa-trash"></i>Delete</button>
                        </span>
                    </div>
                </div>                
        </li>`
    }
}