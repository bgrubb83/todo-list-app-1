/* Variables */
let todoList;

/* Functions */
function deleteTodoListItem(todoListItemTimestamp) {

    // remove the todo list item from the todoList array
    let todoListItemToDelete;
    todoList.forEach((todoListItem) => {
        if (todoListItem.timestamp && todoListItem.timestamp === todoListItemTimestamp) {
            todoListItemToDelete = todoListItem;
        }
    });
    if (todoListItemToDelete) {
        const indexToRemove = todoList.indexOf(todoListItemToDelete);
        console.log(indexToRemove);
        todoList = todoList.slice(0, indexToRemove).concat(todoList.slice(indexToRemove+1, todoList.length));
        console.log(todoList);
    }

    // Remove the todo list item from the page
    const selectedToDoListItem = document.querySelector(`[data-timestamp="${todoListItemTimestamp}"]`).parentElement;
    selectedToDoListItem.parentNode.removeChild(selectedToDoListItem);
}

function handleDelete(event) {
    const todoListItemTimestamp = event.target.previousElementSibling.dataset.timestamp;
    deleteTodoListItem(todoListItemTimestamp);
}

/* Wait for DOM content to load */
document.addEventListener('DOMContentLoaded', () => {
    // Create todo list items
    todoList = [
    {text: 'Wash the car', timestamp: '1580419503630'},
    {text: 'Feed the cat', timestamp: '1580419538130'},
    {text: 'Go to work', timestamp: '1580419538140'},
    {text: 'Eat pizza', timestamp: '1580419538150'},
    {text: 'Learn to fly', timestamp: '1580419538160'},
    {text: 'Read a book', timestamp: '1580419538170'},
    ];

    // Create HTML elements
    const todoListContainer = document.querySelector("#todo-list-container");
    const finalTodoListHTML = document.createElement("section");

    todoList.forEach((todoListItem) => {
        const todoListItemHTML = `
        <section class="todo-list-item-container">
            <h1 data-timestamp="${todoListItem.timestamp}">${todoListItem.text}</h1>
            <section class="todo-list-item-delete">
            X
            </section>
        </section>`;
        finalTodoListHTML.innerHTML += (todoListItemHTML);
    });

    // Apppend the todo list items
    todoListContainer.appendChild(finalTodoListHTML);

    // Get all of the delete buttons
    const todoListItemDeleteIcons = document.querySelectorAll(".todo-list-item-delete")

    // Hook up the delete function to the delete buttons
    todoListItemDeleteIcons.forEach((el) => {
        el.addEventListener("click", handleDelete);
    });
  })

