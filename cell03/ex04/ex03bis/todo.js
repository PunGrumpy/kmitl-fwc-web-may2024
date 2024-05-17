$(document).ready(function () {
  const todoList = $("#todo-list");
  const addButton = $(".add-todo__button");
  const dialogConfirm = $("#dialog-confirm");
  loadTodos();

  addButton.on("click", function () {
    const newTodo = prompt("Enter new ToDo:");
    if (newTodo) {
      addTodoToList(newTodo);
    }
  });

  function addTodoToList(todoText) {
    const todoItem = $("<li>")
      .text(todoText)
      .addClass("todo-item")
      .on("click", function () {
        const todoText = $(this).text();
        showDialogConfirm(todoText);
      });
    todoList.prepend(todoItem);
    saveTodos();
  }

  function showDialogConfirm(todoText) {
    dialogConfirm.show();
    $("#confirm-yes").on("click", function () {
      removeTodoFromList(todoText);
      dialogConfirm.hide();
    });
    $("#confirm-no").on("click", function () {
      dialogConfirm.hide();
    });
  }

  function removeTodoFromList(todoText) {
    const todoItems = $(".todo-item");
    todoItems.each(function () {
      if ($(this).text() === todoText) {
        $(this).remove();
        saveTodos();
      }
    });
  }

  function saveTodos() {
    const todos = todoList.find(".todo-item").map(function () {
      return $(this).text();
    });
    document.cookie = `todos=${JSON.stringify(todos.get())}`;
  }

  function loadTodos() {
    const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
    const todoCookie = cookies.find((cookie) => cookie.startsWith("todos="));
    if (todoCookie) {
      const todos = JSON.parse(todoCookie.split("=")[1]);
      todos.reverse().forEach((todo) => addTodoToList(todo));
    }
  }
});
