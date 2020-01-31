/* Variables */
let todoList;

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
                X
                </section>
            </section>`;
        finalTodoListHTML.innerHTML += (todoListItemHTML);
    });

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

    // Remove the todo list item from the page
    const selectedToDoListItem = document.querySelector(`[data-timestamp="${todoListItemTimestamp}"]`).parentElement;
    selectedToDoListItem.parentNode.removeChild(selectedToDoListItem);
}

function handleDelete(event) {
    const todoListItemTimestamp = event.target.previousElementSibling.dataset.timestamp;
    deleteTodoListItem(todoListItemTimestamp);
}

function handleAdd(event) {
    event.preventDefault();
    const todoListInputBox = document.querySelector('#todo-list-input');
    const newTodoListItemText = todoListInputBox.value;
    if (newTodoListItemText) {
        todoList.push({ text: newTodoListItemText, timestamp: Date.now().toString() });
        renderTodoList();
    }
    const form = event.target.parentElement;
    form.reset();
}

function hookupDeleteButtons() {
    // Get all of the delete buttons
    const todoListItemDeleteIcons = document.querySelectorAll(".todo-list-item-delete")

    // Hook up the delete function to the delete buttons
    todoListItemDeleteIcons.forEach((el) => {
        el.addEventListener("click", handleDelete);
    });
}

/* Wait for DOM content to load */
document.addEventListener('DOMContentLoaded', () => {
    // Create todo list items
    todoList = [
        { text: 'Wash the car', timestamp: '1580419503630' },
        { text: 'Feed the cat', timestamp: '1580419538130' },
        { text: 'Go to work', timestamp: '1580419538140' },
        { text: 'Eat pizza', timestamp: '1580419538150' },
        { text: 'Learn to fly', timestamp: '1580419538160' },
        { text: 'Read a book', timestamp: '1580419538170' },
    ];

    renderTodoList();
    hookupDeleteButtons();

    // Hook up the input box and add button
    const todoListAddButton = document.querySelector('#todo-list-add-button');
    todoListAddButton.addEventListener("click", handleAdd);
})

