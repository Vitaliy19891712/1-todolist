import { addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC, todolistReduser } from "./todolist-reduser";
import { v1 } from "uuid";
import { TodolistsType } from "../App";

test("correct todolist should be remove", () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  const startState: Array<TodolistsType> = [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ];

  const endState: Array<TodolistsType> = todolistReduser(startState, removeTodolistAC(todolistId1));

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});

test("correct todolist should be added", () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  const startState: Array<TodolistsType> = [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ];

  const endState: Array<TodolistsType> = todolistReduser(startState, addTodolistAC("New Todolist", v1()));

  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe("New Todolist");
});

test("correct todolist should change is name", () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let newTodoListTitle = "Mew Todolist";

  const startState: Array<TodolistsType> = [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ];

  const endState: Array<TodolistsType> = todolistReduser(startState, changeTodolistTitleAC(newTodoListTitle, todolistId1));

  expect(endState.length).toBe(2);
  expect(endState[0].title).toBe(newTodoListTitle);
});

test("correct todolist should change filter", () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  const startState: Array<TodolistsType> = [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ];

  const endState: Array<TodolistsType> = todolistReduser(startState, changeTodolistFilterAC("active", todolistId1));

  expect(endState.length).toBe(2);
  expect(endState[0].filter).toBe("active");
});
