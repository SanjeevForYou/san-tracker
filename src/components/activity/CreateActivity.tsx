import React, { useContext, useState } from "react";
import {
  ActivityContext,
  ACTIVITY_ON_CREATE_SUCESS,
} from "../../context/ActivityContext";
import { Button } from "../Button";
import { Spinner } from "../Spinner";
import { ActivityService } from "./ActivityService";

type ICreateActivity = {
  taskId: string;
};

const CreateActivity: React.FC<ICreateActivity> = (props: ICreateActivity) => {
  const [description, setDescription] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const { dispatch } = useContext(ActivityContext);

  const onDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(event.target.value);
  };

  async function createActivity() {
    try {
      setisLoading(true);
      const activity = await ActivityService.createActivity(
        props.taskId,
        description
      );
      dispatch!({
        type: ACTIVITY_ON_CREATE_SUCESS,
        payload: activity,
      });
      setisLoading(false);
      setDescription("");
    } catch (error) {
      setisLoading(false);
    }
  }

  const onCreate = (event: any) => {
    createActivity();
    event.preventDefault();
  };

  return (
    <Spinner isLoading={isLoading}>
      <form className="create-article__container" action="#0">
        <div>
          <label htmlFor="article-description"></label>
          <textarea
            onChange={onDescriptionChange}
            rows={5}
            cols={50}
            id="article-description"
            placeholder="Write what's in your mind.."
            required
          />

          {/* <div className="requirements">Must have title.</div> */}
        </div>

        <div className="create-article__create-button">
          <Button
            onButtonClick={onCreate}
            buttonColor="primary"
            buttonStyle="btn--primary"
            buttonSize="btn--medium"
          >
            Create
          </Button>
        </div>
      </form>
    </Spinner>
  );
};

export default CreateActivity;
