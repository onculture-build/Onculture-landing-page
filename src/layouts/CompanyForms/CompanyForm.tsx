import React from "react";
import axios from "axios";
import * as yup from "yup";
import { ThreeDots } from "react-loader-spinner";
import { Formik, Field, FieldArray } from "formik";
import { useDispatch } from "react-redux";
import { RootState, useAppSelector } from "../../redux/store";
import { IoMdTrash } from "react-icons/io";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import FormInput from "../../components/form-input";
import FormTextarea from "../../components/form-textarea";
import FormSelectBox from "../../components/form-select-box";
import companyStyle from "../../styles/CompanyOnboarding/Company.module.css";
import { toast } from "react-toastify";
import { updateProfileInfo } from "../../redux/users";

type AdminProp = {
  step: number;
  setStep: (val: number) => void;
};

const EmployeeCountOptions = [
  {
    value: "1-20",
    label: "1-20",
  },
  {
    value: "21-50",
    label: "21-50",
  },
  {
    value: "51-100",
    label: "51-100",
  },
  {
    value: "100-200",
    label: "100-200",
  },
  {
    value: "Above 200",
    label: "Above 200",
  },
];

const COMPANY_FORM_SCHEMA = yup.object().shape({
  companyName: yup.string().required("Company name is required"),
  employeeCount: yup.string().trim().required("Employee count is required"),
  mission: yup.string(),
  vision: yup.string(),
  aboutCompany: yup.string(),
  companyValues: yup
    .array()
    .notRequired()
    .of(
      yup.object().shape({
        companyValue: yup.string(),
      })
    ),
});

