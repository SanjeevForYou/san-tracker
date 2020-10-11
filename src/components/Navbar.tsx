import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { MdFingerprint } from "react-icons/md";
import { FaBars, FaTimes } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { Button } from "./Button";
import "./Navbar.css";
import { AuthContext } from "../context/AuthContext";

//https://www.youtube.com/watch?v=3nLTB_E6XAM
export const Navbar = () => {
  const { authToken, setAuthToken } = useContext(AuthContext);
  const authButtonText = authToken ? "Sign Out" : "Sign In";
  const history = useHistory();

  const handleAuthButtonClick = () => {
    if (authToken) {
      setAuthToken?.(null);
    } else {
      history.push("/login");
    }
  };

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [button, setButton] = useState<boolean>(true);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const closeMobileMenu = () => setIsOpen(false);

  const showMenuButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showMenuButton();
  }, []);

  window.addEventListener("resize", showMenuButton);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <div className="navbar-container container">
            <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
              <MdFingerprint className="navbar-icon" />
              My Tracker
            </Link>

            <div className="menu-icon" onClick={handleClick}>
              {isOpen ? <FaTimes /> : <FaBars />}
            </div>

            <ul className={isOpen ? "nav-menu active" : "nav-menu"}>
              <li className="nav-item">
                <Link to="/" className="nav-links">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/topics" className="nav-links">
                  Topics
                </Link>
              </li>

              <li className="nav-btn">
                {button ? (
                  <span className="btn-link">
                    <Button
                      buttonStyle="btn--outline"
                      onButtonClick={handleAuthButtonClick}
                    >
                      {authButtonText}
                    </Button>
                  </span>
                ) : (
                  <span className="btn-link">
                    <Button
                      buttonStyle="btn--outline"
                      buttonSize="btn--mobile"
                      onButtonClick={handleAuthButtonClick}
                    >
                      {authButtonText}
                    </Button>
                  </span>
                )}
              </li>
            </ul>
          </div>
        </div>
      </IconContext.Provider>
    </>
  );
};
