import React from "react";
import axios from "axios";
import moment from "moment";
import { useQuery } from "react-query";
import { TEMPLATE_VIEW } from "../../../enum";
import { BiTime } from "react-icons/bi";
import { RiGroup2Line, RiChatCheckLine } from "react-icons/ri";
import { AiOutlineCalendar } from "react-icons/ai";
import { MdOutlineWarningAmber, MdOutlineEmojiEmotions } from "react-icons/md";
import TopStyles from "../../../../../styles/Dashboard/Templates/template.module.css";
import Styles from "../../../../../styles/Dashboard/Templates/peer.module.css";
import FilterForm from "../../../components/filter-form/filter-form";
import { RootState, useAppSelector } from "../../../../../redux/store";
import excellent from "../../../../../Assets/icons/StarStruck.svg";
import goodEmoji from "../../../../../Assets/icons/BeamingFace.svg";
import smiley from "../../../../../Assets/icons/SmilingFace.svg";
import BadEmoji from "../../../../../Assets/icons/SleepyFace.svg";
import TerribleEmoji from "../../../../../Assets/icons/PoutingFaceActive.svg";
import goodEmojiInactive from "../../../../../Assets/icons/BeamingFaceDull.svg";
import { MOODCHECKERS } from "../../../data";
import LoadingState from "../../../components/loadingState";
import EmptyState from "../../../components/EmptyState";
import Peer1 from "../../../../../Assets/Images/Peer-empty-state.svg";
import { formatDayNDate } from "../../../helpers";
import SearchField from "../../../components/searchField";
import { formatFilterDate } from "../../../helpers";

interface PeerProps {
  currentView: string;
  setCurrentView: (val: string) => void;
  position: boolean;
}

