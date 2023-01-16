import { type } from "@testing-library/user-event/dist/type";
import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValuesType } from "./App";

// Типизируем ТудуЛист
type TodoListPropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTask: (taskId: string) => void;
  changeFilter: (filter: "all" | "active" | "completed") => void;
  addTask: (title: string) => void;
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

  // Условный рендеринг (condition rendering)
  // В зависимости от того или иного условия
  // мы рендерим ту или иную разметку в компоненте
  let tasksList = props.tasks.length ? (
    props.tasks.map((task: TaskType) => {
      // Переменной removeTask присваиваем функцию
      // с параметром (id), чтобы в компоненте Арр описать
      // что делает эта функция(удаляет таску)
      const removeTask = () => props.removeTask(task.id);
      return (
        <li key={task.id}>
          <input type="checkbox" checked={task.isDone} />
          <span>{task.title} </span>
          <button onClick={removeTask}>x</button>
        </li>
      );
    })
  ) : (
    <span>Your taskslist is empty</span>
  );

  const addTask = () => {
    props.addTask(title);
    setTitle("");
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.currentTarget.value);

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
          value={title}
          onChange={onChangeHandler}
          onKeyDown={onKeyDownHandler}
        />
        <button onClick={addTask}>+</button>
      </div>
      <ul>
        <div>{tasksList}</div>
      </ul>
      <div>
        {/* Кнопкам прописали, что при клике вызывается функция 
       с определнным параметром а в компоненте Арр пропишем, что она будет делать */}
        <button onClick={HandlerCreator("all")}>All</button>
        <button onClick={HandlerCreator("active")}>Active</button>
        <button onClick={HandlerCreator("completed")}>Completed</button>
      </div>
    </div>
  );
};

export default TodoList;
