import React, { useState } from "react";
import { Button } from "../Button";
import "./CreateTask.css";

type ICreateTask = {
  onCreate: (tittle: string) => void;
};

const CreateTask: React.FC<ICreateTask> = (props) => {
  const [tittle, setTittle] = useState("");

  const onTittleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTittle(event.target.value);
  };

  return (
    <form className="create-task__container" action="#0">
      <div>
        <label htmlFor="task-tittle"></label>
        <input
          onChange={onTittleChange}
          type="text"
          id="task-tittle"
          placeholder=" "
          required
        />

        {/* <div className="requirements">Must have title.</div> */}
      </div>

      <div className="create-task__create-button">
        <Button
          onButtonClick={() => props.onCreate(tittle)}
          buttonColor="primary"
          buttonStyle="btn--primary"
          buttonSize="btn--medium"
        >
          Create
        </Button>
      </div>
    </form>
  );
};

export default CreateTask;
