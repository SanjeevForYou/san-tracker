import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import { Home } from "./pages/Home";
import { Navbar } from "./components/Navbar";
import { AccountLogin } from "./pages/AccountLogin";
import { PrivateRoute } from "./components/PrivateRoute";
import { Topics } from "./pages/Topics";
import { AuthContextProvider } from "./context/AuthContext";
import Journal from "./pages/Journal";
import TopicDetail from "./pages/TopicDetail";
import { SignUp } from "./components/account/SignUp";
import { ForgetPasswordPage } from "./pages/ForgetPassword";

function App() {
  return (
    <AuthContextProvider>
      <Navbar />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/login" component={AccountLogin} />
        <Route path="/signup" component={SignUp} />
        <Route path="/forget-password" component={ForgetPasswordPage} />
        <PrivateRoute path="/topics" component={Topics} exact />
        <PrivateRoute path="/topics/:taskId" component={TopicDetail} />
        <PrivateRoute path="/journal" component={Journal} />
      </Switch>
    </AuthContextProvider>
  );
}

export default App;
