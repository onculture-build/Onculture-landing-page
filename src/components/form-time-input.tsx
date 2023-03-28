import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { RootState, useAppSelector } from "../redux/store";

type formTimeInputProp = {
  label?: string;
  name: string;
  value: any;
  placeholder?: string;
  isLoading?: boolean;
  isInvalid?: boolean;
  validationMessage?: boolean;
  onChange: any;
  height?: number;
  company?: any;
};

function isIntervalBetween(intervalStart:any, intervalEnd:any, startDateTime:any, endDateTime:any) {
  return (intervalStart >= startDateTime && intervalStart <= endDateTime) || (intervalEnd >= startDateTime && intervalEnd <= endDateTime);
}

function FormTimeInput({
  // label,
  name,
  value,
  // placeholder,
  // showTimeSelect = false,
  // isInvalid,
  // validationMessage,
  // dateFormat = 'MMMM dd, yyyy;  h:mm aa',
  onChange,
  ...datepickerProps
}: formTimeInputProp) {
  const { userToken, profileInfo } = useAppSelector(
    (state: RootState) => state.user
  );
  const { company } = profileInfo;
  // console.log(company, "BALLON DOR")
  const currentTime = new Date()
  const endTime = new Date(currentTime.getTime() + company[0].employees.length * 60000);
  const startHour = currentTime.getHours();
  const endHour = endTime.getHours();
  let excludedTime = new Date(currentTime);
  const excludedTimes = [];
  const next15Minute = Math.ceil(endTime.getMinutes() / 15) * 15;
  const upperLimit = new Date(endTime.getTime());
  upperLimit.setMinutes(next15Minute);
  
  

  for (let i = startHour; i <= endHour; i++) {
    if (currentTime.getMinutes() >= 0 && currentTime.getMinutes() < 15) {
      excludedTimes.push(
        // new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), i, 0),
        new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), i, 15)
      );
    }

    if (currentTime.getMinutes() >= 15 && currentTime.getMinutes() < 30) {
      excludedTimes.push(
        // new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), i, 15),
        new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), i, 30)
      );
    }

    if (currentTime.getMinutes() >= 30 && currentTime.getMinutes() < 45) {
      excludedTimes.push(
        // new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), i, 30),
        new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), i, 45));
    }

    if (currentTime.getMinutes() >= 45) {
      excludedTimes.push(new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), i, 45));
    }

    // Check if the end time falls in a 15 minute interval
    if (endTime.getMinutes() >= 0 && endTime.getMinutes() < 15) {
      excludedTimes.push(
        // new Date(endTime.getFullYear(), currentTime.getMonth(), endTime.getDate(), i, 0),
        new Date(endTime.getFullYear(), currentTime.getMonth(), endTime.getDate(), i, 15));
    }

    if (endTime.getMinutes() >= 15 && endTime.getMinutes() < 30) {
      excludedTimes.push(
        // new Date(endTime.getFullYear(), currentTime.getMonth(), endTime.getDate(), i, 15),
        new Date(endTime.getFullYear(), currentTime.getMonth(), endTime.getDate(), i, 30));
    }

    if (endTime.getMinutes() >= 30 && endTime.getMinutes() < 45) {
      excludedTimes.push(
        // new Date(endTime.getFullYear(), currentTime.getMonth(), endTime.getDate(), i, 30),
        new Date(endTime.getFullYear(), currentTime.getMonth(), endTime.getDate(), i, 45));
    }

    if (endTime.getMinutes() >= 45) {
      excludedTimes.push(new Date(endTime.getFullYear(), currentTime.getMonth(), endTime.getDate(), i, 45));
    }
  }

  console.log(excludedTimes,excludedTime, endTime, "EXCLUDED TIMES")

  
  return (
    <>
      {/* {label && (
          <Pane marginBottom={majorScale(1)} display="flex">
            <Label>{label}</Label>
          </Pane>
        )} */}

      <DatePicker
        name={name}
        selected={value}
        onChange={onChange}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="h:mm aa"
        placeholderText="Select time"
        excludeTimes={excludedTimes}
        {...datepickerProps}
      />

      {/* {isInvalid && (
          <Pane
            marginTop={majorScale(1)}
            display="flex"
            columnGap={majorScale(1)}
            color="#D14343"
          >
            <ErrorIcon />
            <Paragraph
              letterSpacing={0}
              color="#D14343"
              lineHeight="18px"
              fontSize="12px"
              fontWeight={400}
              marginBottom={0}
            >
              {validationMessage}
            </Paragraph>
          </Pane>
        )} */}
    </>
  );
}

export default FormTimeInput;
