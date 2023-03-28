import React from "react";
import { BiSearch } from "react-icons/bi";
import Styles from "../../../styles/Dashboard/Dashboard.module.css";

const SearchField = () => {
  return (
    <div className={Styles.searchField_Container}>
      <input type="text" placeholder="Search..." />
      <BiSearch className={Styles.searchIcon} color="#8790a3" />
    </div>
  );
};

export default SearchField;
