import React from "react";
import Styles from "../styles/components/form-textarea.module.css";

interface TextareaProps {
  label?: string;
  name: string;
  value: string | undefined;
  isInvalid?: boolean;
  placeholder: string;
  validationMessage?: string | boolean;
  onChange: any;
  rows: number;
}

const FormTextarea = ({
  label,
  name,
  value,
  isInvalid,
  placeholder,
  validationMessage,
  onChange,
  rows,
}: TextareaProps) => {
  return (
    <div className={Styles.textarea}>
      {label && <label>{label}</label>}

      <textarea
        // type={type}
        id={name}
        name={name}
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      ></textarea>

      {isInvalid && validationMessage && (
        <p className={Styles.errorMsg}> {validationMessage}</p>
      )}
    </div>
  );
};

export default FormTextarea;
