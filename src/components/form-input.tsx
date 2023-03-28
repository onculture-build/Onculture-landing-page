import React from "react";
import Styles from "../styles/components/form-input.module.css";
import { BsExclamationCircleFill } from 'react-icons/bs'
interface InputProps {
  type: string;
  label?: string;
  name: string;
  value: string | undefined | number;
  isInvalid?: boolean;
  placeholder?: string;
  validationMessage?: string | boolean;
  onChange: any;
  disabled?: boolean;
  height?: string;
  width?: string;
  backendError?: string;
  isTouched?:boolean
}

const FormInput = ({
  type,
  label,
  name,
  value,
  isInvalid,
  placeholder,
  validationMessage,
  onChange,
  disabled,
  height,
  width,
  backendError,
  isTouched
}: InputProps) => {
  const styles = {
    extra: {
      height: height ? height : "48px",
      // width: width ? width : "100%",
    },
  };
  return (
    <div className={`${backendError ? Styles.backendErrorMsgInput : Styles.formInput}`}>
      {label && <label>{label}</label>}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        autoComplete="off"
        // className={className}
        // onFocus={onFocus}
        onChange={onChange}
        disabled={disabled}
        style={styles.extra}
      />

      {isInvalid && validationMessage && (
        <p className={Styles.errorMsg}> {validationMessage}</p>
      )}
      {
        isTouched && backendError && (
          <div className={Styles.backendErrorMsg}>
            <p><BsExclamationCircleFill /></p>
            <p>{backendError}</p>
          </div>
        )
      }
    </div>
  );
};

export default FormInput;
