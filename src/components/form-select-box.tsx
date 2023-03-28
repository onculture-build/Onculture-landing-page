import React from "react";
import Select from "react-select";
import Styles from "../styles/components/form-select-box.module.css";

type formSelectProp = {
  label?: string;
  name: string;
  value: any;
  options: any;
  placeholder?: string;
  isLoading?: boolean;
  isInvalid?: boolean;
  validationMessage?: boolean;
  onChange: any;
  height?: number;
};

const customStyles = {
  control: (provided: any, state: any) => {
    return {
      ...provided,
      height: state.selectProps.height || 48,
      color: "#000000",
      // fontSize: state.selectProps.fontSize || '0.875em',
      borderRadius: 4,
      fontSize: 16,
      // backgroundColor: state.selectProps.backgroundColor || '#fff',
      // borderColor: "#8790a3",
      border:
        state.menuIsOpen || state.isFocused
          ? "2px solid #000 !important"
          : "1px solid #8790a3",
      transition: "all 80ms ease-in-out",
      boxShadow: "none !important",
      cursor: "pointer",
    };
  },

  // valueContainer: (provided: any, state: any) => {
  //   return {
  //     ...provided,
  //     height: "100%",
  //   };
  // },

  placeholder: (provided: any, state: any) => {
    return {
      ...provided,
      // color: "#000000",
      fontSize: 14,
      fontWeight: 500,
      color: "#8790A3",
    };
  },

  singleValue: (provided: any, state: any) => {
    return {
      ...provided,
      color: "inherit",
    };
  },

  // indicatorsContainer: (provided: any, state: any) => {
  //   return {
  //     ...provided,
  //     height: "100%",
  //   };
  // },

  indicatorSeparator: (provided: any, state: any) => {
    return {
      ...provided,
      display: "none",
    };
  },

  dropdownIndicator: (provided: any, state: any) => {
    return {
      ...provided,
      color: "#000",
    };
  },

  // menu: (provided: any, state: any) => {
  //   return {
  //     ...provided,
  //     backgroundColor: "#FEFEFE",
  //     fontSize: "0.875rem",
  //   };
  // },

  // menuList: (provided: any, state: any) => {
  //   return {
  //     ...provided,
  //     maxHeight: 180,
  //   };
  // },

  // option: (provided: any, state: any) => {
  //   return {
  //     ...provided,
  //     paddingTop: 5,
  //     paddingBottom: 5,
  //   };
  // },
};

function getValueWithLabel(value: any, options: any) {
  if (value && value.hasOwnProperty("label")) {
    return value;
  }
  return options.find((x: any) => x.value === value);
}

function FormSelectBox({
  label,
  name,
  value,
  options = [],
  placeholder,
  isLoading,
  isInvalid,
  validationMessage,
  onChange,
  ...rest
}: formSelectProp) {
  return (
    <div className={Styles.selectBox}>
      {label && (
        <div className={Styles.label}>
          <label>{label}</label>
        </div>
      )}

      <Select
        styles={customStyles}
        name={name}
        value={value && getValueWithLabel(value, options)}
        options={options}
        isLoading={isLoading}
        classNamePrefix="form-select-box"
        placeholder={placeholder}
        // isInvalid={isInvalid}
        onChange={onChange}
        {...rest}
      />

      {isInvalid && validationMessage && (
        <div>
          {/* <ErrorIcon size={14} /> */}
          <p className={Styles.errorMsg}>{validationMessage}</p>
        </div>
      )}
    </div>
  );
}

export default FormSelectBox;
