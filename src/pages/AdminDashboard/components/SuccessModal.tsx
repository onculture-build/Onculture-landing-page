import React from "react";
import { useNavigate } from "react-router-dom";
import Styles from "../../../styles/Dashboard/Dashboard.module.css";
import successImage from "../../../Assets/Images/modal-check.svg";
import CustomModal from "../../../components/custom-modal";

interface modalProps {
  isOpen: boolean;
  closeModal: any;
  header?: string;
  message?: string;
  btnText?: string;
  btnAction?: string;
  bgActive?: boolean;
}

const SuccessModal = ({
  closeModal,
  isOpen,
  header,
  message,
  btnText,
  btnAction,
  bgActive = true,
}: modalProps) => {
  const navigate = useNavigate();

  return (
    <CustomModal
      isOpen={isOpen}
      closeModal={closeModal}
      width="400px"
      bgActive={bgActive}
    >
      <div className={Styles.successState}>
        <img src={successImage} alt="onculture-success-state" />
        <h4>{header}</h4>
        <p>{message}</p>
        {btnText && (
          <button onClick={() => navigate(`${btnAction}`)}>{btnText}</button>
        )}
      </div>
    </CustomModal>
  );
};

export default SuccessModal;
