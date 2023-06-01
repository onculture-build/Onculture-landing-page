import React from "react";
import footerStyle from "../../styles/Home/Footer.module.css";
import oncultureLogo from "../../Assets/Images/onculture-logo-white.png";
import igLogo from "../../Assets/Images/instagram.svg";
import lnLogo from "../../Assets/Images/linkedin.svg";
import twtLogo from "../../Assets/Images/twitter.svg";

const Footer = () => {
  return (
    <div className={footerStyle.container}>
      <div className={footerStyle.content}>
        <div className={footerStyle.oncultureFoot}>
          <img
            className={footerStyle.companyImg}
            src={oncultureLogo}
            alt="onculture-logo"
          />
          <p>Copyright &copy; 2023 OnCulture.</p>
          <p>All rights reserved</p>
          <div className={footerStyle.socialIcons}>
            <a href='https://www.instagram.com/onculture_/' target="blank" >  <img src={igLogo} alt="onculture instagram" /></a>
            <a href='https://www.linkedin.com/company/onculture-global/' target="blank" >
              <img src={lnLogo} alt="onculture linkedin" />
            </a>
            <a href='https://twitter.com/OnCulture_' target="blank" >
              <img src={twtLogo} alt="onculture twitter" />
            </a>
          </div>
          <p>Get@OnCulture.io</p>
        </div>
        <div className={footerStyle.contact}>
          <div>
            <h4>Company</h4>
            <ul>
              <li>About The People Practice</li>
              <li>FAQ</li>
              <li>Pricing</li>
            </ul>
          </div>
          <div>
            <h4>Support</h4>
            <ul>
              <li>Terms of service</li>
              <li>Legal</li>
              <li>Privacy policy</li>
              <li>Copyright</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
