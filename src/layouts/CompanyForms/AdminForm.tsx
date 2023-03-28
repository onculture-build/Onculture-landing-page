import React from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import companyStyle from "../../styles/CompanyOnboarding/Company.module.css";
import FormInput from "../../components/form-input";
import { handleAdminStep } from "../../redux/companyonboard";
import { RootState, useAppSelector } from "../../redux/store";

// const phoneRegExp =/^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
const phoneRegExp =
  /^([0]{1}|\+?[234]{3})([7-9]{1})([0|1]{1})([\d]{1})([\d]{7})$/g;
export const ADMIN_FORM_SCHEMA = yup.object().shape({
  firstName: yup.string().required("Full Name is required"),
  surnName: yup.string().required("Surname is required"),
  email: yup.string(),
  phoneNumber: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Phone Number is required."),
});

type AdminProp = {
  step: number;
  setStep: (val: number) => void;
};

const AdminForm = ({ step, setStep }: AdminProp) => {
  const dispatch = useDispatch();

  const { email: userEmail } = useAppSelector(
    (state: RootState) => state.companyonboard
  );

  const userDetails = localStorage.getItem("userDetails")
    ? localStorage.getItem("userDetails")
    : null;
  let emailValue: string | undefined = userEmail;
  if (userDetails) {
    emailValue = JSON.parse(userDetails).user.email;
    console.log(emailValue);
  }

  return (
    <>
      <div className={companyStyle.admin}>
        <Formik
          validationSchema={ADMIN_FORM_SCHEMA}
          initialValues={{
            firstName: "",
            surnName: "",
            email: emailValue,
            phoneNumber: "",
          }}
          onSubmit={(values) => {
            console.log(values);
            // submitInvite(values)
            dispatch(handleAdminStep(values));

            setStep(step + 1);

            // console.log(emailValue);
          }}
        >
          {({ values, errors, touched, handleChange, handleSubmit }) => {
            return (
              <form className={companyStyle.adminForm} onSubmit={handleSubmit}>
                <FormInput
                  label="Firstname*"
                  type="text"
                  name="firstName"
                  placeholder="Firstname"
                  value={values.firstName}
                  isInvalid={touched.firstName && !!errors.firstName}
                  validationMessage={touched.firstName && errors.firstName}
                  onChange={handleChange}
                />
                <FormInput
                  label="Surname*"
                  type="text"
                  name="surnName"
                  placeholder="Surname"
                  value={values.surnName}
                  isInvalid={touched.surnName && !!errors.surnName}
                  validationMessage={touched.surnName && errors.surnName}
                  onChange={handleChange}
                />
                <FormInput
                  label="Email Address*"
                  type="text"
                  name="email"
                  placeholder="Email Address"
                  value={values.email}
                  isInvalid={touched.email && !!errors.email}
                  validationMessage={touched.email && errors.email}
                  disabled={true}
                  onChange={handleChange}
                />

                <FormInput
                  label="Phone Number*"
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={values.phoneNumber}
                  isInvalid={touched.phoneNumber && !!errors.phoneNumber}
                  validationMessage={touched.phoneNumber && errors.phoneNumber}
                  onChange={handleChange}
                />

                <div className={companyStyle.Btn}>
                  <button type="submit">Next</button>
                </div>
              </form>
            );
          }}
        </Formik>
      </div>
    </>
  );
};

export default AdminForm;
