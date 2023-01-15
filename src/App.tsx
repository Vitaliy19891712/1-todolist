import React, { useState } from "react";
import TodoList, { TaskType } from "./TodoList";

// Типизируем варианты фильтров
type FilterValuesType = "all" | "active" | "completed";

// Создание компоненты Арр
function App() {
  // Создаем переменные для названия ТудуЛиста и
  // используем в свойстве title
  const todoListTitle_1: string = "What to learn";
  // const todoListTitle_2: string = "What to buy";

  // Создаем useState для списка тасок (задач)
  // используем для возможности изменения состояния тасок в зависимости от фильтров
  const [tasks, setTasks] = useState<Array<TaskType>>([
    { id: 1, title: "HTML", isDone: true },
    { id: 2, title: "CSS", isDone: true },
    { id: 3, title: "JS/TS", isDone: false },
  ]);

  // Функция для удаления тасок по ID
  // и назначаем конкретное действие (удаление)
  const removeTask = (taskId: number) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  // const tasks_2: Array<TaskType> = [
  //   { id: 1, title: "Apple", isDone: true },
  //   { id: 2, title: "Meat", isDone: true },
  //   { id: 3, title: "Veg", isDone: false },
  // ];

  // Создаем useState для фильтров
  // используем для изменеия состояния фильтров
  const [filter, setFilter] = useState<FilterValuesType>("all");

  // Функция changeFilter для кнопки, при нажатии
  // переменной filter передается соотвествующее значение
  // для использования в функции getFilteredTasksForRender
  const changeFilter = (filter: FilterValuesType) => {
    setFilter(filter);
  };

  //функция getFilteredTasksForRender возвращает массив тасок
  //основываясь на определенном фильтре
  const getFilteredTasksForRender = (
    tasks: Array<TaskType>,
    filter: FilterValuesType
  ): Array<TaskType> => {
    if (filter === "active") {
      return tasks.filter((task) => task.isDone === false);
    } else if (filter === "completed") {
      return tasks.filter((task) => task.isDone === true);
    } else {
      return tasks;
    }
  };

  //переменной filteredTasksForRender присваивается тот массив тасок
  //который получается из функции getFilteredTasksForRender
  //основываясь на определенном фильтре и filteredTasksForRender
  //передает массив в свойсво ТудуЛиста
  const filteredTasksForRender = getFilteredTasksForRender(tasks, filter);

  //То, что рендерится(разметка из файла ТудуЛист, а данные в этом файле)
  return (
    <div className="App">
      <TodoList
        title={todoListTitle_1}
        tasks={filteredTasksForRender}
        removeTask={removeTask}
        changeFilter={changeFilter}
      />
      {/* <TodoList title={todoListTitle_2} tasks={tasks_2} /> */}
    </div>
  );
}
export default App;
