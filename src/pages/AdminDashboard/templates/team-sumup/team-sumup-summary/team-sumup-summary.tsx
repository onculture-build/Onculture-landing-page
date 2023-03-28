import React from "react";
import axios from "axios";
import moment from "moment";
import { useQuery } from "react-query";
import { TEMPLATE_VIEW } from "../../../enum";
import { RiChatCheckLine } from "react-icons/ri";
import { MdOutlineWarningAmber, MdOutlineEmojiEmotions } from "react-icons/md";
import Styles from "../../../../../styles/Dashboard/Templates/team-sumup.module.css";
import TopStyles from "../../../../../styles/Dashboard/Templates/template.module.css";
import { MOODCHECKERS } from "../../../data";
import SumupPopOp from "../features/sumup-popup/sumup-popup";
import EmptyState from "../../../components/EmptyState";
import emptstateBio from "../../../../../Assets/Images/bio.svg";
import FilterForm from "../../../components/filter-form/filter-form";
import { RootState, useAppSelector } from "../../../../../redux/store";
import LoadingState from "../../../components/loadingState";
import { formatFilterDate, getInitials } from "../../../helpers";
import excellent from "../../../../../Assets/icons/StarStruck.svg";
import goodEmoji from "../../../../../Assets/icons/BeamingFace.svg";
import smiley from "../../../../../Assets/icons/SmilingFace.svg";
import BadEmoji from "../../../../../Assets/icons/SleepyFace.svg";
import TerribleEmoji from "../../../../../Assets/icons/PoutingFaceActive.svg";
import goodEmojiInactive from "../../../../../Assets/icons/BeamingFaceDull.svg";
import Pagination from "../../../components/pagination";
import SearchField from "../../../components/searchField";

type TeamupProps = {
  currentView: string;
  setCurrentView: (val: string) => void;
  position?: boolean;
};

