import React from "react";
import EmptyState from "../../../components/EmptyState";
import emptStateBio from "../../../../../Assets/Images/Payment.svg";
import boardStyle from "../../../../../styles/Dashboard/Dashboard.module.css";
import { RootState, useAppSelector } from "../../../../../redux/store";
import Button from "../../../../../components/Button";
import SubscriptionsTable from "../../../../../components/Table/SubscriptionsTable";
import PaymentCard from "../../../components/PaymentCard";

const Payments = () => {
  const { profileInfo, userToken } = useAppSelector(
    (state: RootState) => state.user
  );
  const { courses: allCourses } = profileInfo.company[0];
  const courses = [allCourses[0]];

  console.log(courses, "frre");
  const renderView = () => {
    if (!courses.length) {
      return (
        <div className={boardStyle.centerEmptyState}>
          <EmptyState
            imag={emptStateBio}
            head='<h5 className="mediumText">You do not have an active subscription</h5>'
            text="Subscribe to any of our packages to have access to OnCulture tools and Courses"
            btnText="Subscribe"
          />
        </div>
      );
    }
    return (
      <>
        <div className={boardStyle.paymentActive}>
          <h4>Active Subscriptions</h4>
          <button className={boardStyle.paymentButton}>Change Plan</button>
        </div>
        <div>
          {courses.some((course: any) => course.status === "Active") ? (
            <div className={boardStyle.payCardList}>
              {" "}
              {courses.map((course: any, index: any) => {
                return (
                  <div key={index}>
                    <PaymentCard
                      head={course.title}
                      subhead={course.planName}
                      total={course.amount}
                      availableSlot={course.noOfSlotUsed}
                      totalSlot={course.noOfSlots}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className={boardStyle.centerEmptyState}>
              <EmptyState
                imag={emptStateBio}
                text="<button className='smallButton'>subscribe</button>"
                head='<h5 className="mediumText">You do not have an active subscription</h5>'
              />
            </div>
          )}
        </div>

        <div className={boardStyle.paymentTable}>
          <SubscriptionsTable data={courses} rowsPerPage={6} />
        </div>
      </>
    );
  };

  return (
    <>
      <div className={boardStyle.paymentBoard}>{renderView()}</div>
    </>
  );
};

export default Payments;
