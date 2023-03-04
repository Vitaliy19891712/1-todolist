import React, { useState } from "react";
import "./App.css";
import { TaskType, Todolist } from "./Todolist";
import { v1 } from "uuid";
import SuperInput from "./Components/SuperInput";
import ButtonAppBar from "./ButtonAppBar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import Paper from "@mui/material/Paper";

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistsType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

export type TaskStateType = {
  [Id: string]: Array<TaskType>;
};

function App() {
  let todolistID1 = v1();
  let todolistID2 = v1();

  let [todolists, setTodolists] = useState<Array<TodolistsType>>([
    { id: todolistID1, title: "What to learn", filter: "all" },
    { id: todolistID2, title: "What to buy", filter: "all" },
  ]);

  let [tasks, setTasks] = useState({
    [todolistID1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
      { id: v1(), title: "Rest API", isDone: false },
      { id: v1(), title: "GraphQL", isDone: false },
    ],
    [todolistID2]: [
      { id: v1(), title: "HTML&CSS2", isDone: true },
      { id: v1(), title: "JS2", isDone: true },
      { id: v1(), title: "ReactJS2", isDone: false },
      { id: v1(), title: "Rest API2", isDone: false },
      { id: v1(), title: "GraphQL2", isDone: false },
    ],
  });

  const editTask = (todolistID: string, taskID: string, newTitle: string) => {
    const editVal = {
      ...tasks,
      [todolistID]: tasks[todolistID].map((el) => (el.id === taskID ? { ...el, title: newTitle } : el)),
    };
    setTasks(editVal);
  };

  const editTodo = (todolistID: string, newTitle: string) => {
    setTodolists(todolists.map((el) => (el.id === todolistID ? { ...el, title: newTitle } : el)));
  };

  function removeTask(todolistID: string, taskID: string) {
    setTasks({
      ...tasks,
      [todolistID]: tasks[todolistID].filter((el) => el.id !== taskID),
    });
  }

  function addTask(todolistID: string, title: string) {
    let newTask = { id: v1(), title: title, isDone: false };
    setTasks({ ...tasks, [todolistID]: [...tasks[todolistID], newTask] });
  }

  function changeStatus(todolistID: string, taskId: string, isDone: boolean) {
    setTasks({
      ...tasks,
      [todolistID]: tasks[todolistID].map((el) => (el.id === taskId ? { ...el, isDone } : el)),
    });
  }

  function changeFilter(todolistID: string, value: FilterValuesType) {
    setTodolists(todolists.map((el) => (el.id === todolistID ? { ...el, filter: value } : el)));
  }

  const removeTodolist = (todolistID: string) => {
    setTodolists(todolists.filter((el) => el.id !== todolistID));
    delete tasks[todolistID];
  };

  const addTodoList = (newTitle: string) => {
    const newTodoID = v1();
    const newTodoList: TodolistsType = {
      id: newTodoID,
      title: newTitle,
      filter: "all",
    };
    setTodolists([...todolists, newTodoList]);
    setTasks({ ...tasks, [newTodoID]: [] });
  };

  return (
    <div className="App">
      <ButtonAppBar />
      <Container fixed>
        <Grid container style={{ padding: "20px" }}>
          <SuperInput callback={addTodoList} />
        </Grid>
        <Grid container spacing={3}>
          {todolists.map((el) => {
            let tasksForTodolist = tasks[el.id];
            console.log(tasks[el.id]);
            if (el.filter === "active") {
              tasksForTodolist = tasks[el.id].filter((t) => !t.isDone);
            }
            if (el.filter === "completed") {
              tasksForTodolist = tasks[el.id].filter((t) => t.isDone);
            }
            return (
              <Grid item>
                <Paper elevation={3} style={{ padding: "10px" }}>
                  <Todolist
                    key={el.id}
                    todolistID={el.id}
                    title={el.title}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeStatus}
                    filter={el.filter}
                    removeTodolist={removeTodolist}
                    editTask={editTask}
                    editTodo={editTodo}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
