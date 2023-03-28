import React from "react";
import axios from "axios";
import * as yup from "yup";
import { Formik, Field } from "formik";
// import { toast } from "react-toastify";
import { RootState, useAppSelector } from "../../../../../redux/store";
import {
  SETTINGS_STATUS,
  TEMPLATE_VIEW,
  TIMESETTER_VIEW,
  WEEKDAYS,
} from "../../../enum";
import {
  formatFullDate,
  formatTime,
  getTimeFromString,
} from "../../../helpers";
import { MOODCHECKERS } from "../../../data";
import { RiRefreshLine } from "react-icons/ri";
import useChannels from "../../../hooks/useChannels";
import useSumupSettings from "../hooks/useSumupSettings";
import ResetModal from "../../../components/reset-modal";
import SuccessModal from "../../../components/SuccessModal";
import FormInput from "../../../../../components/form-input";
import FormSelectBox from "../../../../../components/form-select-box";
import FormTimeInput from "../../../../../components/form-time-input";
import Styles from "../../../../../styles/Dashboard/Templates/team-sumup.module.css";
import TopStyles from "../../../../../styles/Dashboard/Templates/template.module.css";

const TEAM_SUMUP_SETTINGS_FORM_SCHEMA = yup.object().shape({
  templateFrequency: yup.string(),
  templateIntervals: yup.number(),
  scheduleDate: yup.number(),
  time: yup.date(),
  channelId: yup.string(),
  scheduleDay: yup.array().when("templateFrequency", {
    is: (value: any) => value === TIMESETTER_VIEW.WEEKLY.value,
    then: yup.array(),
    // .required('Event virtual link is required')
    otherwise: yup.array().notRequired().nullable(),
  }),
  past: yup.string(),
  plan: yup.string(),
  blockers: yup.string(),
  support: yup.string(),
  moodChecker: yup.boolean(),
  sumUpStatus: yup.string(),
});

type InitialValueProps = {
  templateFrequency: string;
  templateIntervals: number | string;
  scheduleDate: number | string;
  time: any;
  channelId: string;
  scheduleDay: number[];
  past: string;
  plan: string;
  blockers: string;
  support: string;
  moodChecker: boolean;
  sumUpStatus: string;
};

type TeamupProps = {
  currentView: string;
  setCurrentView: (val: string) => void;
  position: boolean;
};

