import React from "react";
import LoadingSpinner from "./loading-spinner";
import Style from "../styles/components/custom-button.module.css";

type ButtonProps = {
  onClick?: () => void;
  children?: any;
  disabled?: boolean;
  type?: any;
  className?: any;
  look: string;
  loading?: boolean;
};

const CustomButton = ({
  onClick,
  children,
  disabled,
  type,
  className,
  look,
  loading = false,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`${
        look === "primary"
          ? Style.default
          : look === "secondary"
          ? Style.light
          : look === "disabled"
          ? Style.disabled
          : look === "orange"
          ? Style.orange
          : ""
      } ${className ? className : ""}`}
    >
      {look === "primary" && loading && <LoadingSpinner />}
      <span>{children}</span>
    </button>
  );
};

export default CustomButton;
