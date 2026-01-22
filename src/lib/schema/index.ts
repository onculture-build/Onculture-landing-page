import * as Yup from "yup";
import { isValidPhoneNumber } from "react-phone-number-input";

export const BookDemoSchema = Yup.object().shape({
  firstName: Yup.string().trim().required("First name is required"),
  lastName: Yup.string().trim().required("Last name is required"),
  companyName: Yup.string().trim().required("Company name is required"),
  email: Yup.string()
    .trim()
    .email("Invalid email!")
    .required("Email is required!"),
  phone: Yup.string()
    .trim()
    .test({
      name: "validPhone",
      exclusive: false,
      message: "Enter a valid phone number",
      test: function (value: any): boolean {
        if (!value) return true;
        return isValidPhoneNumber(value);
      },
    }),
  employeeCount: Yup.string()
    .trim()
    .required("Kindly specify the number of employees"),
  message: Yup.string().trim().required("Let us know what you hope to achieve"),
});

export const WaitlistSchema = Yup.object().shape({
  firstName: Yup.string().trim().required("First name is required"),
  lastName: Yup.string().trim().required("Last name is required"),
  email: Yup.string()
    .trim()
    .email("Invalid email!")
    .required("Email is required!"),
});

export const ContactSchema = Yup.object().shape({
  firstName: Yup.string().trim().required("First name is required"),
  lastName: Yup.string().trim().required("Last name is required"),
  companyName: Yup.string().trim().required("Company name is required"),
  email: Yup.string()
    .trim()
    .email("Invalid email!")
    .required("Email is required!"),
  reason: Yup.string()
    .trim()
    .required("Kindly specify the reason for contacting us"),
  message: Yup.string().trim(),
});

export const UserSignUpSchema = Yup.object().shape({
  firstName: Yup.string().trim().required("First name is required"),
  lastName: Yup.string().trim().required("Last name is required"),
  email: Yup.string()
    .trim()
    .email("Invalid email!")
    .required("Email is required!"),
});

export const UserLoginSchema = Yup.object().shape({
  code: Yup.string().trim().required("Company domain is required"),
});

export const ForgotDomainSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email("Invalid email!")
    .required("Email is required!"),
});

export const CompanySchema = Yup.object().shape({
  name: Yup.string().trim().required("Company name is required"),
  email: Yup.string()
    .trim()
    .email("Invalid email!")
    .required("Email is required!"),
});
