import React from "react";
import Styles from "../../../styles/Dashboard/Dashboard.module.css";
import oopsImage from "../../../Assets/Images/failedState.svg";
import CustomModal from "../../../components/custom-modal";

interface modalProps {
    isOpen: boolean;
    closeModal: any;
    header?: string;
    message: string;
    btnText?: string;
}

const FailedModal = ({
    closeModal,
    isOpen,
    header,
    message,
    btnText,
}: modalProps) => {
    return (
        <CustomModal
            isOpen={isOpen}
            closeModal={closeModal}
            width="400px"
            bgActive={false}
        >
            <div className={Styles.successState}>
                <img src={oopsImage} alt="onculture-failed-state" />
                <h4>{header}</h4>
                <p>{message}</p>
                {/* {btnText && <button>{btnText}</button>} */}
            </div>
        </CustomModal>
    );
};

export default FailedModal;
