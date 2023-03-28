import React from "react";
import { Field, Formik } from "formik";
import { TEMPLATE_VIEW } from "../../../enum";
import { RiRefreshLine } from "react-icons/ri";
import FormSelectBox from "../../../../../components/form-select-box";
import TopStyles from "../../../../../styles/Dashboard/Templates/template.module.css";
import Styles from "../../../../../styles/Dashboard/Templates/peer.module.css";
import { PeerProps, DayOptions, DurationOptions } from "../../../enum";

const FireSideSettings = ({ currentView, setCurrentView }: PeerProps) => {
  return (
    <div>
      <Formik
        //  validationSchema={INVITE_EMPLOYEE_FORM_SCHEMA}
        initialValues={{ date: "", time: "", channel: "" }}
        onSubmit={(values) => {
          //    console.log(values);
        }}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => {
          return (
            <form>
              <div className={TopStyles.header}>
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

                <div className={TopStyles.Btns}>
                  <button className={TopStyles.refresh}>
                    <RiRefreshLine fontSize={25} />
                    Refresh
                  </button>
                  <button className={TopStyles.save}>Save</button>
                  <button className={TopStyles.activate}>Activate</button>
                </div>
              </div>
              <div className={Styles.peerSettingsform}>
                <p>Date and Time:</p>
                <span>
                  Select a preferred time and date for the questions to pop up
                  in the slack channel.
                </span>
                <div className={Styles.dateTime}>
                  <div className={Styles.date}>
                    <Field name="date">
                      {({ field, form, meta }: any) => {
                        return (
                          <FormSelectBox
                            name={field.name}
                            value={field.value}
                            options={DayOptions}
                            placeholder="select day"
                            onChange={(selected: any) => {
                              form.setFieldValue(field.name, selected.value);
                            }}
                          />
                        );
                      }}
                    </Field>
                  </div>

                  <div className={Styles.time}>
                    <Field name="time">
                      {({ field, form, meta }: any) => {
                        return (
                          <FormSelectBox
                            name={field.name}
                            value={field.value}
                            options={DayOptions}
                            placeholder="select time"
                            onChange={(selected: any) => {
                              form.setFieldValue(field.name, selected.value);
                            }}
                          />
                        );
                      }}
                    </Field>
                  </div>
                </div>

                <div>
                  <p>Channel:</p>
                  <span>
                    Select a preferred channel questions to pop up in the slack
                    channel.
                  </span>
                  <div className={Styles.durationField}>
                    <Field name="channel">
                      {({ field, form, meta }: any) => {
                        return (
                          <FormSelectBox
                            name={field.name}
                            value={field.value}
                            options={DurationOptions}
                            placeholder="select channel"
                            onChange={(selected: any) => {
                              form.setFieldValue(field.name, selected.value);
                            }}
                          />
                        );
                      }}
                    </Field>
                  </div>
                </div>

                <div className={Styles.topicPreview}>
                  <p>Topics preview:</p>
                  <span>
                    The questions below will be sent randomly to the channel for
                    engagement
                  </span>

                  <div className={Styles.previewContainer}>
                    <ul>
                      <li>What book recently changed your mind?</li>
                      <li>What is a must read book for you? </li>
                      <li>What Series are you bingeing on?</li>
                      <li>Favourite road trip</li>
                      <li>Best concert</li>
                    </ul>
                  </div>
                </div>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default FireSideSettings;
