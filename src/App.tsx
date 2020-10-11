import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import { Home } from "./pages/Home";
import { Navbar } from "./components/Navbar";
import { AccountLogin } from "./pages/AccountLogin";
import { PrivateRoute } from "./components/PrivateRoute";
import { Topics } from "./pages/Topics";
import { AuthContextProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthContextProvider>
      <Navbar />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/login" component={AccountLogin} />
        <PrivateRoute path="/topics" component={Topics} />
      </Switch>
    </AuthContextProvider>
  );
}

export default App;
