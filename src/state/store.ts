import { combineReducers, legacy_createStore as createStore } from "redux";
import { tasksReducer } from "./tasks-reduser";
import { todolistReducer } from "./todolist-reduser";

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistReducer,
});

export const store = createStore(rootReducer);
export type AppRootStateType = ReturnType<typeof rootReducer>;

// @ts-ignore
window.store = store;
