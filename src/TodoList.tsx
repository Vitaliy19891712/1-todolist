import { type } from "@testing-library/user-event/dist/type";
import React from "react";

// Типизируем ТудуЛист
type TodoListPropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTask: (taskId: number) => void;
  changeFilter: (filter: "all" | "active" | "completed") => void;
};

// Типизируем Таски (наши задачи)
export type TaskType = {
  id: number;
  title: string;
  isDone: boolean;
};

// Создание компоненты ТудуЛист
const TodoList = (props: TodoListPropsType) => {
  // Условный рендеринг (condition rendering)
  // В зависимости от того или иного условия
  // мы рендерим ту или иную разметку в компоненте
  let tasksList = props.tasks.length ? (
    props.tasks.map((task: TaskType) => {
      // Переменной removeTask присваиваем функцию
      // с параметром (id), что бы в компоненте Арр описать
      // что делает эта функция(удаляет таску)
      const removeTask = () => props.removeTask(task.id);
      return (
        <li>
          <input type="checkbox" checked={task.isDone} />
          <span>{task.title} </span>
          <button onClick={removeTask}>x</button>
        </li>
      );
    })
  ) : (
    <span>Your taskslist is empty</span>
  );

  //То, что рендерится
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input />
        <button>+</button>
      </div>
      <ul>
        <div>{tasksList}</div>
      </ul>
      <div>
        {/* Кнопкам прописали, что при клике вызывается функция 
       с определнным параметром а в компоненте Арр пропишем, что она будет делать */}
        <button onClick={() => props.changeFilter("all")}>All</button>
        <button onClick={() => props.changeFilter("active")}>Active</button>
        <button onClick={() => props.changeFilter("completed")}>
          Completed
        </button>
      </div>
    </div>
  );
};

export default TodoList;
