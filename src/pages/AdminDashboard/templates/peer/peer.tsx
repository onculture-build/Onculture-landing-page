import React from "react";
import { Link } from "react-router-dom";
import { TEMPLATE_VIEW } from "../../enum";
import { MdKeyboardArrowRight } from "react-icons/md";
import DashboardHeader from "../../components/DashboardHeader";
import Styles from "../../../../styles/Dashboard/Templates/template.module.css";
import PeerSettings from "./peer-settings/peer-settings";
import PeerSummary from "./peer-summary/peer-summary";
import PeerAdvanced from "./peer-advanced/peer-advanced";

const Peer = () => {
  const [currentView, setCurrentView] = React.useState(
    TEMPLATE_VIEW.SUMMARY.value
  );

  const headerRef = React.useRef(null);
  const [isFixed, setFixed] = React.useState(false);
  // const scrollRef = React.useRef(0);

  React.useEffect(() => {
    const callbackFunction = (entries: any) => {
      const [entry] = entries;
      // console.log(entry.isIntersecting);
      // console.log(entry, "ENTRY");

      if (entry.isIntersecting) {
        setFixed(entry.isIntersecting);
        // console.log("DOWN");
        // console.log("WILL BE FIXED");

        // scrollRef.current = window.scrollY;
        // return;
      } else {
        setFixed(false);
        // console.log("WILL BE UNFIXED");
      }

      // const diff = scrollRef.current - window.scrollY;
      // const isScrollingUp = diff > 0;
      // if (isScrollingUp) {
      //   setFixed(false);
      //   console.log("UP");
      // }

      // setFixed(entry.isIntersecting);
    };

    const options = {
      // root: headerRef.current,
      rootMargin: "95px 0px 0px 0px",
      // threshold: 1.0,
      threshold: 1,
    };

    const observer = new IntersectionObserver(callbackFunction, options);

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    // if (headerRef.current) observer.observe(headerRef.current);

    return () => {
      if (headerRef.current) observer.observe(headerRef.current);
    };
  }, [headerRef]);

  console.log(isFixed);

  console.log(headerRef);

  const renderView = () => {
    switch (currentView) {
      case "Summary":
        return (
          <PeerSummary
            currentView={currentView}
            setCurrentView={setCurrentView}
            position={isFixed}
          />
        );
      case "Settings":
        return (
          <PeerSettings
            currentView={currentView}
            setCurrentView={setCurrentView}
            position={isFixed}
          />
        );

      case "Advanced":
        return (
          <PeerAdvanced
            currentView={currentView}
            setCurrentView={setCurrentView}
            position={isFixed}
          />
        );

      default:
        break;
    }
  };
  return (
    <>
      <DashboardHeader>
        <Link to="/dashboard/templates">
          <span>Templates</span>
        </Link>
        <MdKeyboardArrowRight fontSize={20} />
        <span>Peer 1:1</span>
      </DashboardHeader>

      <div className={Styles.container} ref={headerRef}>
        <h2>Peer 1:1 (Google Call)</h2>
        <p>
          Understanding and engagement among team members can improve
          productivity among team memebers. The Peer 1:1 template allows
          employees to meet and relate with random team members through a 1:1
          call moderated using Oncultures topic suggestions
        </p>
      </div>

      <div style={{ minHeight: "calc(100vh - 258px)" }}>{renderView()}</div>
    </>
  );
};

export default Peer;
