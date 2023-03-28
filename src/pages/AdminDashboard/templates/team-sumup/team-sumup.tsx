import React from "react";
import { Link } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import DashboardHeader from "../../components/DashboardHeader";
import Styles from "../../../../styles/Dashboard/Templates/template.module.css";
import { TEMPLATE_VIEW } from "../../enum";
import TeamSumupSummary from "./team-sumup-summary/team-sumup-summary";
import TeamSumupSettings from "./team-sumup-settings/team-sumup-settings";
import TeamsumupAdvanced from "./team-sumup-advanced/team-sumup-advanced";

const TeamSumUp = () => {
  const [currentView, setCurrentView] = React.useState(
    TEMPLATE_VIEW.SUMMARY.value
  );

  const headerRef = React.useRef(null);
  const [isFixed, setFixed] = React.useState(false);
  const scrollRef = React.useRef(0);

  React.useEffect(() => {
    const callbackFunction = (entries: any) => {
      const [entry] = entries;
      // console.log(entry, "ENTRY");

      if (entry.isIntersecting) {
        setFixed(entry.isIntersecting);
        console.log("WILL BE FIXED");

        scrollRef.current = window.scrollY;
        return;
      } else {
        setFixed(false);
        console.log("WILL BE UNFIXED");
      }
    };

    const options = {
      // root: headerRef.current,
      rootMargin: "110px 0px 0px 0px",
      threshold: 1,
    };

    const heading = headerRef.current!;

    const observer = new IntersectionObserver(callbackFunction, options);

    if (heading) {
      observer.observe(heading);
    }

    return () => {
      if (heading) observer.observe(heading);
    };
  }, [headerRef]);

  const renderView = () => {
    switch (currentView) {
      case "Summary":
        return (
          <TeamSumupSummary
            currentView={currentView}
            setCurrentView={setCurrentView}
            position={isFixed}
          />
        );
      case "Settings":
        return (
          <TeamSumupSettings
            currentView={currentView}
            setCurrentView={setCurrentView}
            position={isFixed}
          />
        );
      case "Advanced":
        return (
          <TeamsumupAdvanced
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
        <span>Team Sum up</span>
      </DashboardHeader>
      <div className={Styles.container} ref={headerRef}>
        <h2>Team Sum Up</h2>
        <p>
          Track and follow up on team members tasks through team sum ups.
          Onculture uses conversational slack bot to help employees document
          regular reports on their ongoing, completed and blocked tasks.
          Onculture also helps team leads track overall productivity and time
          aloted to team OKRs.
        </p>
      </div>

      <div style={{ minHeight: "calc(100vh - 275px)" }}>{renderView()}</div>
    </>
  );
};

export default TeamSumUp;
