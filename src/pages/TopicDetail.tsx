import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Activities from "../components/activity/Activities";
import CreateActivity from "../components/activity/CreateActivity";
import { Spinner } from "../components/Spinner";
import { ITask } from "../components/task/ITask";
import { TaskService } from "../components/task/TaskService";
import { ActivityContextProvider } from "../context/ActivityContext";
import { TaskContextProvider } from "../context/TaskContext";

const TopicDetailComponent: React.FC = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState<string | null>();
  const [task, setTask] = useState<ITask>();

  useEffect(() => {
    async function getTaskById() {
      try {
        setisLoading(true);
        const task = await TaskService.getTasksById(taskId);
        setTask(task);
        setError(null);
      } catch (error) {
        setError(error.toString());
      } finally {
        setisLoading(false);
      }
    }

    getTaskById();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <div className="topic__error">{error}</div>;
  }

  if (!task) {
    return <div className="topic__no-task">No topic found.</div>;
  }

  return (
    <div className="topic__container">
      <CreateActivity taskId={task._id} />
      <Activities taskId={task._id} taskType={task.tittle} />
    </div>
  );
};

export const TopicDetail = () => {
  return (
    <TaskContextProvider>
      <ActivityContextProvider>
        <TopicDetailComponent />
      </ActivityContextProvider>
    </TaskContextProvider>
  );
};

export default TopicDetail;
