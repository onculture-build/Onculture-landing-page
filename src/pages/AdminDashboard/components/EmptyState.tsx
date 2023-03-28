import React from "react";
import boardStyle from "../../../styles/Dashboard/Dashboard.module.css";
import parse from "html-react-parser";
import { useNavigate } from "react-router-dom";

type EmptyStateProp = {
  head?: string;
  text?: string;
  imag: string;
  btnText?: string;
  linkTag?: string;
  onClick?: any;
};
const EmptyState = ({
  head,
  text,
  imag,
  btnText,
  linkTag,
  onClick,
}: EmptyStateProp) => {
  const navigate = useNavigate();

  return (
    <div className={boardStyle.emptyState}>
      <img src={imag} alt="onculture-empty-state" />
      <div>{head ? parse(head) : <h4>Nothing here yet</h4>}</div>
      <div>
        <p>{text && parse(text)}</p>
      </div>
      {btnText && (
        <button
          // onClick={() => {
          //   if (linkTag) {
          //     navigate(linkTag);
          //   }
          // }}
          onClick={onClick}
        >
          {btnText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
