import { addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC, todolistReducer } from "./todolist-reduser";
import { v1 } from "uuid";
import { TodolistsType } from "../AppWithRedux";

let todolistId1: string;
let todolistId2: string;
let startState: Array<TodolistsType>;

beforeEach(() => {
  todolistId1 = v1();
  todolistId2 = v1();

  startState = [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ];
});

test("correct todolist should be remove", () => {
  const endState: Array<TodolistsType> = todolistReducer(startState, removeTodolistAC(todolistId1));

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});

test("correct todolist should be added", () => {
  const endState: Array<TodolistsType> = todolistReducer(startState, addTodolistAC("New Todolist"));

  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe("New Todolist");
});

test("correct todolist should change is name", () => {
  let newTodoListTitle = "Mew Todolist";

  const endState: Array<TodolistsType> = todolistReducer(startState, changeTodolistTitleAC(newTodoListTitle, todolistId1));

  expect(endState.length).toBe(2);
  expect(endState[0].title).toBe(newTodoListTitle);
});

test("correct todolist should change filter", () => {
  const endState: Array<TodolistsType> = todolistReducer(startState, changeTodolistFilterAC("active", todolistId1));

  expect(endState.length).toBe(2);
  expect(endState[0].filter).toBe("active");
});
