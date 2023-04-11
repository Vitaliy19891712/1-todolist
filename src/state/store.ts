import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";
import { ActionsTasksType, tasksReducer } from "./tasks-reducer";
import { ActionsTodoType, todolistsReducer } from "./todolists-reducer";
import { AnyAction, applyMiddleware, combineReducers, legacy_createStore } from "redux";


const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

type AppActionsType = ActionsTodoType | ActionsTasksType;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AppActionsType>;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = ThunkDispatch<RootState, unknown, AppActionsType>;


// @ts-ignore
window.store = store;
