import {Todo} from './Model';
import {ITodoService} from './ITodoService';
import {TodoState} from "./TodoState";

export class TodoService implements ITodoService {

  private todos: Todo[] = [];
  private lastId = 0;

  constructor(todos: string[]) {
    if (todos) {
      todos.forEach(todo => this.add(todo));
    }
  }

  add(input): Todo {
    const todo: Todo = {
      id: this._generateTodoId(),
      name: null,
      state: TodoState.Active,
    };

    if (typeof input === 'string') {
      todo.name = input;
    } else if (typeof input.name === 'string') {
      todo.name = input.name;
    } else {
      throw new Error('Invalid Todo name!');
    }

    this.todos.push(todo);

    return todo;
  }

  clearCompleted(): void {
    this.todos = this.todos.filter(x => x.state === TodoState.Active);
  }

  getAll(): Todo[] {
    return this._clone(this.todos);
  }

  getById(todoId: number): Todo {
    const todo = this._find(todoId);
    return this._clone(todo);
  }

  toggle(todoId: number): void {
    const todo = this._find(todoId);

    if (!todo) {
      return;
    }

    switch (todo.state) {
      case TodoState.Active:
        todo.state = TodoState.Complete;
        break;

      case TodoState.Complete:
        todo.state = TodoState.Active;
        break;
      default:
        break;
    }
  }

  private _find(todoId: number): Todo {
    const filtered = this.todos.filter(x => x.id === todoId);

    if (filtered.length) {
      return filtered[0];
    }

    return null;
  }

  private _clone<T>(src: T): T {
    const clone = JSON.stringify(src);
    return JSON.parse(clone);
  }

  private _generateTodoId(): number {
    return this.lastId += 1;
  }
}
