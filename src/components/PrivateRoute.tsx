import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

type IProvateRoute = {
  component: React.FC;
  path: string;
  exact?: boolean;
};

export const PrivateRoute: React.FC<IProvateRoute> = (props) => {
  const { authToken } = useContext(AuthContext);

  return authToken ? (
    <Route path={props.path} exact={props.exact} component={props.component} />
  ) : (
    <Redirect to="/login" />
  );
};
