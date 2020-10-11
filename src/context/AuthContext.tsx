import React, { createContext, useState } from "react";

export type IAuthContext = {
  authToken: string | null;
  setAuthToken: (token: string | null) => void;
};
export const AuthContext = createContext<Partial<IAuthContext>>({});

export const AuthContextProvider: React.FC = (props) => {
  const existingToken = localStorage.getItem("token");
  const [authToken, setToken] = useState<string | null>(
    existingToken === "null" ? null : existingToken
  );

  const setAuthToken = (token: string | null) => {
    localStorage.setItem("token", `${token}`);
    setToken(token);
  };

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken }}>
      {props.children}
    </AuthContext.Provider>
  );
};
