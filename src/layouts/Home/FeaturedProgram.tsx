import React from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import Nav from "../../components/Nav";
import Video from "../../components/Video";
import Bullet from "../../Assets/Images/bullet.svg";
import { ProgramSummary } from "../../constants/data";
import CustomButton from "../../components/custom-button";
import styles from "../../styles/Home/FeaturedProgram.module.css";

const FeaturedProgram = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const pageData = ProgramSummary.filter(
    (summary) => summary.path === location.pathname
  );

  return (
    <>
      <Nav />
      <div className={styles.main}>
        <button className={styles.back} onClick={() => navigate(-1)}>
          <MdKeyboardArrowLeft fontSize={22} />
          <span>Back</span>
        </button>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.heading_cta}>
              <h2>{pageData[0].title}</h2>
              <CustomButton
                look="primary"
                className={styles.contentBtn}
                onClick={() => navigate("/pricing")}
              >
                Subscribe
              </CustomButton>
            </div>
            {pageData[0].intro.map((intro, i) => {
              return <p key={i}>{intro}</p>;
            })}

            {pageData[0].qa && (
              <div className={styles.qa}>
                <p>{pageData[0]?.qa.ques}</p>
                <p>{pageData[0]?.qa.ans}</p>
              </div>
            )}

            {pageData[0].subs.map((sub, i) => {
              return (
                <>
                  <div key={i} className={styles.listSection}>
                    <h5>{sub.title}</h5>
                    {sub.items.map((item, i) => (
                      <div className={styles.listItem} key={i}>
                        <div>
                          <img src={Bullet} alt="bullet" />
                        </div>

                        <p>{item}</p>
                      </div>
                    ))}
                  </div>
                </>
              );
            })}
          </div>
          <div className={styles.videoSection}>
            <h2>{pageData[0].title}</h2>
            <Video />
          </div>
        </div>
      </div>
    </>
  );
};

export default FeaturedProgram;
