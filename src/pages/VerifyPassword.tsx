import React from "react";
import axios from "axios";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Form, Formik, FormikHelpers } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import Nav from "../components/Nav";
import { createPassword, getNameByVeify } from "../redux/actions/usersAction";
import { RootState, useAppDispatch, useAppSelector } from "../redux/store";
import Styles from "../styles/FAQ/verifyPassword.module.css";

const setPasswordSchema = Yup.object().shape({
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("please confirm password"),
});

interface PasswordValue {
  password: string;
  confirmPassword: string;
}

const VerifyPassword = () => {
  const [name, setName] = React.useState<string>("");
  const [company, setCompany] = React.useState<string>("");
  const [idToken, setIdToken] = React.useState<any>("");
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    React.useState<boolean>(false);
  const { loading, error, userInfo, success, userToken, profileInfo } =
    useAppSelector((state: RootState) => state.user);

  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const getData = async (token: any) => {
    const { data } = await axios.post(`${process.env.REACT_APP_API_PROXY}/users/getMeVerify`, {
      token: token,
    });

    console.log(data, "data reeee o");
    if (!data.success) {
      navigate("/");
    } else {
      const { payload } = data;
      setName(payload.user.firstName);
      setCompany(payload.company[0].companyName);
    }
  };
  React.useEffect(() => {
    getData(params.token);
    setIdToken(params.token);
    // dispatch(getNameByVeify(params.token))
  }, []);

  if (loading) {
    return <p>Loading</p>;
  }
  return (
    <>
      <Nav />

      <div className={Styles.mainBox}>
        <div className={Styles.userVerify}>
          <h3>Hello {name}!</h3>
          <div className={Styles.welcome}>
            <p>Welcome to the onculture for {company}</p>
            <p>Please create a password to continue your training</p>
          </div>
        </div>

        <Formik
          initialValues={{
            password: "",
            confirmPassword: "",
          }}
          validationSchema={setPasswordSchema}
          onSubmit={(
            values: PasswordValue,
            { setSubmitting }: FormikHelpers<PasswordValue>
          ) => {
            console.log(idToken, "idtoken here");
            dispatch(
              createPassword({ token: idToken, password: values.password })
            );
            setTimeout(() => {
              toast("Password Update successfull");
              navigate("/employeeDashboard/courses");
              setSubmitting(false);
            }, 500);
          }}
        >
          {({ errors, touched, values, handleChange, handleSubmit }) => (
            <Form className={Styles.mainScForm} onSubmit={handleSubmit}>
              <div className={Styles.formInput}>
                <label htmlFor="password">Password*</label>
                <div className={Styles.passwordInput}>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="New Password"
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
              {/* <div className={sectionStyle.formBoxes}>
                <label htmlFor="password">Password*</label>
                <Field
                  type={showPassword ? "text" : "password"}
                  className={sectionStyle.inputField}
                  id="password"
                  name="password"
                  placeholder="New Password"
                />
                <div>
                  {showPassword ? (
                    <FiEye
                      className={sectionStyle.eyeShow}
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  ) : (
                    <FiEyeOff
                      className={sectionStyle.eyeShow}
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  )}
                </div>
                {errors.password && touched.password ? (
                  <span>{errors.password}</span>
                ) : null}
              </div> */}

              <div className={Styles.formInput}>
                <label htmlFor="confirmPassword">Confirm Password*</label>
                <div className={Styles.passwordInput}>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Password"
                    value={values.confirmPassword}
                    onChange={handleChange}
                  />
                  <span>
                    {showConfirmPassword ? (
                      <FiEye
                        className={Styles.eyeForm}
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      />
                    ) : (
                      <FiEyeOff
                        className={Styles.eyeForm}
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      />
                    )}
                  </span>
                </div>
                {touched.confirmPassword && !!errors.confirmPassword && (
                  <span className={Styles.errorMsg}>
                    {errors.confirmPassword}
                  </span>
                )}
              </div>

              {/* <div className={Styles.formBoxes}>
                <label htmlFor="confirmPassword">Confirm Password*</label>
                <Field
                  type={showConfirmPassword ? "text" : "password"}
                  className={Styles.inputField}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Password"
                />
                <div>
                  {showConfirmPassword ? (
                    <FiEye
                      className={sectionStyle.eyeShow}
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    />
                  ) : (
                    <FiEyeOff
                      className={sectionStyle.eyeShow}
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    />
                  )}
                </div>
                {errors.confirmPassword && touched.confirmPassword ? (
                  <span>{errors.confirmPassword}</span>
                ) : null}
              </div> */}

              <button
                type="submit"
                onClick={() => console.log("111111")}
                className={Styles.verifyBtn}
              >
                Update Password
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default VerifyPassword;
