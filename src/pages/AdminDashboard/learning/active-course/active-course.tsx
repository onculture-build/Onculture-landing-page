import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import styles from "../../../../styles/Dashboard/Learning.module.css";
import tagImage from "../../../../Assets/Images/tags.png";
import EmptyState from "../../components/EmptyState";
import emptStateBio from "../../../../Assets/Images/Course-emptyState.svg";
import { RootState, useAppSelector } from "../../../../redux/store";

import LoadingState from "../../components/loadingState";

const ActiveCourses = () => {
  // const p = (23 / 60) * 100;

  const { userToken } = useAppSelector((state: RootState) => state.user);

  const fetchActiveCourses = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Cache-control": "no-cache",
        mode: "cors",
        Authorization: `Bearer ${userToken}`,
      },
    };

    const response = await axios.get(
      `${process.env.REACT_APP_API_PROXY}/activeLearnings`,
      config
    );

    if (response.status === 200) {
      return response.data;
    }
  };

  const {
    data,
    // error,
    // isError,
    isLoading,
    isSuccess,
    // isFetching
  } = useQuery(["activeCourses"], () => fetchActiveCourses(), {
    // keepPreviousData: true,
    // onSuccess: (data) => {
    //   setTotalRecords(data?.data.length);
    // },
  });

  const renderView = () => {
    if (isLoading)
      return (
        <div
          style={{
            width: "100%",
            height: "20vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LoadingState />
        </div>
      );

    if (isSuccess) {
      const courses = data?.payload?.activeCourses;

      if (courses?.length <= 0)
        return (
          <div className={styles.empty}>
            <EmptyState
              imag={emptStateBio}
              text="Looks like you have not picked a course yet. <br /> Click here to get it completed."
            />
          </div>
        );

      return (
        <div className={styles.courseList}>
          {courses?.map((course: any, i: number) => {
            const courseLink =
              course.courseDetails.title === "Harassment in the Workplace"
                ? "/dashboard/learning/harrassment-in-the-workplace"
                : course.courseDetails.title === "Culture Clinic"
                ? "/dashboard/learning/culture-clinic"
                : "/dashboard/learning";
            return (
              <div key={i} className={styles.course_card}>
                <div className={styles.ImageCard}>
                  <img src={tagImage} alt="tags" />
                </div>
                <div className={styles.content}>
                  <h4>{course.courseDetails.title}</h4>

                  <button
                  // onClick={() => Navigate(courseLink)}
                  >
                    See details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      );
    }
  };

  return (
    <div className={styles.activeCourse_Container}>
      <p className={styles.title}>Active Course</p>

      {/* <p>23 of 60 slot used</p>
            <div className={styles.progressBar}>
              <div className={styles.progress} style={{ width: `${p}%` }}></div>
            </div> */}

      {renderView()}
    </div>
  );
};

export default ActiveCourses;
