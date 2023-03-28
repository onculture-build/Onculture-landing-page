import React from "react";
import axios from "axios";
import * as yup from "yup";
import { Field, Formik } from "formik";
import { RiRefreshLine } from "react-icons/ri";
import {
  formatFullDate,
  formatTime,
  getTimeFromString,
} from "../../../helpers";
import {
  SETTINGS_STATUS,
  TEMPLATE_VIEW,
  TIMESETTER_VIEW,
  WEEKDAYS,
  PeerProps,
  DurationOptions,
} from "../../../enum";
import usePeerSettings from "../hooks/usePeerSettings";
import ResetModal from "../../../components/reset-modal";
import SuccessModal from "../../../components/SuccessModal";
import FormInput from "../../../../../components/form-input";
import FormTimeInput from "../../../../../components/form-time-input";
import FormSelectBox from "../../../../../components/form-select-box";
import Styles from "../../../../../styles/Dashboard/Templates/peer.module.css";
import TopStyles from "../../../../../styles/Dashboard/Templates/template.module.css";
import { RootState, useAppSelector } from "../../../../../redux/store";
// import { toast } from "react-toastify";

type InitialValueProps = {
  templateFrequency: string;
  templateIntervals: number | string;
  scheduleDate: number | string;
  time: any;
  scheduleDay: number[];
  peerDuration: string;
  sumUpStatus: string;
};

const PEER_SETTINGS_FORM_SCHEMA = yup.object().shape({
  templateFrequency: yup.string(),
  templateIntervals: yup.number(),
  scheduleDate: yup.number(),
  time: yup.date(),
  scheduleDay: yup.array(),
  peerDuration: yup.string().trim().required("Duration is required"),
  sumUpStatus: yup.string(),
});

