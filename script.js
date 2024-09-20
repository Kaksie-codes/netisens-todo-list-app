// DOM SELECTORS
const inputElement = document.getElementById('input'); // Selecting the input element where users type their tasks
const addButton = document.querySelector('.add-btn'); // Selecting the button for adding tasks
const clearAllButton = document.querySelector('.clear-btn'); // Selecting the "Clear All" button
const filterTodosElement = document.querySelector('#filter-todos'); // Selecting the dropdown to filter tasks (All, Pending, Completed)
const taskBoxElement = document.querySelector('.task-box'); // Selecting the container (ul) that will display all the tasks
// console.log(taskBoxElement);


// Clear the task box initially to ensure no tasks are displayed before loading
taskBoxElement.innerHTML = '';

// Variable to hold the current task text
let task;

// Load existing todos from localStorage, if available, or initialize an empty array
let todos = JSON.parse(localStorage.getItem('todos')) || [];
updateScreen(); // Display the tasks on the screen

// Variable to hold the structure of the new task as an object
let todoObject;

// Function to create a new todo task from the user's input
const createTodo = (e) => {
    task = inputElement.value.trim(); // Get the value of the task input, trimmed of whitespace

    // Create a new task object with the task text and mark it as not completed
    todoObject = {
        task: task,
        isCompleted: false
    };

    // Check if the "Enter" key (key code 13) was pressed to add the task
    if(e.keyCode === 13){
        addToTodosArray(); // Add the task to the todo array
    }
}

// Function to add the new task to the todos array
function addToTodosArray(){
    todos.push(todoObject); // Add the new task object to the todos array
    localStorage.setItem('todos', JSON.stringify(todos)); // Save the updated todos array to localStorage
    updateScreen(); // Update the screen to display the new task
}

console.log(todos);

// Add an event listener to the "Add" button to add a new task when clicked
addButton.addEventListener('click', () => {
    addToTodosArray();
})


// inputElement.addEventListener('keyup', (e) => createTodo(e));

// Add an event listener to the input field to listen for "Enter" key presses
inputElement.addEventListener('keyup', function(e){
    createTodo(e);
});

// Function to filter todos based on the selected option (All, Pending, Completed)
function filterTodos(){
    const filter = filterTodosElement.value.toLowerCase(); // Get the selected filter option (converted to lowercase)
    const filteredTodos = []; // Create an empty array to store filtered tasks

    // Iterate through all the todos
    for(let todo of todos){
        // If the task text includes the filter text, add it to the filteredTodos array
        if(todo.task.toLowerCase().includes(filter)){
            filteredTodos.push(todo);
        }
    }

    // Apply the filter based on the selected value
    if(filter === 'pending'){
        todos = todos.filter(todo => todo.isCompleted === false); // Filter for pending (incomplete) tasks
    }else if(filter === 'completed'){
        todos = todos.filter(todo => todo.isCompleted === true); // Filter for completed tasks
    }

    updateScreen(); // Update the screen with the filtered tasks
}

// Add an event listener to the filter dropdown to filter tasks whenever the selected option changes
filterTodosElement.addEventListener('change', filterTodos)

// Function to delete a specific task from the todos array
function deleteTodo(index){
    todos.splice(index, 1); // Remove the task at the specified index
    localStorage.setItem('todos', JSON.stringify(todos)); // Save the updated todos array to localStorage
    updateScreen(); // Update the screen to reflect the deletion
}

// Function to clear all tasks
function clearAllTodos(){
    todos = []; // Empty the todos array
    localStorage.setItem('todos', JSON.stringify(todos)); // Save the empty todos array to localStorage
    updateScreen(); // Clear the tasks from the screen
}

// Add an event listener to the "Clear All" button to clear all tasks when clicked
clearAllButton.addEventListener('click', clearAllTodos);

// Function to edit an existing task
function editTodo(index){
    const taskToEdit = prompt(`Edit your task`, todos[index].task); // Prompt the user to edit the task
    todos[index].task = taskToEdit; // Update the task text with the new input
    localStorage.setItem('todos', JSON.stringify(todos)); // Save the updated todos array to localStorage
    updateScreen(); // Update the screen to show the edited task
}

