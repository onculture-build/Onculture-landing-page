import React from "react";
import axios from "axios";
import * as yup from "yup";
import { Formik } from "formik";
import Nav from "../components/Nav";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { ThreeDots } from "react-loader-spinner";
import { GoogleLogin } from "react-google-login";
import googleIcon from "../Assets/Images/google-auth.svg";
import { useAppDispatch } from "../redux/store";
import { updateUserToken } from "../redux/users";
import useGoogleAuthentication from "../hooks/useGoogleAuthentication";
import { getUserDetails, googleLogin } from "../redux/actions/usersAction";
import Styles from "../styles/FAQ/FormSignup.module.css";

interface SignInProps {
  email: string;
  password: string;
}

export const SIGNIN_FORM_SCHEMA = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required("Fullname is required"),
  password: yup.string()
    .trim()
    .required("email is required")
    .email("Invalid email address"), 
});

const SignIn = () => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);

  const { handleSuccess } = useGoogleAuthentication();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSignin = async (values: SignInProps) => {
    const { email, password } = values;
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_PROXY}/waitlist/join`,
        {
          fullName: email,
          email:password,
        }
      );
      console.log(data, "login");

      if (data.success) {
        toast(data.message);
        navigate("/");
       
      } else {
        navigate("/");
      }
    } catch (err) {
      toast("Email or Password incorrect");
      console.log(err);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Nav showButton={false}/>
      <div className={Styles.mainBox}>
        <h4>Be the First to know when we launch</h4>

        <Formik
          validationSchema={SIGNIN_FORM_SCHEMA}
          initialValues={{ email: "", password: "" }}
          onSubmit={handleSignin}
        >
          {({ values, errors, touched, handleChange, handleSubmit }) => {
            return (
              <form onSubmit={handleSubmit}>
                <div className={Styles.formInput}>
                  <label htmlFor="email">
                    Your Fullname
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Fullname"
                    value={values.email}
                    onChange={handleChange}
                  />

                  {touched.email && !!errors.email && (
                    <span className={Styles.errorMsg}>{errors.email}</span>
                  )}
                </div>
                <div className={Styles.formInput}>
                  <label htmlFor="password">Email Address<sup>*</sup></label>
                  <div className={Styles.passwordInput}>
                    <input
                      type="text"
                      name="password"
                      id="password"
                      value={values.password}
                      onChange={handleChange}
                      placeholder="Email Address"
                    />
                    {/* <span>
                      {showPassword ? (
                        <FiEye
                          className={Styles.eyeForm}
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      ) : (
                        <FiEyeOff
                          className={Styles.eyeForm}
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      )}
                    </span> */}
                  </div>
                  {touched.password && !!errors.password && (
                    <span className={Styles.errorMsg}>{errors.password}</span>
                  )}
                </div>

                {/* <span
                  className={Styles.forgotPassword}
                  onClick={() => navigate("/reset-password")}
                >
                  Forgot your password?
                </span> */}

                <div className={Styles.submitBtn}>
                  <button disabled={loading} type="submit">
                    {loading ? (
                      <ThreeDots
                        height="20"
                        width="40"
                        radius="9"
                        color="#fff"
                        ariaLabel="three-dots-loading"
                        wrapperClass={Styles.loaders}
                        visible={true}
                      />
                    ) : (
                      "Submit"
                    )}
                  </button>
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
