import "./App.css";

import { SuperInput } from "./Components/SuperInput";
import ButtonAppBar from "./ButtonAppBar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { addTodolistAC } from "./state/todolist-reduser";
import { AppRootStateType } from "./state/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { TaskType, TodolistWithRedux } from "./TodolistWithRedux";
import { useCallback } from "react";

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistsType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

export type TaskStateType = {
  [Id: string]: Array<TaskType>;
};

function AppWithRedux() {
  let todolists = useSelector<AppRootStateType, Array<TodolistsType>>((state) => state.todolists);
  let dispatch = useDispatch();

  const addTodoList = useCallback(
    (newTitle: string) => {
      dispatch(addTodolistAC(newTitle));
    },
    [dispatch]
  );

  return (
    <div className="App">
      <ButtonAppBar />
      <Container fixed>
        <Grid container style={{ padding: "20px" }}>
          <SuperInput callback={addTodoList} />
        </Grid>
        <Grid container spacing={3}>
          {todolists.map((el) => {
            return (
              <Grid key={el.id} item>
                <Paper elevation={3} style={{ padding: "10px" }}>
                  <TodolistWithRedux filter={el.filter} todolistID={el.id} title={el.title} />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default AppWithRedux;
