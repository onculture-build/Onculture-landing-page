import React from "react";
import { Link } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import DashboardHeader from "../../components/DashboardHeader";
import Styles from "../../../../styles/Dashboard/Templates/template.module.css";
import { TEMPLATE_VIEW } from "../../enum";
import FireSideSettings from "./fireside-chats-settings/fireside-chats-settings";
import FireSideSummary from "./fireside-chats-summary/fireside-chats-summary";

const FiresideChats = () => {
  const [currentView, setCurrentView] = React.useState(
    TEMPLATE_VIEW.SUMMARY.value
  );

  const renderView = () => {
    switch (currentView) {
      case "Summary":
        return (
          <FireSideSummary
            currentView={currentView}
            setCurrentView={setCurrentView}
          />
        );
      case "Settings":
        return (
          <FireSideSettings
            currentView={currentView}
            setCurrentView={setCurrentView}
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
        <span>Fireside Chats/Spark</span>
      </DashboardHeader>
      <div className={Styles.container}>
        <h2>Fireside Chats/Spark</h2>
        <p>
          <span> What have you been wanting to learn more of?</span>
          <span>
            One year from now, ideally, what kinds of skills do you want to
            become better at,{" "}
          </span>
          <span>or projects do you hope you will have taken on?</span>
        </p>
      </div>

      {renderView()}
    </>
  );
};

export default FiresideChats;
