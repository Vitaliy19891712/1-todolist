import IconButton from "@mui/material/IconButton";
import { EditableSpan } from "./Components/EditableSpan";
import { SuperInput } from "./Components/SuperInput";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import SuperCheckbox from "./Components/SuperCheckbox";
import { useSelector } from "react-redux";
import { AppRootStateType } from "./state/store";
import { useDispatch } from "react-redux";
import { addTaskAC, changeTaskTitleAC, changeTaskStatusAC, removeTaskAC } from "./state/tasks-reduser";
import { changeTodolistFilterAC, removeTodolistAC, changeTodolistTitleAC } from "./state/todolist-reduser";
import { memo, useCallback } from "react";
import { TaskWithRedux } from "./Components/TaskWithRedux";
import { FilterValuesType } from "./AppWithRedux";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  todolistID: string;
  title: string;
  filter: FilterValuesType;
};

export const TodolistWithRedux = memo((props: PropsType) => {
  let tasks = useSelector<AppRootStateType, Array<TaskType>>((state) => state.tasks[props.todolistID]);
  const dispatch = useDispatch();

  const onAllClickHandler = useCallback(() => dispatch(changeTodolistFilterAC("all", props.todolistID)), [dispatch, props.todolistID]);

  const onActiveClickHandler = useCallback(() => dispatch(changeTodolistFilterAC("active", props.todolistID)), [dispatch, props.todolistID]);

  const onCompletedClickHandler = useCallback(() => dispatch(changeTodolistFilterAC("completed", props.todolistID)), [dispatch, props.todolistID]);

  const removeTodolistHandler = useCallback(() => {
    dispatch(removeTodolistAC(props.todolistID));
  }, [dispatch, props.todolistID]);

  const addTaskHandler = useCallback(
    (newTitle: string) => {
      dispatch(addTaskAC(newTitle, props.todolistID));
    },
    [dispatch, props.todolistID]
  );

  const editTodoHandler = useCallback(
    (newTitle: string) => {
      dispatch(changeTodolistTitleAC(newTitle, props.todolistID));
    },
    [dispatch, props.todolistID]
  );

  if (props.filter === "active") {
    tasks = tasks.filter((t) => !t.isDone);
  }
  if (props.filter === "completed") {
    tasks = tasks.filter((t) => t.isDone);
  }

  return (
    <div>
      <h3>
        <EditableSpan oldTitle={props.title} callback={editTodoHandler} />

        <IconButton aria-label="delete" onClick={removeTodolistHandler}>
          <DeleteIcon />
        </IconButton>
      </h3>
      <SuperInput callback={addTaskHandler} />

      <ul>
        {tasks.map((t) => {
          return <TaskWithRedux key={t.id} task={t} todolistId={props.todolistID} />;
        })}
      </ul>
      <div>
        <Button variant={props.filter === "all" ? "outlined" : "contained"} color="error" onClick={onAllClickHandler}>
          All
        </Button>
        <Button variant={props.filter === "active" ? "outlined" : "contained"} color="success" onClick={onActiveClickHandler}>
          Active
        </Button>
        <Button variant={props.filter === "completed" ? "outlined" : "contained"} onClick={onCompletedClickHandler}>
          Complited
        </Button>
      </div>
    </div>
  );
});
