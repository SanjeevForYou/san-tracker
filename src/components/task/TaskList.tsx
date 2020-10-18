import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getTasksSelector,
  TaskContext,
  TASK_ON_TASK_FETCH_FAILURE,
  TASK_ON_TASK_FETCH_REQUEST,
  TASK_ON_TASK_FETCH_SUCESS,
} from "../../context/TaskContext";
import { Spinner } from "../Spinner";
import CreateTask from "./CreateTask";
import { ITask } from "./ITask";
import "./TaskList.css";
import { TaskService } from "./TaskService";

export const TaskList: React.FC = () => {
  const { state, dispatch } = useContext(TaskContext);
  const [isLoading, setisLoading] = useState(false);

  async function getTasks() {
    try {
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
      await TaskService.createTask(tittle);
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
            return (
              <li key={task._id}>
                <Link to={`/topics/${task._id}`}>{task.tittle}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </Spinner>
  );
};
