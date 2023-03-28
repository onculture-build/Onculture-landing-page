import React from "react";
import axios from "axios";
import Styles from "../../../../../styles/Dashboard/Dashboard.module.css";
import SlackIcon from "../../../../../Assets/Images/slack-icon.svg";
import TeamsIcon from "../../../../../Assets/Images/teams-icon.svg";
import WhatsappIcon from "../../../../../Assets/Images/whatsapp-icon.svg";
import { RootState, useAppSelector } from "../../../../../redux/store";

const integrationsData = [
  {
    icon: SlackIcon,
    name: "Slack",
    intro:
      "Slack makes all your tools work better by letting you integrate industry-leading software and custom apps right into Slack.",
    cta: "Integrate",
  },
  {
    icon: TeamsIcon,
    name: "Teams",
    intro:
      "Teams integration, you can invite anyone in the organization to view and collaborate on customer records right within a Teams chat ",
    cta: "Coming Soon",
  },
  {
    icon: WhatsappIcon,
    name: "Whatsapp",
    intro:
      "Connect Your Apps Without Writing Code.  Workflow Automation for Large and Small Teams. ",
    cta: "Coming Soon",
  },
];

const Integrations = () => {
  const {
    userToken,
    profileInfo: { company },
  } = useAppSelector((state: RootState) => state.user);

  const integrationsCta: { enabled: boolean; cta: string }[] = [];
  integrationsCta[0] = { enabled: company[0].isSlackEnabled, cta: "Integrate" };
  integrationsCta[1] = { enabled: false, cta: "Integrate" };
  integrationsCta[2] = { enabled: false, cta: "Integrate" };

  const handleIntegration = async (name: string) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Cache-control": "no-cache",
        mode: "cors",
        Authorization: `Bearer ${userToken}`,
      },
    };

    try {
      if (name === "Slack") {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_PROXY}/slack/addToSlack`,
          config
        );

        console.log(data);

        if (data.success) {
          window.open(data.payload.url, "_blank", "noreferrer");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={Styles.integrations_container}>
      <h2>Integrations </h2>

      <div className={Styles.integrations}>
        {integrationsData.map((integration, i) => {
          const btnStyle =
            integration.cta === "Integrate"
              ? Styles.integrateBtn
              : Styles.integrateSoon;

          const integrateStyle = integrationsCta[i].enabled
            ? Styles.integrated
            : btnStyle;

          return (
            <div key={i} className={Styles.integration}>
              <img src={integration.icon} alt="app icon" />
              <h4>{integration.name}</h4>
              {/* <p>{integration.intro}</p> */}
              <p>
                {integrationsCta[i].enabled ? (
                  <span>
                    This integration is
                    <span className={Styles.isActive}> Active</span>
                  </span>
                ) : (
                  integration.intro
                )}
              </p>
              <button
                className={integrateStyle}
                disabled={integrationsCta[i].enabled}
                onClick={() => handleIntegration(integration.name)}
              >
                {integrationsCta[i].enabled
                  ? "Integrated"
                  : `${integration.cta}`}
              </button>
            </div>
          );
        })}

        {/* <div className={Styles.integration}>12</div>
        <div className={Styles.integration}>13</div> */}
      </div>
    </div>
  );
};

export default Integrations;
