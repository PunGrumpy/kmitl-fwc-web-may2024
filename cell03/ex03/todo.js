document.addEventListener("DOMContentLoaded", function () {
  const todoList = document.getElementById("todo-list");
  const addButton = document.querySelector(".add-todo__button");

  loadTodos();

  addButton.addEventListener("click", function () {
    const newTodo = prompt("Enter new todo:");
    if (newTodo) {
      addTodoToList(newTodo);
    }
  });

  function addTodoToList(todoText) {
    const todoItem = document.createElement("li");
    todoItem.textContent = todoText;
    todoItem.classList.add("todo-item");

    todoItem.addEventListener("click", function () {
      const confirmDelete = confirm("Do you want to remove this todo?");
      if (confirmDelete) {
        todoList.removeChild(todoItem);
        saveTodos();
      }
    });

    todoList.insertBefore(todoItem, todoList.firstChild);
    saveTodos();
  }

  function saveTodos() {
    const todos = Array.from(todoList.querySelectorAll(".todo-item")).map(
      (item) => item.textContent,
    );
    document.cookie = `todos=${JSON.stringify(todos)}`;
  }

  function loadTodos() {
    const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
    const todoCookie = cookies.find((cookie) => cookie.startsWith("todos="));

    if (todoCookie) {
      const todos = JSON.parse(todoCookie.split("=")[1]);
      todos.forEach((todo) => addTodoToList(todo));
    }
  }
});
