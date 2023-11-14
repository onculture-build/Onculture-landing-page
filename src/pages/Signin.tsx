import React from "react";
import axios from "axios";
import * as yup from "yup";
import { Formik } from "formik";
import Nav from "../components/Nav";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// import { FiEye, FiEyeOff } from "react-icons/fi";
// import { ThreeDots } from "react-loader-spinner";
// import { GoogleLogin } from "react-google-login";
// import googleIcon from "../Assets/Images/google-auth.svg";
// import { useAppDispatch } from "../redux/store";
// import { updateUserToken } from "../redux/users";
// import useGoogleAuthentication from "../hooks/useGoogleAuthentication";
// import { getUserDetails, googleLogin } from "../redux/actions/usersAction";
import Styles from "../styles/FAQ/FormSignup.module.css";
import FormInput from "../components/form-input";
import CustomButton from "../components/custom-button";
import WaitlistSuccess from "./waitlist-success";

const MailerLite = require('mailerlite-api-v2-node').default

interface SignInProps {
  fullName: string;
  email: string;
}

export const SIGNIN_FORM_SCHEMA = yup.object().shape({
  fullName: yup.string().trim().required("Fullname is required"),
  email: yup
    .string()
    .trim()
    .required("email is required")
    .email("Invalid email address"),
});


const SignIn = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const navigate = useNavigate();


  const handleSignin = async (values: SignInProps) => {
    const { fullName, email } = values;
    const ml = MailerLite('');

    try {
      setLoading(true);
      const url = `${process.env.REACT_APP_API_PROXY}/v2/groups/${process.env.REACT_APP_MAILERLITE_GROUP_ID}/subscribers`
      console.log(url, URL)
      const { data } = await axios.post(url
        ,
        {
          email,
          name: fullName
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-MailerLite-ApiKey': `${process.env.REACT_APP_MAILER_LITE_KEY}`,
          }
        }
      );
      navigate('/success-waitlist')


    } catch (err) {
      toast("Sorry!,an error occurred");
      console.log(err);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Nav showButton={false} />
      <div className={Styles.mainBox}>
        <h4>Be the First to know when we launch</h4>

        <Formik
          validationSchema={SIGNIN_FORM_SCHEMA}
          initialValues={{ fullName: "", email: "" }}
          onSubmit={handleSignin}
        >
          {({ values, errors, touched, handleChange, handleSubmit }) => {
            return (
              <form onSubmit={handleSubmit}>
                <div className={Styles.formInput}>
                  <FormInput
                    label="Your Fullname*"
                    type="text"
                    name="fullName"
                    placeholder="Fullname"
                    value={values.fullName}
                    isInvalid={touched.fullName && !!errors.fullName}
                    validationMessage={touched.fullName && errors.fullName}
                    onChange={handleChange}
                  />
                </div>
                <FormInput
                  label="Email Address*"
                  type="text"
                  name="email"
                  placeholder="Email Address"
                  value={values.email}
                  isInvalid={touched.email && !!errors.email}
                  validationMessage={touched.email && errors.email}
                  onChange={handleChange}
                  autoComplete="on"
                />

                <div className={Styles.submitBtn}>
                  <CustomButton
                    look="primary"
                    disabled={loading}
                    type="submit"
                    loading={loading}
                  >
                    Submit
                  </CustomButton>
                </div>
              </form>
            );
          }}
        </Formik>

        {/* <div className={Styles.formBtns}>
        <GoogleLogin
          clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
          onSuccess={(res) => {
            dispatch(googleLogin(res));
            dispatch(getUserDetails());
          }}
          cookiePolicy={"single_host_origin"}
          render={(renderProps) => (
            <button
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              className={Styles.gbtn}
            >
              <img src={googleIcon} alt="google-onculture" /> Log In with
              Google
            </button>
          )}
          isSignedIn={false}
          uxMode={"redirect"}
          redirectUri={"https://onculture.io/company-onboarding"}
        />
      </div> */}
      </div>

    </>
  );
};

export default SignIn;
