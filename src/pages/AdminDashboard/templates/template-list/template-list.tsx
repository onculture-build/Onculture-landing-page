import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "../../components/DashboardHeader";
import Styles from "../../../../styles/Dashboard/Templates/template.module.css";
import { Templates } from "../../data";
import { RootState, useAppSelector } from "../../../../redux/store";

const TemplateList = () => {
  const navigate = useNavigate();

  const {
    profileInfo: { company },
  } = useAppSelector((state: RootState) => state.user);
  console.log(company);

  const activatedTags: boolean[] = [];
  activatedTags[0] = company[0]?.teamSumUpActivation;
  activatedTags[1] = company[0]?.peerActivation;
  activatedTags[2] = company[0]?.fireSideActivation;
  activatedTags[3] = company[0]?.complaintActivation;
  activatedTags[4] = company[0]?.shoutOutsActivation;
  activatedTags[5] = company[0]?.valueStarActivation;

  console.log(activatedTags);

  // const formatting = () => {
  //   let objectDate = new Date();

  //   let day = objectDate.getDate();
  //   let month = objectDate.getMonth();
  //   let year = objectDate.getFullYear();

  //   return `${day}-${month + 1}-${year}`;
  // };

  // console.log(formatting());

  return (
    <>
      <DashboardHeader>Templates</DashboardHeader>
      <div
        style={{
          minHeight: "calc(100vh - 73px)",
        }}
      >
        <div className={Styles.templateList_Container}>
          {Templates.map(({ icon, title, tag, slug }, i) => {
            return (
              // <Link to={`/dashboard/templates/${template.slug}`} key={i}>
              <div
                className={Styles.template_card}
                key={i}
                onClick={() => navigate(`/dashboard/templates/${slug}`)}
              >
                <div>
                  <img src={icon} alt="icon" />
                </div>
                <div className={Styles.content}>
                  <span className={Styles.title}>{title}</span>
                  <div className={Styles.tags}>
                    <span className={Styles.tag}>{tag}</span>

                    {activatedTags[i] && (
                      <span className={Styles.activate}>Activated</span>
                    )}
                  </div>
                </div>
              </div>
              // </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default TemplateList;
