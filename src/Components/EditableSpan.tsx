import React, { ChangeEvent, memo, useState } from "react";

type EditableSpanTypeProps = {
  oldTitle: string;
  callback: (newTitle: string) => void;
};

export const EditableSpan = memo((props: EditableSpanTypeProps) => {
  const [edit, setEdit] = useState(false);

  const [newTitle, setNewTitle] = useState(props.oldTitle);

  const editFooHandler = () => {
    setEdit(!edit);
    props.callback(newTitle);
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value);
  };

  return edit ? (
    <input onChange={onChangeHandler} type="text" value={newTitle} onBlur={editFooHandler} autoFocus />
  ) : (
    <span onDoubleClick={editFooHandler}>{props.oldTitle}</span>
  );
});