const PeerSummary = ({ currentView, setCurrentView, position }: PeerProps) => {
  // const [page, setCurrentPage] = React.useState(1);
  const [dateInterval, setDateInterval] = React.useState({
    startDate: formatFilterDate(new Date("Jul 12 2011")),
    endDate: formatFilterDate(moment().endOf("week").toString()),
  });

  // const handleFilterOption = (e: any) => {
  //   console.log(e);
  // };

  const { userToken } = useAppSelector((state: RootState) => state.user);

  const fetchSummary = async (startDate: string, endDate: string) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Cache-control": "no-cache",
        mode: "cors",
        Authorization: `Bearer ${userToken}`,
      },
    };

    const response = await axios.get(
      `${process.env.REACT_APP_API_PROXY}/template/getSummary?templateType=peer_1:1&startDate=${startDate}&endDate=${endDate}`,
      config
    );
    // console.log("you never leave2");

    console.log(response);
    if (response.status === 200) {
      return response.data;
    }
  };

  const {
    data,
    //  error, isError,
    // isLoading,
    isSuccess,
    isFetching,
  } = useQuery(
    ["peer-summary", dateInterval.startDate, dateInterval.endDate],
    () => fetchSummary(dateInterval.startDate, dateInterval.endDate),
    {
      keepPreviousData: true,
      retryOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );

  const renderSummary = () => {
    if (isSuccess) {
      if (data.payload.settings === null) {
        return (
          <div className={Styles.summaryInfoEmptyState}>
            <div className={Styles.emptyStateCard}>
              <div className={Styles.cardIcon}>
                <MdOutlineWarningAmber />
              </div>
              <div>
                <p>Not Activated</p>
              </div>
            </div>
          </div>
        );
      }

      if (data.payload.summary <= 0) {
        return (
          <div className={Styles.summaryInfo}>
            <div className={Styles.summaryInfoCard}>
              <div className={Styles.cardIcon}>
                <RiGroup2Line />
              </div>
              <div>
                <h4>0</h4>
                <p>No of Peers</p>
              </div>
            </div>
            <div className={Styles.summaryInfoCard}>
              <div className={Styles.cardIcon}>
                <RiChatCheckLine />
              </div>
              <div>
                <h4>0</h4>
                <p>No of Engaged Peers</p>
              </div>
            </div>
            <div className={Styles.summaryInfoCard}>
              <div className={Styles.cardIcon}>
                <MdOutlineEmojiEmotions />
              </div>
              <div>
                <img src={goodEmojiInactive} alt="emoji" />
                <p>Average Review </p>
              </div>
            </div>
          </div>
        );
      }

      return (
        <div className={Styles.summaryInfo}>
          <div className={Styles.summaryInfoCard}>
            <div className={Styles.cardIcon}>
              <RiGroup2Line />
            </div>
            <div>
              <h4>{data.payload.noOfPeers}</h4>
              <p>No of Peers</p>
            </div>
          </div>
          <div className={Styles.summaryInfoCard}>
            <div className={Styles.cardIcon}>
              <RiChatCheckLine />
            </div>
            <div>
              <h4>{data.payload.noOfEngagedPeers}</h4>
              <p>No of Engaged Peers</p>
            </div>
          </div>
          <div className={Styles.summaryInfoCard}>
            <div className={Styles.cardIcon}>
              <MdOutlineEmojiEmotions />
            </div>
            <div>
              <img
                src={goodEmoji}
                alt="emoji"
                className={Styles.cardIconEmoji}
              />
              <p>Average Mood </p>
            </div>
          </div>
        </div>
      );
    }
  };

  const renderPeerings = () => {
    if (isFetching)
      return (
        <div
          style={{
            width: "100%",
            height: "20vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LoadingState />
        </div>
      );

    if (isSuccess) {
      if (data.payload.summary.length <= 0) {
        if (data.payload.settings === null) {
          return (
            <>
              {/* NOT ACTIVATED */}
              <EmptyState
                imag={Peer1}
                text="Activate the Team Sum up template and track and follow up on team members."
                btnText="Activate"
                onClick={() => setCurrentView(TEMPLATE_VIEW.SETTINGS.value)}
              />
            </>
          );
        } else {
          return (
            <>
              {/* ACTIVATED */}
              <EmptyState
                imag={Peer1}
                text="You will see employees sum up here once they start responding"
              />
            </>
          );
        }
      }

      return (
        <>
          <div className={Styles.peeringList}>
            {data.payload.summary.map((peer: any, i: number) => {
              return (
                <div key={i} className={Styles.peeringCard}>
                  <div className={Styles.top}>
                    <p className={Styles.names}>Names</p>
                    <div className={Styles.first}>
                      <p>
                        {peer.participants[0].firstName}
                        {peer?.participants[0]?.surnName &&
                          peer?.participants[0]?.surnName}
                      </p>
                      <span>{peer.participants[0].role}</span>
                    </div>
                    <div className={Styles.second}>
                      <p>
                        {peer.participants[1].firstName}
                        {peer?.participants[1]?.surnName &&
                          peer?.participants[1]?.surnName}
                      </p>
                      <span>{peer.participants[1].role}</span>
                    </div>
                  </div>

                  <div className={Styles.bottom}>
                    <div className={Styles.schedule}>
                      <div>
                        <BiTime fontSize={22} />
                        <span>{peer.scheduleTime}</span>
                      </div>
                      <div>
                        <AiOutlineCalendar fontSize={22} />
                        <span>{formatDayNDate(peer?.scheduleDate)}</span>
                      </div>
                    </div>

                    <span
                      className={
                        peer?.status === "pending"
                          ? Styles.pending
                          : Styles.completed
                      }
                    >
                      {peer.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      );
    }
  };

  return (
    <div className={Styles.summary}>
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

        <FilterForm handleFilterOption={setDateInterval} />
      </div>

      {renderSummary()}

      <div className={Styles.peeringContainer}>
        <div className={Styles.summaryIntro}>
          <h2>Check out your Peering list below</h2>
          <SearchField />
        </div>

        {/* <div className={Styles.peeringList}>
          {[1, 2, 3, 4, 5, 6, 7].map((item, i) => {
            return (
              <div key={i} className={Styles.peeringCard}>
                <div className={Styles.top}>
                  <p className={Styles.names}>Names</p>
                  <div className={Styles.first}>
                    <p>Aldulraham Immanuel</p>
                    <span>Product manager</span>
                  </div>
                  <div className={Styles.second}>
                    <p>Victoria Mustapha</p>
                    <span>Engineer</span>
                  </div>
                </div>

                <div className={Styles.bottom}>
                  <div className={Styles.schedule}>
                    <div>
                      <BiTime fontSize={22} /> <span>4:00PM</span>
                    </div>
                    <div>
                      <AiOutlineCalendar fontSize={22} />
                      <span>Tue, 16/11/22</span>
                    </div>
                  </div>

                  <span className={Styles.completed}>Completed</span>
                 
                </div>
              </div>
            );
          })}
        </div> */}

        {renderPeerings()}
      </div>
    </div>
  );
};

export default PeerSummary;
