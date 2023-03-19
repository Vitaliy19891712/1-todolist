import { addTodolistAC, removeTodolistAC } from "./todolist-reduser";
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from "./tasks-reduser";
import { TaskStateType } from "../AppWithRedux";

let startState: TaskStateType;

beforeEach(() => {
  startState = {
    todolistID1: [
      { id: "1", title: "HTML&CSS", isDone: true },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "ReactJS", isDone: false },
    ],
    todolistID2: [
      { id: "1", title: "HTML&CSS2", isDone: true },
      { id: "2", title: "JS2", isDone: true },
      { id: "3", title: "ReactJS2", isDone: false },
    ],
  };
});

test("correct task should be remove", () => {
  const action = removeTaskAC("2", "todolistID2");

  const endState = tasksReducer(startState, action);

  expect(endState).toEqual({
    todolistID1: [
      { id: "1", title: "HTML&CSS", isDone: true },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "ReactJS", isDone: false },
    ],
    todolistID2: [
      { id: "1", title: "HTML&CSS2", isDone: true },
      { id: "3", title: "ReactJS2", isDone: false },
    ],
  });
}); 

test("correct task should be added", () => {
  const action = addTaskAC("juice", "todolistID2");

  const endState = tasksReducer(startState, action);

  expect(endState.todolistID1.length).toBe(3);
  expect(endState.todolistID2.length).toBe(4);
  expect(endState.todolistID2[0].id).toBeDefined;
  expect(endState.todolistID2[0].title).toBe("juice");
  expect(endState.todolistID2[0].isDone).toBe(false);
});

test("status of specified task should be changed", () => {
  const action = changeTaskStatusAC("2", false, "todolistId2");

  const endState = tasksReducer(startState, action);

  expect(endState.todolistId2[1].isDone).toBe(false);
  expect(endState.todolistId1[1].isDone).toBe(true);
});

test("title of specified task should be changed", () => {
  const action = changeTaskTitleAC("2", "sugar", "todolistId2");

  const endState = tasksReducer(startState, action);

  expect(endState.todolistId2[1].title).toBe("sugar");
  expect(endState.todolistId1[1].title).toBe("JS");
});

test("new array should be added when new todolist is added", () => {
  const action = addTodolistAC("new todolist");

  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);
  const newKey = keys.find((k) => k != "todolistId1" && k != "todolistId2");
  if (!newKey) {
    throw Error("new key should be added");
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});

test("property with todolistId should be deleted", () => {
  const startState: TaskStateType = {
    todolistId1: [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false },
    ],
    todolistId2: [
      { id: "1", title: "bread", isDone: false },
      { id: "2", title: "milk", isDone: true },
      { id: "3", title: "tea", isDone: false },
    ],
  };

  const action = removeTodolistAC("todolistId2");

  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState["todolistId2"]).not.toBeDefined();
});
