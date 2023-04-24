import React from "react";
import Tags from "../../components/Tags";
import fProgramStyles from "../../styles/Home/FeaturesPrograms.module.css";
import HaraassmentImg from "../../Assets/Images/harassment-at-work.png";
import EverydayImg from "../../Assets/Images/everyday-culture.png";
import DrivingCultureImg from "../../Assets/Images/driving-culture.png";
import LeadershipAmpImg from "../../Assets/Images/leadership-amp.png";
// import lineSvg from "../../Assets/Images/line.svg";

const FeaturedPrograms = () => {
  return (
    <div className={fProgramStyles.content}>
      <div className={fProgramStyles.content_container}>
        <h2>Our Pillars</h2>
        <p>
          OnCulture’s 4 pillars shape employees to drive synergy and performance
        </p>
        <div className={fProgramStyles.tags}>
          <Tags
            mainTxt="Preventing Harassment at Work"
            subText="Sexual and Non-sexual"
            to="/programs/harrassment-in-the-workplace"
            image={HaraassmentImg}
          />
          <Tags
            mainTxt="Everyday Culture"
            subText="Process Automation Templates"
            to="/"
            image={EverydayImg}
          />
          <Tags
            mainTxt="Driving Culture
            at Work"
            subText="Coming soon"
            to="/programs/culture-clinic"
            image={DrivingCultureImg}
          />
          <Tags
            mainTxt="Leadership Amp"
            subText="Coming soon"
            to="/"
            image={LeadershipAmpImg}
          />
        </div>
      </div>
      {/* <div className={fProgramStyles.bgObjectline}>
        <img src={lineSvg} alt="onculture line" />
      </div>
      */}
      <div className={fProgramStyles.bgBlurObject}></div>
    </div>
  );
};

export default FeaturedPrograms;
