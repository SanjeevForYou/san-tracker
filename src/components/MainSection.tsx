import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import "./MainSection.css";
import imagesrc from "../assets/1.jpg";

const topline: string = "Welcome to the Journel world !";
const headline: string = "You can use this app any place any time.";
const description: string =
  "This app can be downloaded in google play store and also in desktop. This can be used online/offline any time any place.";
const buttonlabel: string = "Start Your Journal";

const MainSection = () => {
  return (
    <>
      <div className="home__main-section">
        <div className="container">
          <div className="row home__main-row">
            <div className="col">
              <div className="home__main-text-wrapper">
                <div className="top-line">{topline}</div>
                <div className="heading">{headline}</div>
                <p className="home__main-subtitle">{description}</p>
                <Link to="/topics" style={{ textDecoration: "none" }}>
                  <Button buttonSize="btn--wide" buttonColor="blue">
                    {buttonlabel}
                  </Button>
                </Link>
              </div>
            </div>
            <div className="col">
              <div className="home__main-img-wrapper">
                <img
                  src={imagesrc}
                  alt="Image not available"
                  className="home__main-img"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainSection;
