import IconButton from "@mui/material/IconButton";
import { ChangeEvent } from "react";
import { FilterValuesType } from "./App";
import { EditableSpan } from "./Components/EditableSpan";
import SuperInput from "./Components/SuperInput";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import SuperCheckbox from "./Components/SuperCheckbox";

export type TaskType = {
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
  changeTaskStatus: (todolistID: string, taskId: string, isDone: boolean) => void;
  filter: FilterValuesType;
};

export function Todolist(props: PropsType) {
  const onAllClickHandler = () => props.changeFilter(props.todolistID, "all");

  const onActiveClickHandler = () => props.changeFilter(props.todolistID, "active");

  const onCompletedClickHandler = () => props.changeFilter(props.todolistID, "completed");

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

  const ChangeStatusHandler = (tId: string, e: boolean) => {
    props.changeTaskStatus(props.todolistID, tId, e);
  };

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
        {props.tasks.map((t) => {
          const onClickHandler = () => props.removeTask(props.todolistID, t.id);

          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(props.todolistID, t.id, e.currentTarget.checked);
          };

          return (
            <li key={t.id} className={t.isDone ? "is-done" : ""}>
              <SuperCheckbox isDone={t.isDone} callback={(e) => ChangeStatusHandler(t.id, e)} />
              {/* <Checkbox onChange={onChangeHandler} checked={t.isDone} /> */}
              <EditableSpan oldTitle={t.title} callback={(newTitle) => editTackHandler(t.id, newTitle)} />
              {/* <span>{t.title}</span> */}

              <IconButton aria-label="delete" onClick={onClickHandler}>
                <DeleteIcon />
              </IconButton>
            </li>
          );
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
}
