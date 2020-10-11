import React from "react";
import MainSection from "../components/MainSection";
import { TaskList } from "../components/task/TaskList";
import { AuthContextProvider } from "../context/AuthContext";
import { TaskContextProvider } from "../context/TaskContext";

export const Home = () => {
  return (
    <>
      <AuthContextProvider>
        <MainSection />
      </AuthContextProvider>
    </>
  );
};