// // Function to update the UI by rendering the current list of todos
// function updateScreen(){ 
//     // Clear the taskBoxElement to remove any existing tasks in the UI
//     taskBoxElement.innerHTML = ''; 

//     // Reset the input field value to an empty string after adding/updating tasks
//     inputElement.value = '';

//     // Loop through the todos array to dynamically create and display each task
//     for(let index = 0; index < todos.length; index++){

//         // Add a new list item for each todo task and append it to the taskBoxElement
//         taskBoxElement.innerHTML += `
//         <li class="task">
//                 <div class="content">
//                     <!-- Checkbox for marking the task as completed -->
//                     <input type="checkbox" id="check-btn-${index}">
                    
//                     <!-- Display the task with edit and delete buttons -->
//                     <div class="spans">
//                         <!-- Label shows the text of the task -->
//                         <label class="text" for="check-btn-${index}">${todos[index].task}</label>
                        
//                         <!-- Container for edit and delete buttons -->
//                         <span class="settings">
//                             <!-- Edit button to allow editing of the task -->
//                             <button onclick="editTodo(${index})">
//                                 <i class="fa fa-pencil" aria-hidden="true"></i>Edit
//                             </button>

//                             <!-- Delete button to remove the task -->
//                             <button onclick="deleteTodo(${index})">
//                                 <i class="fa fa-trash"></i>Delete
//                             </button>
//                         </span>
//                     </div>
//                 </div>                
//         </li>`
//     }
// }


// Function to display all tasks on the screen
function updateScreen(){
    taskBoxElement.innerHTML = ''; // Clear the task list before displaying the updated tasks
    inputElement.value = ''; // Clear the input field after adding a task

    // Loop through the todos array and create the list of tasks
    for(let index = 0; index < todos.length; index++){
       const li = document.createElement('li'); // Create a new list item element for each task
       li.classList.add('task'); // Add the 'task' class to the list item

       const div = document.createElement('div'); // Create a div to hold the task content
       div.classList.add('content'); // Add the 'content' class

       const textInput = document.createElement('input'); // Create a checkbox for task completion
       textInput.setAttribute('type', 'checkbox'); // Set the checkbox type

       const spanDiv = document.createElement('div'); // Create a div to hold the task text and buttons
       spanDiv.classList.add('spans'); // Add the 'spans' class

       const textSpan = document.createElement('span'); // Create a span for the task text
       textSpan.classList.add('text'); // Add the 'text' class
       textSpan.textContent = todos[index].task; // Set the span's text to the task text

       const settingsSpan = document.createElement('span'); // Create a span for the edit and delete buttons
       settingsSpan.classList.add('settings'); // Add the 'settings' class

       const editButton = document.createElement('button'); // Create the Edit button
       editButton.innerHTML = `<i class="fa fa-pencil" aria-hidden="true"></i>Edit`; // Set the Edit button's HTML
       editButton.addEventListener('click', () => editTodo(index)); // Add an event listener to the Edit button

       const deleteButton = document.createElement('button'); // Create the Delete button
       deleteButton.innerHTML = `<i class="fa fa-trash"></i>Delete`; // Set the Delete button's HTML
       deleteButton.addEventListener('click', () => deleteTodo(index)); // Add an event listener to the Delete button

       // Append the created elements to the DOM
       taskBoxElement.appendChild(li); // Add the list item to the task box
       li.appendChild(div); // Add the content div to the list item
       div.appendChild(textInput); // Add the checkbox to the content div
       div.appendChild(spanDiv); // Add the spans div to the content div
       spanDiv.appendChild(textSpan); // Add the task text span to the spans div
       spanDiv.appendChild(settingsSpan); // Add the settings span to the spans div
       settingsSpan.appendChild(editButton); // Add the Edit button to the settings span
       settingsSpan.appendChild(deleteButton); // Add the Delete button to the settings span
    }
}


// let myArray =[
//     {task: 'Buy Cow', isCompleted: false},
//     {task: 'Buy Crocodile', isCompleted: false},
//     {task: 'Buy Goat', isCompleted: false},
//     {task: 'Buy Chicken', isCompleted: false},
//     {task: 'Buy Cat', isCompleted: false},
// ];
// console.log(myArray[3].task);