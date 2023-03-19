import IconButton from "@mui/material/IconButton";
import React, { memo } from "react";
import { EditableSpan } from "./EditableSpan";
import SuperCheckbox from "./SuperCheckbox";
import DeleteIcon from "@mui/icons-material/Delete";
// import { TaskType } from "../TodolistWithRedux";

// type PropsTypeTask = {
//   task: TaskType;
//   changeStatusHandler: (tId: string, e: boolean) => void;
//   editTackHandler: (tID: string, newTitle: string) => void;
//   removeTask: (tID: string) => void;
// };

// export const Task: React.FC<PropsTypeTask> = memo(({ task, changeStatusHandler, editTackHandler, removeTask }) => {
//   return (
//     <li key={task.id} className={task.isDone ? "is-done" : ""}>
//       <SuperCheckbox isDone={task.isDone} callback={(e) => changeStatusHandler(task.id, e)} />

//       <EditableSpan oldTitle={task.title} callback={(newTitle) => editTackHandler(task.id, newTitle)} />

//       <IconButton aria-label="delete" onClick={() => {removeTask(task.id)}}>
//         <DeleteIcon />
//       </IconButton>
//     </li>
//   );
// });
