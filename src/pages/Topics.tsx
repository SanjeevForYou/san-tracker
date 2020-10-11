import React from "react";
import { TaskList } from "../components/task/TaskList";
import { TaskContextProvider } from "../context/TaskContext";

export const Topics = () => {
  return (
    <div style={{ height: "100%" }}>
      <TaskContextProvider>
        <TaskList />
      </TaskContextProvider>
    </div>
  );
};
