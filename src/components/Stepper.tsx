import React from "react";
import stepperStyle from "../styles/CompanyOnboarding/Stepper.module.css";

type StepperProp = {
  step: number;
  setStep: (step: number) => void;
};

const Stepper = ({ step, setStep }: StepperProp) => {
  return (
    <div className={stepperStyle.wrapperProgressBar}>
      <ul className={stepperStyle.progressBar}>
        <li
          onClick={() => {
            if (step > 0 || step < 2) {
              setStep(0);
            }
          }}
          className={step >= 0 ? stepperStyle.active : ""}
        >
          Admin Details
        </li>
        <li
          //   onClick={() => {
          //     if (step > 1 || step < 2) {
          //       setStep(1);
          //     }
          //   }}
          className={step >= 1 ? stepperStyle.active : ""}
        >
          Company Details
        </li>
        <li
          onClick={() => {
            if (step > 2) {
              setStep(2);
            }
          }}
          className={step >= 2 ? stepperStyle.active : ""}
        >
          Subscription
        </li>
      </ul>
    </div>
  );
};

export default Stepper;
