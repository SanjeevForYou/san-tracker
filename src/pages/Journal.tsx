import React, { useContext, useEffect, useState } from "react";
import Activities from "../components/activity/Activities";
import CreateActivity from "../components/activity/CreateActivity";
import { Button } from "../components/Button";
import { Spinner } from "../components/Spinner";
import { ITask } from "../components/task/ITask";
import { TaskService } from "../components/task/TaskService";
import { ActivityContextProvider } from "../context/ActivityContext";
import {
  getTasksSelector,
  TaskContext,
  TaskContextProvider,
  TASK_ON_TASK_FETCH_REQUEST,
  TASK_ON_TASK_FETCH_SUCESS,
} from "../context/TaskContext";
import "./Journal.css";

const DEFAULT_JOURNAL_TITTLE = "My Journal";

type IStartJournalSection = {
  onStart?: () => void;
};

const StartJournalSection: React.FC<IStartJournalSection> = (props) => {
  return (
    <div className="container" style={{ paddingTop: "40px" }}>
      <div className="row home__main-row">
        <div className="col">
          <div className="home__main-text-wrapper">
            <div className="top-line">Start your journal now.</div>
            <Button
              onButtonClick={() => props.onStart?.()}
              buttonSize="btn--wide"
              buttonColor="blue"
            >
              Create
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const JournalSection: React.FC = () => {
  const { state, dispatch } = useContext(TaskContext);
  const [isLoading, setisLoading] = useState(false);

  async function getTasks() {
    try {
      dispatch!({
        type: TASK_ON_TASK_FETCH_REQUEST,
      });
      setisLoading(true);
      const tasks = await TaskService.getTasks();
      setisLoading(false);
      dispatch!({
        type: TASK_ON_TASK_FETCH_SUCESS,
        payload: tasks,
      });
    } catch {
      setisLoading(false);
      dispatch!({
        type: TASK_ON_TASK_FETCH_SUCESS,
      });
    }
  }

  useEffect(() => {
    const tasks = getTasksSelector(state);
    if (tasks.length < 1) {
      getTasks();
    }
  }, []);

  async function createTask(tittle: string) {
    try {
      setisLoading(true);
      await TaskService.createTask(tittle);
      await getTasks();
      setisLoading(false);
    } catch (error) {
      setisLoading(false);
    }
  }

  const statJournal = () => {
    createTask(DEFAULT_JOURNAL_TITTLE);
  };

  const tasks = getTasksSelector(state);
  const myJournal = tasks.find(
    (task: ITask) => task.tittle === DEFAULT_JOURNAL_TITTLE
  );
  if (tasks.length < 1 || !myJournal) {
    return (
      <Spinner isLoading={isLoading}>
        {!isLoading ? <StartJournalSection onStart={statJournal} /> : null}
      </Spinner>
    );
  }

  return (
    <div className="journal__container">
      <CreateActivity taskId={myJournal._id} />
      <Activities taskId={myJournal._id} taskType={DEFAULT_JOURNAL_TITTLE} />
    </div>
  );
};

const Journal = () => {
  return (
    <TaskContextProvider>
      <ActivityContextProvider>
        <JournalSection />
      </ActivityContextProvider>
    </TaskContextProvider>
  );
};

export default Journal;
