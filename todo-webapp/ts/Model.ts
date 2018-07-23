import {TodoState} from "./TodoState";

export interface Todo {
  id: number;
  name: string;
  state: TodoState;
}