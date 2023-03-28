import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type formDateRangeProp = {
  startDate: Date | null;
  endDate: Date | null;
  handleDateChange: any;
};

function FormDateRange({
  startDate,
  endDate,
  handleDateChange,
}: formDateRangeProp) {
  //   const [startDate, setStartDate] = React.useState(new Date());
  //   const [endDate, setEndDate] = React.useState(null);
  //   const onChange = (dates: any) => {
  //     console.log(dates);

  //     // const [start, end] = dates;
  //     // setStartDate(start);
  //     // setEndDate(end);
  //   };

  return (
    <DatePicker
      //   name={name}
      selected={new Date()}
      onChange={handleDateChange}
      startDate={startDate}
      endDate={endDate}
      selectsRange
      inline
    />
  );
}

export default FormDateRange;
