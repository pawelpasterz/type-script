import {TodoService} from './TodoService';
import {TodoListComponent} from './TodoListComponent';
import {ITodoService} from './ITodoService';

export class TodoApp {

  private todoService: ITodoService;
  private todoList: TodoListComponent;

  constructor(el, todos) {
    this.todoService = new TodoService(todos);
    this.initialize(el);
  }

  addTodo(todoName) {
    this.todoService.add(todoName);
    this.renderTodos();
  }

  clearCompleted() {
    this.todoService.clearCompleted();
    this.renderTodos();
  }

  renderTodos() {
    const todos = this.todoService.getAll();
    this.todoList.render(todos);
  }

  initialize(el) {
    const addTodoFormEl = el.getElementsByClassName('add-todo')[0];
    const addTodoNameEl = addTodoFormEl.getElementsByTagName('input')[0];
    const todoListEl = el.getElementsByClassName('todo-list')[0];
    const clearCompletedEl = el.getElementsByClassName('clear-completed')[0];

    addTodoFormEl.addEventListener('submit', (event) => {
      this.addTodo(addTodoNameEl.value);
      addTodoNameEl.value = '';
      event.preventDefault();
    });

    todoListEl.addEventListener('todo-toggle', (event) => {
      const todoId = event.detail.todoId;
      this.todoService.toggle(todoId);
      this.renderTodos();
    });

    clearCompletedEl.addEventListener('click', () => {
      this.clearCompleted();
    });

    this.todoList = new TodoListComponent(todoListEl);

    this.renderTodos();
  }

}