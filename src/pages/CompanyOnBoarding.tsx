import React from "react";
import Nav from "../components/Nav";
import Stepper from "../components/Stepper";
import usePricing from "../hooks/usePricing";
import AdminForm from "../layouts/CompanyForms/AdminForm";
import Checkout from "../layouts/CompanyForms/Checkout";
import CompanyForm from "../layouts/CompanyForms/CompanyForm";
import Subscription from "../layouts/CompanyForms/Subscription";
import companyStyle from "../styles/CompanyOnboarding/Company.module.css";

const CompanyOnBoarding = () => {
  const [step, setStep] = React.useState<number>(0);

  const {} = usePricing();

  const multiSteps = [
    <AdminForm setStep={setStep} step={step} />,
    <CompanyForm setStep={setStep} step={step} />,
    <Subscription step={step} setStep={setStep} />,
    <Checkout step={step} setStep={setStep} />,
  ];

  return (
    <>
      <Nav pure={true} />
      <div className={companyStyle.main}>
        <div className={companyStyle.header}>
          <h4>Create Company Profile</h4>
        </div>
        <div className={companyStyle.mainStepper}>
          <Stepper step={step} setStep={setStep} />
        </div>
        <div className={companyStyle.allForm}>{multiSteps[step]}</div>
      </div>
    </>
  );
};

export default CompanyOnBoarding;
