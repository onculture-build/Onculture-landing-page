import React from "react";
import parse from "html-react-parser";
import CustomModal from "../../../components/custom-modal";
import warningImage from "../../../Assets/Images/warning.svg";
import Styles from "../../../styles/Dashboard/Dashboard.module.css";

interface modalProps {
  isOpen: boolean;
  closeModal: any;
  header?: string;
  message: string;
  actionText?: string;
  cancelText?: string;
  handleAction?: () => void;
  handleCancel?: () => void;
}

const ResetModal = ({
  closeModal,
  isOpen,
  header,
  message,
  actionText,
  cancelText,
  handleAction,
  handleCancel,
}: modalProps) => {
  return (
    <CustomModal
      isOpen={isOpen}
      closeModal={closeModal}
      width="410px"
      bgActive={false}
      closeOnOverlayClick={false}
    >
      <div className={Styles.warningState}>
        <img src={warningImage} alt="onculture-warning-state" />
        <h4>{header && parse(header)}</h4>
        <p>{message}</p>

        <div className={Styles.btns}>
          <button
            type="button"
            className={Styles.action}
            onClick={handleAction}
          >
            {actionText}
          </button>
          <button
            type="button"
            className={Styles.cancel}
            onClick={handleCancel}
          >
            {cancelText}
          </button>
        </div>
      </div>
    </CustomModal>
  );
};

export default ResetModal;
