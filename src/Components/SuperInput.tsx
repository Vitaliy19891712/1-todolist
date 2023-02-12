import React, { ChangeEvent, useState } from "react";

type PropsType = {
  callback: (title: string) => void;
};

export const SuperInput = (props: PropsType) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const addTask = () => {
    let newTitle = title.trim();
    if (newTitle !== "") {
      props.callback(newTitle);
      setTitle("");
    } else {
      setError("Title is required");
    }
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const onKeyPressHandler = (e: React.KeyboardEvent) => {
    setError(null);
    if (e.key === "Enter") {
      addTask();
    }
  };

  return (
    <div>
      <input
        value={title}
        onChange={onChangeHandler}
        onKeyDown={onKeyPressHandler}
        className={error ? "error" : ""}
      />
      <button onClick={addTask}>+</button>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default SuperInput;