const PeerSettings = ({ currentView, setCurrentView, position }: PeerProps) => {
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [isResetModalOpen, setIsResetModalOpen] =
    React.useState<boolean>(false);
  const [formInitialValues, setFormInitialValues] =
    React.useState<InitialValueProps>({
      templateFrequency: "Weekly",
      templateIntervals: "",
      scheduleDate: "",
      time: "",
      scheduleDay: [],
      peerDuration: "",
      sumUpStatus: "",
    });

  const { data, refetch } = usePeerSettings();

  const { userToken, profileInfo } = useAppSelector(
    (state: RootState) => state.user
  );

  const { company } = profileInfo;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userToken}`,
    },
  };

  const handleSettings = async (values: any) => {
    try {
      const obj = {
        templateType: "peer_1:1",
        templateFrequency: values.templateFrequency,
        templateIntervals: Number(values.templateIntervals),
        scheduleTime: values.scheduleTime,
        scheduleDate: values.scheduleDate,
        scheduleDay:
          values.templateFrequency === "Weekly" ? values.scheduleDay : [],
        peerCallDuration: values.peerDuration,
        companyId: company[0].id,
      };

      const { data } = await axios.post(
        `${process.env.REACT_APP_API_PROXY}/template/create`,
        obj,
        config
      );

      if (data.success) {
        refetch();
        setShowModal(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    let peerSettings = formInitialValues;
    let settingsData = data?.payload?.settings;
    if (settingsData) {
      peerSettings.templateFrequency = settingsData.templateFrequency;
      peerSettings.templateIntervals = settingsData.noOfDaysInterval;
      // peerSettings.scheduleDate;
      peerSettings.time = getTimeFromString(settingsData.scheduleTime);
      peerSettings.scheduleDay = settingsData.scheduleDay;
      peerSettings.peerDuration = settingsData.peerCallDuration;
    }

    setFormInitialValues(peerSettings);
  }, [data?.payload?.settings, formInitialValues]);

  return (
    <>
      {showModal && (
        <SuccessModal
          isOpen={showModal}
          closeModal={() => setShowModal(false)}
          header={
            formInitialValues.sumUpStatus === "Activate"
              ? "Activated"
              : "Updated"
          }
          message={
            formInitialValues.sumUpStatus === "Activate"
              ? "You have successfully activated this template."
              : "You have successfully updated the settings to this template."
          }
          btnText="Continue"
          btnAction="/dashboard/templates/peer"
        />
      )}
      <div className={Styles.peer}>
        <Formik
          enableReinitialize
          validationSchema={PEER_SETTINGS_FORM_SCHEMA}
          initialValues={formInitialValues}
          onSubmit={(values: InitialValueProps) => {
            // console.log(values);
            const payload = {
              ...values,
              scheduleTime: formatTime(values.time),
            };

            handleSettings(payload);
          }}
        >
          {({ values, errors, touched, handleChange, handleSubmit, dirty }) => {
            return (
              <form onSubmit={handleSubmit}>
                <div
                  className={`${TopStyles.header} ${
                    position === false ? `${TopStyles.topHeaderFixed}` : ""
                  }`}
                >
                  <div className={TopStyles.tabs}>
                    {Object.values(TEMPLATE_VIEW).map((nav, i) => {
                      return (
                        <div
                          key={i}
                          className={`${
                            currentView === nav.value && TopStyles.activeLink
                          }  ${TopStyles.tabLink}`}
                          onClick={() => setCurrentView(nav.value)}
                        >
                          {nav.label}
                        </div>
                      );
                    })}
                  </div>

                  <Field name="sumUpStatus">
                    {({ field, meta, form }: any) => {
                      return (
                        <div className={TopStyles.Btns}>
                          <button
                            type="button"
                            className={TopStyles.reset}
                            onClick={() => {
                              form.setFieldValue(
                                field.name,
                                SETTINGS_STATUS.RESET.value
                              );

                              setIsResetModalOpen(true);
                            }}
                          >
                            <RiRefreshLine fontSize={22} />
                            Reset
                          </button>

                          <button
                            className={`${
                              dirty && company[0]?.isSlackEnabled
                                ? TopStyles.activate
                                : TopStyles.disabled
                            }`}
                            disabled={!dirty && !company[0]?.isSlackEnabled}
                            type="submit"
                            onClick={() => {
                              if (company[0]?.peerActivation) {
                                form.setFieldValue(
                                  field.name,
                                  SETTINGS_STATUS.UPDATE.value
                                );
                              } else {
                                form.setFieldValue(
                                  field.name,
                                  SETTINGS_STATUS.ACTIVATE.value
                                );
                              }
                            }}
                          >
                            {company[0]?.peerActivation ? "Update" : "Activate"}
                          </button>
                        </div>
                      );
                    }}
                  </Field>
                </div>
                <div className={Styles.form}>
                  <div className={Styles.peerSettingsform}>
                    <p className={Styles.title}>Frequency:</p>
                    <span>
                      Select a preferred time and date for the questions to pop
                      up in the slack channel.
                    </span>

                    <div className={Styles.timeSetter}>
                      <Field name="templateFrequency">
                        {({ field, form, meta }: any) => {
                          return (
                            <div className={Styles.dateOptions}>
                              {Object.values(TIMESETTER_VIEW)
                                .slice(1, 4)
                                .map((nav, i) => {
                                  return (
                                    <div
                                      key={i}
                                      data-name={field.name}
                                      className={`${
                                        values.templateFrequency ===
                                          nav.value && Styles.activeLink
                                      }  ${Styles.tabLink}`}
                                      onClick={() => {
                                        form.setFieldValue(
                                          field.name,
                                          nav.value
                                        );
                                      }}
                                    >
                                      {nav.label}
                                    </div>
                                  );
                                })}
                            </div>
                          );
                        }}
                      </Field>

                      <div className={Styles.bottomTimesetter}>
                        {
                          // values.templateFrequency ===
                          // TIMESETTER_VIEW.DAILY.value ? (
                          //   <>
                          //     <div className={Styles.dailyField}>
                          //       Repeat every
                          //       <div style={{ width: "50px" }}>
                          //         <FormInput
                          //           type="number"
                          //           name="templateIntervals"
                          //           value={values.templateIntervals}
                          //           onChange={handleChange}
                          //           height="30px"
                          //           // width="40px"
                          //         />
                          //       </div>
                          //       days beginning {formatFullDate()}
                          //     </div>

                          //     <div className={Styles.dailyTimeField}>
                          //       <Field name="time">
                          //         {({ field, form, meta }: any) => {
                          //           return (
                          //             <FormTimeInput
                          //               name={field.name}
                          //               value={field.value}
                          //               // value={new Date()}
                          //               onChange={(time: any) => {
                          //                 form.setFieldValue(field.name, time);
                          //               }}
                          //             />
                          //           );
                          //         }}
                          //       </Field>
                          //     </div>
                          //   </>
                          // ) :

                          values.templateFrequency ===
                          TIMESETTER_VIEW.WEEKLY.value ? (
                            <>
                              <div className={Styles.dailyField}>
                                Repeat every
                                <div style={{ width: "50px" }}>
                                  <FormInput
                                    type="text"
                                    name="templateIntervals"
                                    value={values.templateIntervals}
                                    onChange={handleChange}
                                    height="30px"
                                    // width="40px"
                                  />
                                </div>
                                weeks beginning {formatFullDate()}
                              </div>

                              <div className={Styles.weekdays_Container}>
                                On
                                <Field name="scheduleDay">
                                  {({ field, form, meta }: any) => {
                                    return (
                                      <div className={Styles.weekdays}>
                                        {Object.values(WEEKDAYS).map(
                                          (day, i) => {
                                            // const bgChange = weekArr.includes(day.value)
                                            //   ? Styles.dayPicked
                                            //   : "";
                                            const bgChange =
                                              values.scheduleDay.includes(
                                                day.value
                                              )
                                                ? Styles.dayPicked
                                                : "";
                                            return (
                                              <div
                                                key={i}
                                                data-name={field.name}
                                                className={bgChange}
                                                onClick={() => {
                                                  if (
                                                    values.scheduleDay.includes(
                                                      day.value
                                                    )
                                                  ) {
                                                    console.log(
                                                      day.value,
                                                      "present"
                                                    );

                                                    const newArr =
                                                      values.scheduleDay.filter(
                                                        (x) => x !== day.value
                                                      );
                                                    // .filter(
                                                    //   (y) => y !== ""
                                                    // );

                                                    form.setFieldValue(
                                                      field.name,
                                                      newArr
                                                    );
                                                  } else {
                                                    const newArr =
                                                      values.scheduleDay;
                                                    // const val = newArr.filter(
                                                    //   (y) => y !== ""
                                                    // );
                                                    newArr.push(day.value);
                                                    form.setFieldValue(
                                                      field.name,
                                                      newArr
                                                    );
                                                  }
                                                }}
                                              >
                                                {day.label}
                                              </div>
                                            );
                                          }
                                        )}
                                      </div>
                                    );
                                  }}
                                </Field>
                              </div>

                              <div className={Styles.dailyTimeField}>
                                <Field name="time">
                                  {({ field, form, meta }: any) => {
                                    return (
                                      <FormTimeInput
                                        name={field.name}
                                        value={field.value}
                                        // value={new Date()}
                                        onChange={(time: any) => {
                                          form.setFieldValue(field.name, time);
                                        }}
                                      />
                                    );
                                  }}
                                </Field>
                              </div>
                            </>
                          ) : values.templateFrequency ===
                            TIMESETTER_VIEW.MONTHLY.value ? (
                            <>
                              <div className={Styles.dailyField}>
                                Repeat every
                                <div style={{ width: "50px" }}>
                                  <FormInput
                                    type="text"
                                    name="templateIntervals"
                                    value={values.templateIntervals}
                                    onChange={handleChange}
                                    height="30px"
                                    // width="40px"
                                  />
                                </div>
                                months beginning {formatFullDate()}
                              </div>

                              <div className={Styles.weekdayRange}>
                                On the
                                <div>
                                  <input
                                    name="scheduleDate"
                                    type="number"
                                    min={1}
                                    max={31}
                                    onChange={handleChange}
                                    value={values.scheduleDate}
                                  />
                                </div>
                                of each month
                              </div>

                              <div className={Styles.dailyTimeField}>
                                <Field name="time">
                                  {({ field, form, meta }: any) => {
                                    return (
                                      <FormTimeInput
                                        name={field.name}
                                        value={field.value}
                                        // value={new Date()}
                                        onChange={(time: any) => {
                                          form.setFieldValue(field.name, time);
                                        }}
                                      />
                                    );
                                  }}
                                </Field>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className={Styles.dailyField}>
                                Repeat every
                                <div style={{ width: "50px" }}>
                                  <FormInput
                                    type="text"
                                    name="templateIntervals"
                                    value={values.templateIntervals}
                                    onChange={handleChange}
                                    height="30px"
                                    // width="40px"
                                  />
                                </div>
                                years beginning {formatFullDate()}
                              </div>

                              <div className={Styles.dailyTimeField}>
                                <Field name="time">
                                  {({ field, form, meta }: any) => {
                                    return (
                                      <FormTimeInput
                                        name={field.name}
                                        value={field.value}
                                        // value={new Date()}
                                        onChange={(time: any) => {
                                          form.setFieldValue(field.name, time);
                                        }}
                                      />
                                    );
                                  }}
                                </Field>
                              </div>
                            </>
                          )
                        }
                      </div>
                    </div>

                    <div>
                      <p className={Styles.title}>Duration:</p>
                      <span>
                        Select a preferred time and date for the questions to
                        pop up in the slack channel.
                      </span>
                      <div className={Styles.durationField}>
                        <Field name="peerDuration">
                          {({ field, form, meta }: any) => {
                            return (
                              <FormSelectBox
                                name={field.name}
                                value={field.value}
                                options={DurationOptions}
                                placeholder="select duration"
                                onChange={(selected: any) => {
                                  form.setFieldValue(
                                    field.name,
                                    selected.value
                                  );
                                }}
                                isInvalid={meta.touched && !!meta.error}
                                validationMessage={meta.touched && meta.error}
                              />
                            );
                          }}
                        </Field>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            );
          }}
        </Formik>
      </div>

      {isResetModalOpen && (
        <ResetModal
          isOpen={isResetModalOpen}
          closeModal={() => setIsResetModalOpen(false)}
          header="<span>Are you sure</>
          <span>you want to Reset</span>"
          message="Resetting overrides all previous settings made."
          actionText="Yes, Reset"
          cancelText="Cancel, Keep it"
          handleAction={() => console.log(`I'M TO RESET`)}
          handleCancel={() => setIsResetModalOpen(false)}
        />
      )}
    </>
  );
};

export default PeerSettings;