const TeamSumupSettings = ({
  currentView,
  setCurrentView,
  position,
}: TeamupProps) => {
  const { data: channelsData, isLoading: channelsLoading } = useChannels();
  const [toggleSupport, setToggleSupport] = React.useState<boolean>(false);
  const [showMoodchecker, setShowMoodchecker] = React.useState<boolean>(false);
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [isResetModalOpen, setIsResetModalOpen] =
    React.useState<boolean>(false);

  const { data, refetch } = useSumupSettings();

  const [formInitialValues, setFormInitialValues] =
    React.useState<InitialValueProps>({
      templateFrequency: "Daily",
      templateIntervals: "",
      scheduleDate: "",
      time: "",
      channelId: "",
      scheduleDay: [],
      past: "What have you achived since your last sum-up?",
      plan: "What do you plan to do before the next sum-up?",
      blockers: "Any restrictions?",
      support:
        "What support do you need on what you are working on and from whom?",
      moodChecker: false,
      sumUpStatus: "",
    });

  // console.log(new Date().toDateString());
  // console.log(new Date().toISOString());
  // console.log(new Date().toTimeString());

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

  React.useEffect(() => {
    let settingsData = data?.payload?.settings;

    if (settingsData) {
      setFormInitialValues({
        ...formInitialValues,
        templateFrequency: settingsData.templateFrequency,
        channelId: settingsData.channelId,
        past: settingsData.sumUpQuestions.past,
        plan: settingsData.sumUpQuestions.plan,
        blockers: settingsData.sumUpQuestions.blockers,
        support: settingsData.sumUpQuestions.support,
        moodChecker: settingsData.sumUpQuestions.moodChecker,
        templateIntervals: settingsData?.noOfDaysInterval,
        time: getTimeFromString(settingsData?.scheduleTime),
      });

      setShowMoodchecker(settingsData.sumUpQuestions.moodChecker);
    }
  }, [data?.payload?.settings]);

  const handleSettings = async (values: any) => {
    try {
      const obj = {
        templateType: "team_sum_up",
        templateFrequency: values.templateFrequency,
        templateIntervals: Number(values.templateIntervals),
        scheduleTime: values.scheduleTime,
        scheduleDate: values.scheduleDate,
        scheduleDay:
          values.templateFrequency === "Weekly" ? values.scheduleDay : [],
        channelId: values.channelId,
        sumUpQuestions: {
          past: values.past,
          plan: values.plan,
          blockers: values.blockers,
          support: toggleSupport ? values.support : "",
          moodChecker: showMoodchecker,
        },
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
          btnAction="/dashboard/templates/team-sum-up"
        />
      )}
      <div className={Styles.settings}>
        <Formik
          enableReinitialize
          validationSchema={TEAM_SUMUP_SETTINGS_FORM_SCHEMA}
          initialValues={formInitialValues}
          onSubmit={(values: InitialValueProps) => {
            console.log(values);
            const payload = {
              ...values,
              scheduleTime: formatTime(values.time),
            };
            handleSettings(payload);
          }}
        >
          {({ values, errors, handleChange, handleSubmit, dirty }) => {
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
                            // disabled={company[0]?.teamSumUpActivation}
                            disabled={!dirty && !company[0]?.isSlackEnabled}
                            type="submit"
                            onClick={() => {
                              if (!company[0]?.teamSumUpActivation) {
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
                            {company[0]?.teamSumUpActivation
                              ? "Update"
                              : "Activate"}
                          </button>
                        </div>
                      );
                    }}
                  </Field>
                </div>
                <div className={Styles.form}>
                  <div className={Styles.formContainer}>
                    <p>Frequency:</p>
                    <span>
                      Select a preferred time and date for the questions to pop
                      up in the slack channel.
                    </span>

                    <div className={Styles.timeSetter}>
                      <Field name="templateFrequency">
                        {({ field, form, meta }: any) => {
                          return (
                            <div className={Styles.dateOptions}>
                              {Object.values(TIMESETTER_VIEW).map((nav, i) => {
                                return (
                                  <div
                                    key={i}
                                    data-name={field.name}
                                    className={`${
                                      values.templateFrequency === nav.value &&
                                      Styles.activeLink
                                    }  ${Styles.tabLink}`}
                                    onClick={() => {
                                      form.setFieldValue(field.name, nav.value);
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
                        {values.templateFrequency ===
                        TIMESETTER_VIEW.DAILY.value ? (
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
                              days beginning {formatFullDate()}
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
                                      {Object.values(WEEKDAYS).map((day, i) => {
                                        // const bgChange = weekArr.includes(day.value)
                                        //   ? Styles.dayPicked
                                        //   : "";
                                        const bgChange =
                                          values.scheduleDay.includes(day.value)
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
                                                // .filter((y) => y !== "");

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
                                      })}
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
                                      company={company}
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
                        )}
                      </div>
                    </div>

                    <div>
                      <p>Channel:</p>
                      <span>
                        Select a preferred time and date for the questions to
                        pop up in the slack channel.
                      </span>
                      <div className={Styles.channelField}>
                        <Field name="channelId">
                          {({ field, form, meta }: any) => {
                            return (
                              <FormSelectBox
                                name={field.name}
                                value={field.value}
                                isLoading={channelsLoading}
                                // isLoading={true}
                                options={channelsData?.data.map(
                                  (channel: any) => ({
                                    label: channel.name,
                                    value: channel.id,
                                  })
                                )}
                                placeholder="select channel"
                                onChange={(selected: any) => {
                                  form.setFieldValue(
                                    field.name,
                                    selected.value
                                  );
                                }}
                              />
                            );
                          }}
                        </Field>
                      </div>
                    </div>

                    <p>Questions:</p>
                    <span className={Styles.questions}>
                      Select a preferred time and date for the questions to pop
                      up in the slack channel.
                    </span>

                    <FormInput
                      label="Past:"
                      type="text"
                      name="past"
                      value={values.past}
                      onChange={handleChange}
                    />

                    <FormInput
                      label="Plan:"
                      type="text"
                      name="plan"
                      value={values.plan}
                      onChange={handleChange}
                    />

                    <FormInput
                      label="Blockers:"
                      type="text"
                      name="blockers"
                      placeholder=""
                      value={values.blockers}
                      onChange={handleChange}
                    />

                    <div
                      className={`${
                        !toggleSupport ? Styles.supportField : ""
                      } `}
                    >
                      <div className={Styles.supportFieldLabel}>
                        <span>Support:</span>
                        <div className={Styles.toggleSupport}>
                          <input
                            type="checkbox"
                            id="switch"
                            onClick={() => setToggleSupport((prev) => !prev)}
                          />
                          <label htmlFor="switch"></label>
                        </div>
                      </div>

                      <FormInput
                        type="text"
                        name="support"
                        placeholder="What support do you need on what you are working on and from whom?"
                        value={values.support}
                        onChange={handleChange}
                        disabled={!toggleSupport}
                      />
                    </div>

                    {/* mood checkers */}
                    <div>
                      <div className={Styles.supportFieldLabel}>
                        <span>Moodcheckers:</span>
                        <div className={Styles.toggleSupport}>
                          <input
                            type="checkbox"
                            id="switchMood"
                            // onClick={() => setShowMoodchecker((prev) => !prev)}
                            // defaultChecked={values.moodChecker}
                            checked={values.moodChecker}
                            // checked={showMoodchecker}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              console.log(e.target.checked);
                              console.log(values.moodChecker);
                              setShowMoodchecker(e.target.checked);
                              values.moodChecker = e.target.checked;

                              //                               if(e.target.checked){
                              // // console.log();
                              // setShowMoodchecker(true)

                              //                               } else {
                              //                                 setShowMoodchecker(true)

                              //                               }
                            }}
                          />
                          <label htmlFor="switchMood"></label>
                        </div>
                      </div>

                      <div className={Styles.moodChecker_Container}>
                        {values.moodChecker ? (
                          <>
                            {Object.values(MOODCHECKERS).map((mood, i) => (
                              <div key={i} className={Styles.moodText}>
                                <img src={mood.active} alt="emoji" />
                                <span>{mood.text}</span>
                              </div>
                            ))}
                          </>
                        ) : (
                          <>
                            {Object.values(MOODCHECKERS).map((mood, i) => (
                              <div key={i} className={Styles.moodText}>
                                <img src={mood.inactive} alt="emoji" />
                                <span>{mood.text}</span>
                              </div>
                            ))}
                          </>
                        )}
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

export default TeamSumupSettings;
