import React from "react";
// import axios from "axios";
import * as yup from "yup";
import { Formik } from "formik";
import Nav from "../components/Nav";
import FormInput from "../components/form-input";
import Styles from "../styles/FAQ/Forgotpassword.module.css";

export const FORGOT_PASSWORD_FORM_SCHEMA = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required("Email is required")
    .email("Invalid email address"),
});

const ForgotPassword = () => {
  return (
    <>
      <Nav />
      <div className={Styles.forgotpassword_Container}>
        <h4>Forgot Password?</h4>

        <p>
          Enter the email address tied to this account to reset your account
          password
        </p>

        <Formik
          validationSchema={FORGOT_PASSWORD_FORM_SCHEMA}
          initialValues={{ email: "" }}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ values, errors, touched, handleChange, handleSubmit }) => {
            return (
              <form onSubmit={handleSubmit}>
                <FormInput
                  type="text"
                  name="email"
                  placeholder="Email Address"
                  value={values.email}
                  isInvalid={touched.email && !!errors.email}
                  validationMessage={touched.email && errors.email}
                  onChange={handleChange}
                />

                <button type="submit" className={Styles.reset}>
                  Reset
                </button>
              </form>
            );
          }}
        </Formik>
      </div>
    </>
  );
};

export default ForgotPassword;
