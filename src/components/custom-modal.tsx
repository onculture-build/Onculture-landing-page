import React from "react";
import ReactModal from "react-modal";
import { IoMdCloseCircle } from "react-icons/io";
import Confetti from "../Assets/Images/confetti.svg";

interface modalProps {
  children: any;
  isOpen: boolean;
  closeModal: any;
  width: string;
  bgActive?: boolean;
  closeOnOverlayClick?: boolean;
}

// const customStyles = {
//   overlay: {
//     position: "fixed",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     zIndex: 1000,
//     overflowY: "auto",
//     backgroundColor: "rgba(0, 0, 0, 0.6)",
//   },

//   content: {
//     width: "450px",
//     top: "50%",
//     left: "50%",
//     right: "auto",
//     bottom: "auto",
//     marginRight: "-50%",
//     transform: "translate(-50%, -50%)",
//     fontFamily: "Oxygen",
//   },

// };

export default function CustomModal({
  children,
  isOpen,
  closeModal,
  width,
  bgActive,
  closeOnOverlayClick,
}: modalProps) {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      // style={customStyles}
      style={{
        overlay: {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          // zIndex: 1000,
          zIndex: 900,
          overflowY: "auto",
          // backgroundColor: "rgba(0, 0, 0, 0.6)",
          backgroundColor: "rgba(9, 18, 39, 0.51)",
        },
        content: {
          position: "absolute",
          // width: "450px",
          width: `${width}`,
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          marginTop: "5px",
          marginBottom: "50px",
          transform: "translate(-50%, -50%)",
          backgroundImage: `url(${bgActive && Confetti})`,
          backgroundRepeat: "no-repeat",
          padding: 0,
          // top: "50%",
          // left: "50%",
          // right: "auto",
          // bottom: "auto",
          // border: "1px solid #ccc",
          // background: "#fff",
          // overflow: "auto",
          // WebkitOverflowScrolling: "touch",
          // borderRadius: "4px",
          // outline: "none",
          // padding: "20px",
        },
      }}
      // contentLabel="Example Modal"
      shouldCloseOnOverlayClick={closeOnOverlayClick}
      shouldCloseOnEsc={true}
      preventScroll={true}
      ariaHideApp={false} /*remove it later, bad for screen readers */
    >
      <header>
        <IoMdCloseCircle
          style={{
            fontSize: "20px",
            cursor: "pointer",
            color: "#BBC4D9",
            position: "absolute",
            right: "1.2rem",
            top: "1.2rem",
          }}
          onClick={closeModal}
        />
      </header>
      {children}
    </ReactModal>
    // <div>;lkjhugh</div>
  );
}
