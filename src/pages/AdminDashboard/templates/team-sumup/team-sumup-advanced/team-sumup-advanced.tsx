import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { TEMPLATE_VIEW } from "../../../enum";
import useSumupSettings from "../hooks/useSumupSettings";
import SuccessModal from "../../../components/SuccessModal";
import DeactivateModal from "../../../components/deactivate-modal";
import { RootState, useAppSelector } from "../../../../../redux/store";
import Styles from "../../../../../styles/Dashboard/Templates/team-sumup.module.css";
import TopStyles from "../../../../../styles/Dashboard/Templates/template.module.css";

type TeamupProps = {
  currentView: string;
  setCurrentView: (val: string) => void;
  position?: boolean;
};

const TeamsumupAdvanced = ({
  currentView,
  setCurrentView,
  position,
}: TeamupProps) => {
  const [isDeactivateModalOpen, setIsDeactivateModalOpen] =
    React.useState<boolean>(false);
  const [isPauseModalOpen, setIsPauseModalOpen] =
    React.useState<boolean>(false);

  const { data, refetch } = useSumupSettings();

  console.log("DARARA", data);

  const { userToken, profileInfo } = useAppSelector(
    (state: RootState) => state.user
  );
  const { company } = profileInfo;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userToken}`,
    },
  };

  const handleDeactivate = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_PROXY}/template/deactivate`,
        {
          templateType: "team_sum_up",
          companyId: company[0].id,
        },
        config
      );

      if (data.success) {
        toast(data.message);
        refetch();
      }

      console.log("DATA", data);
    } catch (err) {
      console.log(err);
    }
  };

  const handlePause = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_PROXY}/template/pause`,
        {
          templateType: "team_sum_up",
          companyId: company[0].id,
        },
        config
      );

      console.log("DATA", data);
      if (data.success) {
        setIsPauseModalOpen(true);
        refetch();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className={Styles.advanced}>
        <div
          className={`${TopStyles.header} ${
            position === false ? `${TopStyles.topHeaderFixed}` : ""
          }`}
        >
          <div className={TopStyles.tabs}>
            {Object.values(TEMPLATE_VIEW).map((nav, i) => {
              return (
                <div
                  key={i}
                  className={`${
                    currentView === nav.value && TopStyles.activeLink
                  }  ${TopStyles.tabLink}`}
                  onClick={() => setCurrentView(nav.value)}
                >
                  {nav.label}
                </div>
              );
            })}
          </div>
        </div>
        <div className={Styles.advanced_container}>
          <div className={Styles.advanced_container_left}>
            <h3>Pause this Template</h3>
            <p>
              Pausing this template means OnCulture will stop sending messages
              to your team members.
            </p>
            <p>All data and settings will be retained.</p>
            <button
              className={`${
                company[0]?.isSlackEnabled ? Styles.resume : Styles.disabled
              }`}
              onClick={handlePause}
              disabled={!company[0]?.isSlackEnabled}
            >
              {data?.payload?.settings?.pause ? "Resume" : "Pause"}
            </button>
          </div>

          <div className={Styles.advanced_container_right}>
            <h3>Deactivate this Template</h3>
            <p>
              Deactivating this template means OnCulture will stop sending
              messages to your team members.
            </p>
            <p>All data and settings will be erased.</p>
            <button
              className={`${
                company[0]?.isSlackEnabled && data?.payload?.settings?.status
                  ? Styles.deactivate
                  : Styles.disabled
              }`}
              onClick={() => setIsDeactivateModalOpen(true)}
              disabled={
                !company[0]?.isSlackEnabled || !data?.payload?.settings?.status
              }
            >
              Deactivate
            </button>
          </div>
        </div>{" "}
      </div>

      {isDeactivateModalOpen && (
        <DeactivateModal
          isOpen={isDeactivateModalOpen}
          closeModal={() => setIsDeactivateModalOpen(false)}
          header="You are about to Deactivate "
          message="Are you sure you want to deactivate this template. This will erase all information on your dashboard."
          actionText="Yes, Deactivate"
          cancelText="Cancel, Keep it"
          handleAction={handleDeactivate}
          handleCancel={() => setIsDeactivateModalOpen(false)}
        />
      )}

      {isPauseModalOpen && (
        <SuccessModal
          isOpen={isPauseModalOpen}
          closeModal={() => setIsPauseModalOpen(false)}
          header="Template Paused"
          bgActive={false}
        />
      )}
    </>
  );
};

export default TeamsumupAdvanced;
