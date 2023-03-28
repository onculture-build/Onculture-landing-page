import React from "react";
import * as Yup from "yup";
import Nav from "../components/Nav";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { socialContacts } from "../constants/data";
// import SectionContact from '../layouts/Contact/SectionContact'
import Footer from "../layouts/Home/Footer";
import Styles from "../styles/Contact/contact.module.css";
import FormInput from "../components/form-input";
import FormSelectBox from "../components/form-select-box";
import { DayOptions } from "./AdminDashboard/enum";

const contactSchema = Yup.object().shape({
  fullName: Yup.string().required("Full name is required").nullable(),
  email: Yup.string()
    .email("Not a valid email address")
    .required("email is required")
    .nullable(),
  company: Yup.string().required("Company name is required").nullable(),
  help: Yup.string().required("please tell us how to help you").nullable(),
});

interface Values {
  fullName: string;
  email: string;
  company: string;
  help: string;
}

const Contact = () => {
  return (
    <>
      <Nav />
      <div className={Styles.scMain}>
        <h1>Say Hello!</h1>
        <div className={Styles.socialContacts}>
          {socialContacts.map((items, index) => {
            return (
              <div key={index} className={Styles.scContacts}>
                <img src={items.icon} alt="onculture-social-icons" />
                <div>
                  <h4>{items.head}</h4>
                  <p>{items.sub}</p>
                </div>
              </div>
            );
          })}
        </div>

        <h2>Or fill out this form we will quickly get back to you</h2>

        <div className={Styles.cfForm}>
          {/* <ContactForm /> */}
          <Formik
            initialValues={{
              fullName: "",
              email: "",
              company: "",
              help: "",
            }}
            validationSchema={contactSchema}
            onSubmit={(
              values: Values,
              { setSubmitting }: FormikHelpers<Values>
            ) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 500);
            }}
          >
            {({ values, errors, touched, handleChange, handleSubmit }) => {
              return (
                <form onSubmit={handleSubmit}>
                  <FormInput
                    label="Fullname*"
                    type="text"
                    name="fullName"
                    placeholder="Fullname"
                    value={values.fullName}
                    isInvalid={touched.fullName && !!errors.fullName}
                    validationMessage={touched.fullName && errors.fullName}
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
                    onChange={handleChange}
                  />

                  <FormInput
                    label="Company name*"
                    type="text"
                    name="company"
                    placeholder="Company name"
                    value={values.company}
                    isInvalid={touched.company && !!errors.company}
                    validationMessage={touched.company && errors.company}
                    onChange={handleChange}
                  />

                  <Field name="help">
                    {({ field, form, meta }: any) => {
                      return (
                        <FormSelectBox
                          label="How can our team help you?*"
                          name={field.name}
                          value={field.value}
                          options={DayOptions}
                          placeholder="please select"
                          onChange={(selected: any) => {
                            form.setFieldValue(field.name, selected.value);
                          }}
                        />
                      );
                    }}
                  </Field>

                  <button type="submit" className={Styles.contactBtn}>
                    Submit
                  </button>
                </form>
              );
            }}
          </Formik>
        </div>

        <div className={Styles.cfBlurObject}></div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
