/* Variables */
let todoList;
let todoListInputBox;
let todoListAddButton;

/* Functions */
function clearTodoList() {
    const todoListContainer = document.querySelector("#todo-list-container");
    todoListContainer.innerHTML = `<section id="todo-list-container"></section>`;
}

function renderTodoList() {
    // Clear any existing todo list items
    clearTodoList();

    // Create HTML elements
    const todoListContainer = document.querySelector("#todo-list-container");
    const finalTodoListHTML = document.createElement("section");

    todoList.forEach((todoListItem) => {
        const todoListItemHTML = `
            <section class="todo-list-item-container">
                <h1 data-timestamp="${todoListItem.timestamp}">${todoListItem.text}</h1>
                <section class="todo-list-item-delete">
                👍
                </section>
            </section>`;
        finalTodoListHTML.innerHTML += (todoListItemHTML);
    });

    finalTodoListHTML.innerHTML += '<section id="spacer"></section>'

    // Apppend the todo list items
    todoListContainer.appendChild(finalTodoListHTML);

    // Hook up delete buttons
    hookupDeleteButtons();
}

function removeFromArrayByIndex(array, index) {
    return array.slice(0, index).concat(array.slice(index + 1, array.length));
}

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
        todoList = removeFromArrayByIndex(todoList, indexToRemove);
    }
}

function handleDelete(event) {
    const todoListItemTimestamp = event.target.previousElementSibling.dataset.timestamp;
    deleteTodoListItem(todoListItemTimestamp);
    if (todoList && todoList.length && todoList.length > 0) {
        renderTodoList();
    } else {
        renderCallToAction();
    }
}

function handleAdd(event) {
    event.preventDefault();
    const newTodoListItemText = todoListInputBox.value;
    if (newTodoListItemText) {
        todoList.push({ text: newTodoListItemText, timestamp: Date.now().toString() });
        renderTodoList();
    }
    const form = event.target.parentElement;
    form.reset();
    todoListAddButton.disabled = true;
}

function hookupDeleteButtons() {
    // Get all of the delete buttons
    const todoListItemDeleteIcons = document.querySelectorAll(".todo-list-item-delete")

    // Hook up the delete function to the delete buttons
    todoListItemDeleteIcons.forEach((el) => {
        el.addEventListener("click", handleDelete);
    });
}

function handleKeyUp(event) {
    const newTodoListItemText = todoListInputBox.value;
    if (!newTodoListItemText ||
        newTodoListItemText.length && newTodoListItemText.length < 1) {
        todoListAddButton.disabled = true;
    } else {
        todoListAddButton.disabled = false;
    }
}

function renderCallToAction() {
    const todoListContainer = document.querySelector("#todo-list-container");
    todoListContainer.innerHTML = '<p>Create some todos 👍<p>'
}

/* Wait for DOM content to load */
document.addEventListener('DOMContentLoaded', () => {
    // Create todo list items
    todoList = [];

    if (todoList && todoList.length && todoList.length > 0) {
        renderTodoList();
    } else {
        renderCallToAction();
    }
    hookupDeleteButtons();

    // Hook up the input box and add button
    todoListInputBox = document.querySelector('#todo-list-input');
    todoListInputBox.addEventListener("keyup", handleKeyUp)
    todoListAddButton = document.querySelector('#todo-list-add-button');
    todoListAddButton.addEventListener("click", handleAdd);
    todoListAddButton.disabled = true;
})

