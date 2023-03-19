import IconButton from "@mui/material/IconButton";
import React, { ChangeEvent, memo, useCallback } from "react";
import { EditableSpan } from "./EditableSpan";
import SuperCheckbox from "./SuperCheckbox";
import DeleteIcon from "@mui/icons-material/Delete";
import { TaskType } from "../TodolistWithRedux";
import { useDispatch } from "react-redux";
import { changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from "../state/tasks-reduser";

type PropsTypeTask = {
  task: TaskType;
  todolistId: string;
};

export const TaskWithRedux: React.FC<PropsTypeTask> = memo(({ task, todolistId }) => {
  const dispatch = useDispatch();

  const removeTask = useCallback(() => dispatch(removeTaskAC(task.id, todolistId)), [dispatch, todolistId, task.id]);

  const changeStatusHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(changeTaskStatusAC(task.id, e.currentTarget.checked, todolistId));
    },
    [dispatch, task.id, todolistId]
  );

  const editTackHandler = useCallback(
    (newTitle: string) => {
      dispatch(changeTaskTitleAC(task.id, newTitle, todolistId));
    },
    [dispatch, todolistId, task.id]
  );

  return (
    <li key={task.id} className={task.isDone ? "is-done" : ""}>
      <SuperCheckbox isDone={task.isDone} callback={changeStatusHandler} />

      <EditableSpan oldTitle={task.title} callback={editTackHandler} />

      <IconButton aria-label="delete" onClick={removeTask}>
        <DeleteIcon />
      </IconButton>
    </li>
  );
});
