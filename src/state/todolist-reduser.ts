import { v1 } from "uuid";
import { FilterValuesType, TodolistsType } from "../AppWithRedux";

export type ActionsType =
  | ReturnType<typeof removeTodolistAC>
  | ReturnType<typeof changeTodolistTitleAC>
  | ReturnType<typeof addTodolistAC>
  | ReturnType<typeof changeTodolistFilterAC>;

const initialState: Array<TodolistsType> = [];

export const todolistReducer = (state = initialState, action: ActionsType): Array<TodolistsType> => {
  switch (action.type) {
    case "REMOVE-TODOLIST":
      return state.filter((el) => el.id !== action.payload.todolistId);
    case "ADD-TODOLIST":
      const newTodoList: TodolistsType = {
        id: action.payload.todolistId,
        title: action.payload.newTitle,
        filter: "all",
      };
      return [...state, newTodoList];
    case "CHANGE-TODOLIST-TITLE":
      return state.map((el) => (el.id === action.payload.id ? { ...el, title: action.payload.newTitle } : el));
    case "CHANGE-TODOLIST-FILTER":
      return state.map((el) => (el.id === action.payload.id ? { ...el, filter: action.payload.filter } : el));
    default:
      return state;
  }
};

export const removeTodolistAC = (todolistId: string) => {
  return {
    type: "REMOVE-TODOLIST",
    payload: { todolistId },
  } as const;
};
export const addTodolistAC = (newTitle: string) => {
  return {
    type: "ADD-TODOLIST",
    payload: { newTitle, todolistId: v1() },
  } as const;
};
export const changeTodolistTitleAC = (newTitle: string, id: string) => {
  return {
    type: "CHANGE-TODOLIST-TITLE",
    payload: { newTitle, id },
  } as const;
};
export const changeTodolistFilterAC = (filter: FilterValuesType, id: string) => {
  return {
    type: "CHANGE-TODOLIST-FILTER",
    payload: { filter, id },
  } as const;
};
