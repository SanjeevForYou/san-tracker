import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import MainSection from "../components/MainSection";
import { AuthContext, AuthContextProvider } from "../context/AuthContext";

const HomeSection: React.FC = () => {
  const { authToken } = useContext(AuthContext);
  return !authToken ? <MainSection /> : <Redirect to="/journal" />;
};

export const Home = () => {
  return (
    <>
      <AuthContextProvider>
        <HomeSection />
      </AuthContextProvider>
    </>
  );
};
