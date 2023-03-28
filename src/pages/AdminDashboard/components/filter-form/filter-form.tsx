import React from "react";
import moment from "moment";
import { FaSortAmountUp } from "react-icons/fa";
import Styles from "../../../../styles/Dashboard/Dashboard.module.css";
import { formatFilterDate } from "../../helpers";
import FormDateRange from "../../../../components/form-date-range";

const forAll = {
  startDate: formatFilterDate(new Date("Jul 12 2011")),
  endDate: formatFilterDate(moment().endOf("week").toString()),
};

const todayDates: dateProps = {
  startDate: formatFilterDate(new Date()),
  endDate: formatFilterDate(new Date()),
};

const thisWeekDates: dateProps = {
  startDate: formatFilterDate(moment().startOf("week").toString()),
  endDate: formatFilterDate(moment().endOf("week").toString()),
};

const thisMonthDates: dateProps = {
  startDate: formatFilterDate(moment().startOf("month").toString()),
  endDate: formatFilterDate(moment().endOf("month").toString()),
};

const FILTER_OPTIONS = [
  {
    label: "All",
    value: forAll,
  },
  {
    label: "Today",
    value: todayDates,
  },
  {
    label: "This Week",
    value: thisWeekDates,
  },
  {
    label: "This Month",
    value: thisMonthDates,
  },
  {
    label: "Custom",
    value: {
      startDate: "",
      endDate: "",
    },
  },
];

interface filterProp {
  // handleFilterOption: (value: dateProps) => void;
  handleFilterOption: any;
}

interface dateProps {
  startDate: string;
  endDate: string;
}

const FilterForm = ({ handleFilterOption }: filterProp) => {
  const [showOptions, setShowOptions] = React.useState<boolean>(false);
  const [filter, setFilter] = React.useState<string>(FILTER_OPTIONS[0].label);
  const [showCalender, setShowCalender] = React.useState(false);

  console.log(showCalender);

  const handleDateChange = (dates: Date[]) => {
    console.log(dates);
    const [start, end] = dates;
    FILTER_OPTIONS[4].value = {
      startDate: formatFilterDate(start),
      endDate: formatFilterDate(end),
    };

    handleFilterOption(FILTER_OPTIONS[4].value);
    setShowCalender(false);

    // FILTER_OPTIONS[4].value = {
    //   startDate: "",
    //   endDate: "",
    // };
  };

  // if (filter === "Custom") {
  //   console.log("hygfghj");
  //   console.log(filter);
  //   handleFilterOption(FILTER_OPTIONS[4].value);
  // } // handleFilter();

  // console.log(FILTER_OPTIONS);

  // React.useEffect(() => {
  //   // handleFilterOption(FILTER_OPTIONS[4].value);
  //   if (filter === "Custom") {
  //     console.log("hygfghj");
  //     console.log(filter);
  //     handleFilterOption(FILTER_OPTIONS[4].value);
  //   } // handleFilter();

  //   console.log(FILTER_OPTIONS);
  // }, [filter]);

  return (
    <>
      <div style={{ position: "relative" }}>
        <div
          className={Styles.filterform_Container}
          onClick={() => setShowOptions((prev) => !prev)}
        >
          {/* <input type="text" /> */}
          <FaSortAmountUp fontSize={18} />
          <span>Filter: {filter}</span>

          {showOptions && (
            <div className={Styles.filterOptions}>
              {FILTER_OPTIONS.map((options, i) => (
                <p
                  key={i}
                  onClick={() => {
                    setFilter(options.label);
                    if (options.label !== "Custom") {
                      handleFilterOption(options.value);
                    } else {
                      setShowCalender(true);
                    }
                  }}
                >
                  {options.label}
                </p>
              ))}
            </div>
          )}
        </div>

        {showCalender && (
          <div className={Styles.customDateRange}>
            <FormDateRange
              startDate={new Date("Jul 12 2022")}
              endDate={null}
              handleDateChange={handleDateChange}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default FilterForm;
