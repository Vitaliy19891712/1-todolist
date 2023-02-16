import Button from "@mui/material/Button";
import React, { ChangeEvent, useState } from "react";
import TextField from "@mui/material/TextField";

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

  const buttonStyle = {
    maxWidth: "38px",
    maxHeight: "38px",
    minWidth: "38px",
    minHeight: "38px",
  };

  return (
    <div>
      <TextField
        value={title}
        id="standard-basic"
        label={error ? "Title is required" : ""}
        variant="standard"
        onChange={onChangeHandler}
        onKeyDown={onKeyPressHandler}
        size="small"
        error={!!error}
      />
      {/* <input
        value={title}
        onChange={onChangeHandler}
        onKeyDown={onKeyPressHandler}
        className={error ? "error" : ""}
      /> */}
      <Button
        variant="contained"
        onClick={addTask}
        size="small"
        style={buttonStyle}
      >
        +
      </Button>
      {/* {error && <div className="error-message">{error}</div>} */}
    </div>
  );
};

export default SuperInput;
