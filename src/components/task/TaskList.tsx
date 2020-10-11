import React, { useContext, useEffect, useState } from "react";
import { baseUrl } from "../../common/constants";
import { FetchWrapper } from "../../common/fetchWrapper";
import {
  ITaskState,
  TaskContext,
  TASK_ON_TASK_FETCH_FAILURE,
  TASK_ON_TASK_FETCH_REQUEST,
  TASK_ON_TASK_FETCH_SUCESS,
} from "../../context/TaskContext";
import { Spinner } from "../Spinner";
import CreateTask from "./CreateTask";
import { ITask } from "./ITask";
import "./TaskList.css";

export const getTasksSelector = (state?: ITaskState): ITask[] => {
  return state?.tasks
    ? state?.tasks.allIds.map((id: string) => state.tasks.byId[id])
    : [];
};

export const TaskList: React.FC = () => {
  const { state, dispatch } = useContext(TaskContext);
  const [isLoading, setisLoading] = useState(false);

  async function getTasks() {
    try {
      setisLoading(true);
      const tasks = await FetchWrapper.get<ITask[]>(`${baseUrl}/api/task`);
      setisLoading(false);
      dispatch!({
        type: TASK_ON_TASK_FETCH_SUCESS,
        payload: tasks,
      });
    } catch {
      setisLoading(false);
      dispatch!({
        type: TASK_ON_TASK_FETCH_FAILURE,
      });
    }
  }

  useEffect(() => {
    dispatch!({
      type: TASK_ON_TASK_FETCH_REQUEST,
    });

    getTasks();
  }, []);

  async function createTask(tittle: string) {
    try {
      setisLoading(true);
      await FetchWrapper.post<any, any>(`${baseUrl}/api/task`, { tittle });
      await getTasks();
      setisLoading(false);
    } catch (error) {
      setisLoading(false);
    }
  }

  const onTaskCreate = (tittle: string) => {
    createTask(tittle);
  };

  return (
    <Spinner isLoading={isLoading}>
      <div className="task-list__container">
        <h2 className="task-list__header">My Topics</h2>
        <CreateTask onCreate={onTaskCreate} />
        <ul className="task-list__list">
          {getTasksSelector(state).map((task: ITask) => {
            return <li key={task._id}>{task.tittle}</li>;
          })}
        </ul>
      </div>
    </Spinner>
  );
};
