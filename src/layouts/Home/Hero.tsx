import React from "react";
import Button from "../../components/Button";
import Video from "../../components/Video";
import heroStyles from "../../styles/Home/Hero.module.css";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className={heroStyles.homeHero}>
      <div className={heroStyles.heroContent}>
        <div className={heroStyles.leftContent}>
          <h1>Optimising teams through Culture</h1>
          <p>
            OnCulture improves companies’ culture by driving performance and synergy through learning, process automation and community.
          </p>

          <Link to="/login">
            <Button className={heroStyles.heroBtn}>Join the waitlist</Button>
          </Link>
          
        </div>
        {/* <div className={heroStyles.vid}>
          <Video />
        </div> */}
      </div>
    </div>
  );
};

export default Hero;
