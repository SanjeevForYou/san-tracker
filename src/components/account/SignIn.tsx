import React, { useContext, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { baseUrl } from "../../common/constants";
import { FetchWrapper } from "../../common/fetchWrapper";
import { AuthContext } from "../../context/AuthContext";
import { Button } from "../Button";
import { Spinner } from "../Spinner";
import "./SignIn.css";

type ISignInProps = {};

export const SignIn: React.FC<ISignInProps> = (props: ISignInProps) => {
  const { authToken, setAuthToken } = useContext(AuthContext);

  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSignIn = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    async function signIn() {
      try {
        setIsLoading(true);
        setError(false);
        const url = `${baseUrl}/api/login`;
        const response = await FetchWrapper.post<any, { token: string }>(url, {
          email: userName,
          password,
        });
        console.log("Login successful!!", response);
        setAuthToken?.(response?.token);
      } catch (error) {
        setError(true);
        console.log("Something went wrong!!", error);
      } finally {
        setIsLoading(false);
      }
    }

    event.preventDefault();
    signIn();
  };

  if (authToken) {
    return <Redirect to="/" />;
  }

  return (
    <div className="signin__section">
      <form action="#">
        <h1>
          <Link to="/signup">Sign In</Link> / <Link to="/signup">Sign Up</Link>
        </h1>
        {isLoading && <Spinner />}
        {error && (
          <div className="signin__section__error">
            <span>Entered email/password is wrong.</span>
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
          {/* <button
          id="toggle-password"
          type="button"
          aria-label="Show password as plain text. Warning: this will display your password on the screen."
        >
          Show password
        </button> */}
          {/* <div id="password-constraints">
          Eight or more characters, with at least one&nbsp;lowercase and one
          uppercase letter.
        </div> */}
        </section>

        <Button
          onButtonClick={onSignIn}
          buttonColor="primary"
          buttonStyle="btn--primary"
          buttonSize="btn--medium"
        >
          Sign in
        </Button>
        <Link to="/forget-password">Forget Password</Link>
      </form>
    </div>
  );
};
