import React, { ChangeEvent } from "react";

type SuperCheckboxPropsType = {
  isDone: boolean;
  callback: (e: boolean) => void;
};

const SuperCheckbox = (props: SuperCheckboxPropsType) => {
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    props.callback(e.currentTarget.checked);
  };

  return <input type="checkbox" checked={props.isDone} onChange={onChangeHandler} />;
};

export default SuperCheckbox;
