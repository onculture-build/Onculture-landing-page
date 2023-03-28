import React from "react";
import axios from "axios";
import * as yup from "yup";
import { Formik } from "formik";
import Nav from "../components/Nav";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { ThreeDots } from "react-loader-spinner";
import { GoogleLogin } from "react-google-login";
import { useNavigate, Link } from "react-router-dom";
import googleIcon from "../Assets/Images/google-auth.svg";
import Styles from "../styles/FAQ/FormSignup.module.css";
import { useAppDispatch } from "../redux/store";
import { getUserDetails, googleLogin } from "../redux/actions/usersAction";
import useGoogleAuthentication from "../hooks/useGoogleAuthentication";
import { toast } from "react-toastify";
import { handleEmailUpdate } from "../redux/companyonboard";
import { updateUserToken } from "../redux/users";

interface SignInProps {
  email: string;
  password: string;
}

export const SIGNUP_FORM_SCHEMA = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required("Email is required")
    .email("Invalid email address"),
  password: yup.string().required("Password is required"),
});

const SignUp = () => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);

  const { handleSuccess } = useGoogleAuthentication();
  // const { error, userInfo, success, userToken, profileInfo } = useAppSelector(
  //   (state: RootState) => state.user
  // );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const handleSignUp = async (values: SignInProps) => {
    const { email, password } = values;
    try {
      dispatch(handleEmailUpdate(email));
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_PROXY}/users/sign-up`,
        { email, password },
        config
      );

      console.log(data, "jsbgckgdgqwdugqwdah");
      if (data.success) {
        localStorage.setItem("userToken", data.payload.token);
        localStorage.setItem("userDetails", JSON.stringify(data.payload));
        // dispatch(updateProfileInfo(data.payload));
        // dispatch(getUserDetails());
        dispatch(updateUserToken(data.payload.token));
        navigate("/company-onboarding");
      }

      toast(data.message);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  return (
    <>
      <Nav />
      <div className={Styles.mainBox}>
        <h4>Sign Up</h4>

        <Formik
          validationSchema={SIGNUP_FORM_SCHEMA}
          initialValues={{ email: "", password: "" }}
          onSubmit={handleSignUp}
        >
          {({ values, errors, touched, handleChange, handleSubmit }) => {
            return (
              <form onSubmit={handleSubmit}>
                <div className={Styles.formInput}>
                  <label htmlFor="email">
                    Email Address<sup>*</sup>
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Email Address"
                    value={values.email}
                    onChange={handleChange}
                  />

                  {touched.email && !!errors.email && (
                    <span className={Styles.errorMsg}>{errors.email}</span>
                  )}
                </div>
                <div className={Styles.formInput}>
                  <label htmlFor="password">Password</label>
                  <div className={Styles.passwordInput}>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      value={values.password}
                      onChange={handleChange}
                    />
                    <span>
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
                    </span>
                  </div>
                  {touched.password && !!errors.password && (
                    <span className={Styles.errorMsg}>{errors.password}</span>
                  )}
                </div>

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
                      "Sign Up"
                    )}
                  </button>
                </div>
              </form>
            );
          }}
        </Formik>

        <div className={Styles.formBtns}>
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
        </div>

        <p className={Styles.bottomP}>
          Already have an account?
          <span>
            <Link className={Styles.setLink} to="/login">
              Login
            </Link>
          </span>
        </p>
      </div>
    </>
  );
};

export default SignUp;
