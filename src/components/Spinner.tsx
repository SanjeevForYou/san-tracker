import React from "react";
import "./Spinner.css";

type ISpinner = {
  isLoading?: boolean;
  children?: React.ReactNode;
};

export const Spinner: React.FC<ISpinner> = (props: ISpinner) => {
  return (
    <div className="spinner__container">
      {props.children}
      {props.isLoading ? (
        <div className="spinner__overlay">
          <div className="spinner__loader"></div>
        </div>
      ) : null}
    </div>
  );
};
