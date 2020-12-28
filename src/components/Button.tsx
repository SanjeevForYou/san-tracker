import React from "react";
import "./Button.css";

const STYLES = ["btn--primary", "btn--outline"] as const;
type STYLES = typeof STYLES[number];

const SIZES = [
  "btn--medium",
  "btn--large",
  "btn--mobile",
  "btn--wide",
] as const;
type SIZES = typeof SIZES[number];

const COLORS = ["primary", "blue", "red", "green"] as const;
type COLORS = typeof COLORS[number];

type IButtonProps = {
  type?: any;
  buttonStyle?: STYLES;
  buttonSize?: SIZES;
  buttonColor?: COLORS;
  onButtonClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  children?: React.ReactNode;
};

export const Button: React.FC<IButtonProps> = ({
  children,
  type,
  buttonColor,
  buttonSize,
  buttonStyle,
  onButtonClick,
}: IButtonProps) => {
  const checkButtonStyle =
    buttonStyle && STYLES.includes(buttonStyle) ? buttonStyle : null;

  const checkButtonSize =
    buttonSize && SIZES.includes(buttonSize) ? buttonSize : null;

  const checkButtonColor =
    buttonColor && COLORS.includes(buttonColor) ? buttonColor : null;

  return (
    <button
      className={`btn ${checkButtonStyle} ${checkButtonSize} ${checkButtonColor}`}
      onClick={onButtonClick}
      type={type}
    >
      {children}
    </button>
  );
};
