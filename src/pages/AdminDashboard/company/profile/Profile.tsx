import React from "react";
import boardStyle from "../../../../styles/Dashboard/Dashboard.module.css";
import Bio from "./bio/Bio";
import Payments from "./subscription/Payments";
import BoardEmployee from "./employees/BoardEmployee";
import Integrations from "./integrations/integrations";
import DashboardHeader from "../../components/DashboardHeader";
import { PROFILE_TYPE } from "../../enum";

const Profile = () => {
  const [currentTab, setCurrentTab] = React.useState(PROFILE_TYPE.BIO.value);

  const renderView = () => {
    switch (currentTab) {
      case "Bio":
        return <Bio />;
      case "Employees":
        return <BoardEmployee />;
      case "Subscription":
        return <Payments />;
      case "Integrations":
        return <Integrations />;

      default:
        break;
    }
  };

  return (
    <>
      <DashboardHeader>Account</DashboardHeader>
      <div className={boardStyle.accountLinks}>
        {Object.values(PROFILE_TYPE).map((nav, i) => {
          return (
            <div
              key={i}
              className={`${
                currentTab === nav.value && boardStyle.accountLinkActive
              }  ${boardStyle.accountLink}`}
              onClick={() => setCurrentTab(nav.value)}
            >
              {nav.label}
            </div>
          );
        })}
      </div>

      <div className={boardStyle.mdashboard}>{renderView()}</div>
    </>
  );
};

export default Profile;
