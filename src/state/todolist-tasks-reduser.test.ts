import { addTodolistAC, removeTodolistAC, todolistReducer } from "./todolist-reduser";
import { TodolistsType, TaskStateType } from "../App";
import { tasksReducer } from "./tasks-reduser";

test("ids should be equals", () => {
  const startTasksState: TaskStateType = {};
  const startTodolistsState: Array<TodolistsType> = [];

  const action = addTodolistAC("new todolist");

  const endTasksState = tasksReducer(startTasksState, action);
  const endTodolistsState = todolistReducer(startTodolistsState, action);

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id;

  expect(idFromTasks).toBe(action.payload.todolistId);
  expect(idFromTodolists).toBe(action.payload.todolistId);
});