const CompanyForm = ({ step, setStep }: AdminProp) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const dispatch = useDispatch();
  const { firstName, surnName, email, phoneNumber } = useAppSelector(
    (state: RootState) => state.companyonboard
  );
  const { error, userToken } = useAppSelector((state: RootState) => state.user);

  const handleAccountCreation = async ({
    companyName,
    employeeCount,
    mission,
    vision,
    aboutCompany,
    values,
  }: any) => {
    try {
      setLoading(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };

      const { data } = await axios.post(
        `${process.env.REACT_APP_API_PROXY}/account/company`,
        {
          firstName,
          surnName,
          email,
          phoneNumber,
          companyName,
          employeeCount,
          mission,
          aboutCompany,
          vision,
          values,
        },
        config
      );
      console.log(data, "DATA");
      if (data.success) {
        setLoading(false);
        // dispatch(updateCompanyInfo(data.payload));
        localStorage.setItem("userDetails", JSON.stringify(data.payload));
        localStorage.setItem("userToken", data.payload.accessToken);
        console.log(data.payload, "new data");
        dispatch(updateProfileInfo(data.payload));

        toast(data.message);
        setStep(step + 1);
      } else {
        setLoading(false);

        toast(data.message);
        return;
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <div className={companyStyle.admin}>
      <Formik
        validationSchema={COMPANY_FORM_SCHEMA}
        initialValues={{
          companyName: "",
          employeeCount: "",
          mission: "",
          vision: "",
          aboutCompany: "",
          companyValues: [{ companyValue: "" }],
        }}
        onSubmit={(values) => {
          // console.log(values);

          let vals = [];

          for (let i = 0; i < values.companyValues.length; i++) {
            // if (typeof values.companyValues[0] != "object") {
            //   vals = [];
            // }

            if (Object.values(values.companyValues[0]).toString() === "") {
              vals = [];
            } else {
              let valString = Object.values(values.companyValues[i]).toString();

              vals.push(valString);
            }
          }

          // console.log(vals);

          const payload = {
            ...values,
            values: vals,
          };

          // console.log(payload);
          // console.log(firstName, surnName, email, phoneNumber);
          handleAccountCreation(payload);
        }}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit}>
              <FormInput
                label="Company Name*"
                type="text"
                name="companyName"
                placeholder="Company Name"
                value={values.companyName}
                isInvalid={touched.companyName && !!errors.companyName}
                validationMessage={touched.companyName && errors.companyName}
                onChange={handleChange}
              />

              <div className={companyStyle.employeeCount}>
                <Field name="employeeCount">
                  {({ field, form, meta }: any) => {
                    return (
                      <FormSelectBox
                        label="Employee Count"
                        name={field.name}
                        value={field.value}
                        options={EmployeeCountOptions}
                        placeholder="Please Select"
                        isInvalid={meta.touched && !!meta.error}
                        validationMessage={meta.touched && meta.error}
                        onChange={(selected: any) => {
                          form.setFieldValue(field.name, selected.value);
                        }}
                      />
                    );
                  }}
                </Field>
              </div>

              <FormTextarea
                label="Mission*"
                name="mission"
                placeholder="Mission"
                value={values.mission}
                isInvalid={touched.mission && !!errors.mission}
                validationMessage={touched.mission && errors.mission}
                onChange={handleChange}
                rows={5}
              />

              <FormTextarea
                label="Vision*"
                name="vision"
                placeholder="Vision"
                value={values.vision}
                isInvalid={touched.vision && !!errors.vision}
                validationMessage={touched.vision && errors.vision}
                onChange={handleChange}
                rows={5}
              />
              <FormTextarea
                label="About your Company*"
                name="aboutCompany"
                placeholder="About your Company"
                value={values.aboutCompany}
                isInvalid={touched.aboutCompany && !!errors.aboutCompany}
                validationMessage={touched.aboutCompany && errors.aboutCompany}
                onChange={handleChange}
                rows={10}
              />

              <FieldArray name="companyValues">
                {({ insert, remove, push, replace }) => {
                  return (
                    <div className={companyStyle.companyValuesContainer}>
                      <label htmlFor="companyValues">Values</label>
                      {values.companyValues.length <= 0 ? (
                        <div className={companyStyle.companyValuesEmptyState}>
                          <p>You have not added any values</p>
                        </div>
                      ) : (
                        values.companyValues.map((value, i) => {
                          return (
                            <div key={i}>
                              <Field name={`companyValues.${i}.companyValue`}>
                                {({ field, meta, form }: any) => {
                                  return (
                                    <div className={companyStyle.companyValues}>
                                      <div className={companyStyle.valueInput}>
                                        <FormInput
                                          type="text"
                                          name={field.name}
                                          value={field.value}
                                          placeholder="Enter value"
                                          isInvalid={
                                            meta.touched && !!meta.error
                                          }
                                          validationMessage={
                                            meta.touched && meta.error
                                          }
                                          onChange={handleChange}
                                        />
                                      </div>

                                      <div className={companyStyle.valueBtn}>
                                        <button
                                          type="button"
                                          onClick={() => {
                                            if (
                                              values.companyValues.length === 1
                                            ) {
                                              replace(i, "");
                                            } else {
                                              remove(i);
                                            }
                                          }}
                                        >
                                          <IoMdTrash fontSize={25} />
                                        </button>
                                      </div>
                                    </div>
                                  );
                                }}
                              </Field>
                            </div>
                          );
                        })
                      )}

                      <button
                        className={companyStyle.addValueBtn}
                        type="button"
                        onClick={() => push({ companyValue: "" })}
                      >
                        <MdOutlineAddCircleOutline
                          fontSize={25}
                          color="#5C00DD"
                        />
                        <p>
                          {values.companyValues.length <= 0
                            ? "Add value"
                            : "Add more"}
                        </p>
                      </button>
                    </div>
                  );
                }}
              </FieldArray>

              <div className={companyStyle.btnSteps}>
                <button
                  type="submit"
                  className={companyStyle.btnNext}
                  disabled={loading}
                >
                  {loading ? (
                    <ThreeDots
                      height="20"
                      width="40"
                      radius="9"
                      color="#fff"
                      ariaLabel="three-dots-loading"
                      wrapperClass={companyStyle.loaders}
                      visible={true}
                    />
                  ) : (
                    "Next"
                  )}
                </button>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default CompanyForm;
