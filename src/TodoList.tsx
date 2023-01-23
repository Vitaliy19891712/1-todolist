import { type } from "@testing-library/user-event/dist/type";
import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValuesType } from "./App";

// Типизируем ТудуЛист
type TodoListPropsType = {
  title: string;
  filter: FilterValuesType;
  tasks: Array<TaskType>;
  removeTask: (taskId: string) => void;
  changeFilter: (filter: FilterValuesType) => void;
  addTask: (title: string) => void;
  changeTaskStatus: (tasksId: string, isDone: boolean) => void;
};

// Типизируем Таски (наши задачи)
export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

// Создание компоненты ТудуЛист
const TodoList = (props: TodoListPropsType) => {
  const [title, setTitle] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  console.log(error);

  // Условный рендеринг (condition rendering)
  // В зависимости от того или иного условия
  // мы рендерим ту или иную разметку в компоненте
  let tasksList = props.tasks.length ? (
    props.tasks.map((task: TaskType) => {
      const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
        props.changeTaskStatus(task.id, e.currentTarget.checked);
      // Переменной removeTask присваиваем функцию
      // с параметром (id), чтобы в компоненте Арр описать
      // что делает эта функция(удаляет таску)
      const removeTask = () => props.removeTask(task.id);
      return (
        <li key={task.id} className={task.isDone ? "task-done" : "task"}>
          <input
            onChange={changeTaskStatus}
            type="checkbox"
            checked={task.isDone}
          />
          <span>{task.title} </span>
          <button onClick={removeTask}>x</button>
        </li>
      );
    })
  ) : (
    <span>Your taskslist is empty</span>
  );

  const addTask = () => {
    const trimmedTitle = title.trim();
    if (trimmedTitle !== "") {
      props.addTask(title);
    } else {
      setError(true);
    }
    setTitle("");
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    error && setError(false);
    setTitle(e.currentTarget.value);
  };

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) =>
    e.key === "Enter" && addTask();

  const HandlerCreator = (filter: FilterValuesType) => () =>
    props.changeFilter(filter);

  //То, что рендерится
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          type="text"
          className={error ? "input-error" : ""}
          value={title}
          onChange={onChangeHandler}
          onKeyDown={onKeyDownHandler}
        />
        <button onClick={addTask}>+</button>
        {error && <p>Нет текста</p>}
      </div>
      <ul>
        <div>{tasksList}</div>
      </ul>
      <div>
        {/* Кнопкам прописали, что при клике вызывается функция 
       с определнным параметром а в компоненте Арр пропишем, что она будет делать */}
        <button
          className={props.filter === "all" ? "btn-active" : ""}
          onClick={HandlerCreator("all")}
        >
          All
        </button>
        <button
          className={props.filter === "active" ? "btn-active" : ""}
          onClick={HandlerCreator("active")}
        >
          Active
        </button>
        <button
          className={props.filter === "completed" ? "btn-active" : ""}
          onClick={HandlerCreator("completed")}
        >
          Completed
        </button>
      </div>
    </div>
  );
};

export default TodoList;
