import React, { useContext, useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { baseUrl } from "../../common/constants";
import { FetchWrapper } from "../../common/fetchWrapper";
import { AuthContext } from "../../context/AuthContext";
import { Button } from "../Button";
import { Spinner } from "../Spinner";
import "./SignIn.css";

type ISignUpProps = {};

export const SignUp: React.FC<ISignUpProps> = (props: ISignUpProps) => {
  const { authToken, setAuthToken } = useContext(AuthContext);
  const history = useHistory();
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSignUp = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    async function signUp() {
      try {
        setIsLoading(true);
        setError(false);
        const url = `${baseUrl}/api/signup`;
        const response = await FetchWrapper.post<any, { token: string }>(url, {
          email: userName,
          password,
          confirmPassword,
        });
        console.log("Signup successful!!", response);
        history.push("/login");
      } catch (error) {
        setError(true);
        console.log("Something went wrong!!", error);
      } finally {
        setIsLoading(false);
      }
    }

    event.preventDefault();
    signUp();
  };

  if (authToken) {
    return <Redirect to="/" />;
  }

  return (
    <div className="signin__section">
      <form action="#">
        <h1>
          <Link to="/login">Sign In</Link> / <Link to="/signup">Sign Up</Link>
        </h1>
        {isLoading && <Spinner />}
        {error && (
          <div className="signin__section__error">
            <span>Something went wrong.</span>
          </div>
        )}
        <section>
          <label htmlFor="email">Email</label>
          <input
            onChange={(e) => setUserName(e.target.value)}
            id="email"
            name="email"
            type="email"
            placeholder=" "
            autoComplete="username"
            required
          />
        </section>
        <section>
          <label htmlFor="current-password">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            id="current-password"
            name="current-password"
            type="password"
            autoComplete="current-password"
            aria-describedby="password-constraints"
            required
          />
        </section>
        <section>
          <label htmlFor="confirm-password">Password</label>
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            id="confirm-password"
            name="confirm-password"
            type="password"
            autoComplete="confirm-password"
            aria-describedby="confirm-constraints"
            required
          />
        </section>
        <Button
          onButtonClick={onSignUp}
          buttonColor="primary"
          buttonStyle="btn--primary"
          buttonSize="btn--medium"
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
};
