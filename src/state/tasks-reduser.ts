import { TaskStateType } from "../App";
import { TaskType } from "../Todolist";
import { addTodolistAC, removeTodolistAC } from "./todolist-reduser";

type ActionsType =
  | ReturnType<typeof removeTaskAC>
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof changeTaskStatusAC>
  | ReturnType<typeof changeTaskTitleAC>
  | ReturnType<typeof addTodolistAC>
  | ReturnType<typeof removeTodolistAC>;

export const tasksReducer = (state: TaskStateType, action: ActionsType): TaskStateType => {
  switch (action.type) {
    case "REMOVE-TASK":
      return { ...state, [action.payload.todolistId]: state[action.payload.todolistId].filter((task) => task.id !== action.payload.taskId) };
    case "ADD-TASK":
      return {
        ...state,
        [action.payload.todolistId]: [{ id: "4", title: action.payload.title, isDone: false }, ...state[action.payload.todolistId]],
      };
    case "CHANGE-TASK-STATUS":
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map((task) =>
          task.id === action.payload.taskId ? { ...task, isDone: action.payload.isDone } : task
        ),
      };
    case "CHANGE-TASK-TITLE":
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map((task) =>
          task.id === action.payload.taskId ? { ...task, title: action.payload.title } : task
        ),
      };
    case "ADD-TODOLIST":
      return {
        ...state,
        [action.payload.todolistId]: [],
      };
    case "REMOVE-TODOLIST":
      // let newState = { ...state };
      // delete newState[action.payload.todolistId];
      // return newState;
      const {
        [action.payload.todolistId]: [],
        ...rest
      } = { ...state };
      return rest;

    default:
      return state;
  }
};

export const removeTaskAC = (taskId: string, todolistId: string) => {
  return {
    type: "REMOVE-TASK",
    payload: { taskId, todolistId },
  } as const;
};

export const addTaskAC = (title: string, todolistId: string) => {
  return {
    type: "ADD-TASK",
    payload: { title, todolistId },
  } as const;
};

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
  return {
    type: "CHANGE-TASK-STATUS",
    payload: { taskId, isDone, todolistId },
  } as const;
};

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
  return {
    type: "CHANGE-TASK-TITLE",
    payload: { taskId, title, todolistId },
  } as const;
};
