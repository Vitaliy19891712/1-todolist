import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValuesType } from "./App";
import { EditableSpan } from "./Components/EditableSpan";
import SuperInput from "./Components/SuperInput";

type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  todolistID: string;
  title: string;
  tasks: Array<TaskType>;
  editTodo: (todolistID: string, newTitle: string) => void;
  editTask: (todolistID: string, taskID: string, newTitle: string) => void;
  removeTodolist: (todolistID: string) => void;
  removeTask: (todolistID: string, taskId: string) => void;
  changeFilter: (todolistID: string, value: FilterValuesType) => void;
  addTask: (todolistID: string, title: string) => void;
  changeTaskStatus: (
    todolistID: string,
    taskId: string,
    isDone: boolean
  ) => void;
  filter: FilterValuesType;
};

export function Todolist(props: PropsType) {
  const onAllClickHandler = () => props.changeFilter(props.todolistID, "all");

  const onActiveClickHandler = () =>
    props.changeFilter(props.todolistID, "active");

  const onCompletedClickHandler = () =>
    props.changeFilter(props.todolistID, "completed");

  const removeTodolistHandler = () => {
    props.removeTodolist(props.todolistID);
  };

  const addTaskHandler = (newTitle: string) => {
    props.addTask(props.todolistID, newTitle);
  };

  const editTackHandler = (tID: string, newTitle: string) => {
    props.editTask(props.todolistID, tID, newTitle);
  };

  const editTodoHandler = (newTitle: string) => {
    props.editTodo(props.todolistID, newTitle);
  };

  return (
    <div>
      <h3>
        <EditableSpan oldTitle={props.title} callback={editTodoHandler} />
        <button onClick={removeTodolistHandler}>x</button>
      </h3>
      <SuperInput callback={addTaskHandler} />

      <ul>
        {props.tasks.map((t) => {
          const onClickHandler = () => props.removeTask(props.todolistID, t.id);

          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(
              props.todolistID,
              t.id,
              e.currentTarget.checked
            );
          };

          return (
            <li key={t.id} className={t.isDone ? "is-done" : ""}>
              <input
                type="checkbox"
                onChange={onChangeHandler}
                checked={t.isDone}
              />
              <EditableSpan
                oldTitle={t.title}
                callback={(newTitle) => editTackHandler(t.id, newTitle)}
              />
              {/* <span>{t.title}</span> */}
              <button onClick={onClickHandler}>x</button>
            </li>
          );
        })}
      </ul>
      <div>
        <button
          className={props.filter === "all" ? "active-filter" : ""}
          onClick={onAllClickHandler}
        >
          All
        </button>
        <button
          className={props.filter === "active" ? "active-filter" : ""}
          onClick={onActiveClickHandler}
        >
          Active
        </button>
        <button
          className={props.filter === "completed" ? "active-filter" : ""}
          onClick={onCompletedClickHandler}
        >
          Completed
        </button>
      </div>
    </div>
  );
}
