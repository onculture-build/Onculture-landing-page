import React from "react";
import { courses } from "../../data/index";
import tagImage from "../../../../Assets/Images/tags.png";
import styles from "../../../../styles/Dashboard/Learning.module.css";

const CourseList = () => {
  return (
    <div className={styles.courseList_Container}>
      <p className={styles.CourseListTitle}>Check out Courses</p>
      <div className={styles.courseList}>
        {courses.map((item, i) => (
          <div className={styles.course_card} key={i}>
            <div className={styles.ImageCard}>
              <img src={tagImage} alt="tags" />
            </div>
            <div className={styles.course_content}>
              <h4>{item.title}</h4>
              <p>{item.tag}</p>

              <a href={`${item.path}`} target="_blank" rel="noreferrer">
                See details
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