const TeamSumupSummary = ({
  currentView,
  setCurrentView,
  position,
}: TeamupProps) => {
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [modalData, setModalData] = React.useState({});
  const [active, setActive] = React.useState(0);
  const [dateInterval, setDateInterval] = React.useState({
    startDate: formatFilterDate(new Date("Jul 12 2011")),
    endDate: formatFilterDate(moment().endOf("week").toString()),
  });

  // console.log(dateInterval);
  // console.log(moment().endOf("week").toString());

  const [page, setCurrentPage] = React.useState(1);

  const { userToken } = useAppSelector((state: RootState) => state.user);

  const fetchSummary = async (page = 1, startDate: string, endDate: string) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Cache-control": "no-cache",
        mode: "cors",
        Authorization: `Bearer ${userToken}`,
      },
    };

    console.log(moment("12-25-1995", "MM-DD-YYYY").toString());

    console.log(moment().startOf("week").toString());
    console.log(moment().endOf("week").toString());

    const response = await axios.get(
      `${process.env.REACT_APP_API_PROXY}/template/getSummary?templateType=team_sum_up&startDate=${startDate}&endDate=${endDate}&page=${page}&pageSize=6`,
      config
    );

    console.log(response);
    if (response.status === 200) {
      return response.data;
    }

    // throw response.data.error;
  };

  const {
    data,
    //  error, isError,
    isLoading,
    isSuccess,
    isFetching,
  } = useQuery(
    ["team-sumup-summary", page, dateInterval.startDate, dateInterval.endDate],
    () => fetchSummary(page, dateInterval.startDate, dateInterval.endDate),
    {
      keepPreviousData: true,
      retryOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );

  console.log(data);

  console.log("you never leave3");

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
                <RiChatCheckLine />
              </div>
              <div>
                <h4>0</h4>
                <p>No of Response</p>
              </div>
            </div>
            <div className={Styles.summaryInfoCard}>
              <div className={Styles.cardIcon}>
                <MdOutlineWarningAmber />
              </div>
              <div>
                <h4>0</h4>
                <p>No of Blockers</p>
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

      const { payload } = data;
      const { averageMoodCheck } = payload;

      console.log(averageMoodCheck);

      const imgIcon =
        averageMoodCheck === MOODCHECKERS.BAD.id
          ? BadEmoji
          : averageMoodCheck === MOODCHECKERS.TERRIBLE.id
          ? TerribleEmoji
          : averageMoodCheck === MOODCHECKERS.OKAY.id
          ? smiley
          : averageMoodCheck === MOODCHECKERS.GOOD.id
          ? goodEmoji
          : averageMoodCheck === MOODCHECKERS.EXCELLENT.id
          ? excellent
          : "";

      return (
        <div className={Styles.summaryInfo}>
          <div className={Styles.summaryInfoCard}>
            <div className={Styles.cardIcon}>
              <RiChatCheckLine />
            </div>
            <div>
              <h4>{data.payload.noOfResponse}</h4>
              <p>No of Response</p>
            </div>
          </div>
          <div className={Styles.summaryInfoCard}>
            <div className={Styles.cardIcon}>
              <MdOutlineWarningAmber />
            </div>
            <div>
              <h4>{data.payload.noOfBlockers}</h4>
              <p>No of Blockers</p>
            </div>
          </div>
          <div className={Styles.summaryInfoCard}>
            <div className={Styles.cardIcon}>
              <MdOutlineEmojiEmotions />
            </div>
            <div>
              <img src={imgIcon} alt="emoji" className={Styles.cardIconEmoji} />
              <p>Average Mood </p>
            </div>
          </div>
        </div>
      );
    }
  };

  const renderSumUps = () => {
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
      // const summary = data?.data;

      if (data.payload.summary.length <= 0) {
        if (data.payload.settings === null) {
          return (
            <>
              {/* NOT ACTIVATED */}
              <EmptyState
                imag={emptstateBio}
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
                imag={emptstateBio}
                text="You will see employees sum up here once they start responding"
              />
            </>
          );
        }
      }

      const {
        payload: { currentPage, currentSize, totalPage },
      } = data;

      return (
        <>
          <div className={Styles.sumUps}>
            {data.payload.summary.map((sum: any, i: number) => {
              const { employee, sumUpResponses } = sum;

              const imgIcon =
                sumUpResponses[4].answers === MOODCHECKERS.BAD.id
                  ? BadEmoji
                  : sumUpResponses[4].answers === MOODCHECKERS.TERRIBLE.id
                  ? TerribleEmoji
                  : sumUpResponses[4].answers === MOODCHECKERS.OKAY.id
                  ? smiley
                  : sumUpResponses[4].answers === MOODCHECKERS.GOOD.id
                  ? goodEmoji
                  : sumUpResponses[4].answers === MOODCHECKERS.EXCELLENT.id
                  ? excellent
                  : "";
              return (
                <div
                  key={i}
                  className={Styles.sumUpCard}
                  onClick={() => {
                    setShowModal(true);
                    setModalData(data);
                    setActive(i);
                  }}
                >
                  <div className={Styles.top}>
                    <div>
                      <div className={Styles.avatar}>
                        {getInitials(employee.firstName)}
                      </div>
                      <div>
                        <h4>{employee.firstName}</h4>
                        <p>{employee.role}</p>
                      </div>
                    </div>
                    <div>
                      <img src={imgIcon} alt="emoji" />
                    </div>
                  </div>

                  <div className={Styles.bottom}>
                    <div>
                      <div className={Styles.past}>
                        <span>Past:</span>
                        <li>
                          {sumUpResponses && sumUpResponses[0].answers[0]}
                        </li>
                      </div>
                      <div className={Styles.plan}>
                        <span>Plan:</span>
                        <li>
                          {sumUpResponses && sumUpResponses[1].answers[0]}
                        </li>
                      </div>
                    </div>

                    <span
                      className={Styles.showMore}
                      onClick={() => {
                        setShowModal(true);
                        // console.log(item);
                        setModalData(data);
                        setActive(i);
                      }}
                    >
                      Show more
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <Pagination
            currentPage={currentPage}
            totalCount={totalPage}
            pageSize={currentSize}
            onPageChange={(page: number) => setCurrentPage(page)}
          />
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

      <div className={Styles.sumupContainer}>
        <div className={Styles.summaryIntro}>
          <h2>All employees sum ups</h2>

          <SearchField />
        </div>

        {showModal && (
          <SumupPopOp
            isOpen={showModal}
            closeModal={() => setShowModal(false)}
            data={modalData}
            active={active}
          />
        )}

        {renderSumUps()}
      </div>
    </div>
  );
};

export default TeamSumupSummary;
