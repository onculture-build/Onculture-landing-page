import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CgPen } from "react-icons/cg";
import { Link } from "react-router-dom";
import avatar from "../../../../../Assets/Images/companyAvatar.svg";
import EmptyState from "../../../components/EmptyState";
import emptstateBio from "../../../../../Assets/Images/bio.svg";
import { RootState, useAppSelector } from "../../../../../redux/store";
import Styles from "../../../../../styles/Dashboard/Dashboard.module.css";
import { calNoOfSlotTotal } from "../../../../../utils/helper";

export type BioProp = {
  mission?: string | undefined;
  vision?: string | undefined;
  values?: string | undefined;
};

const Bio = () => {
  const navigate = useNavigate();

  const [hasBio, setHasBio] = useState<boolean>(false);

  const { profileInfo, userToken } = useAppSelector(
    (state: RootState) => state.user
  );

  console.log(profileInfo);

  const { mission, vision, values, aboutCompany } = profileInfo?.company[0];

  const renderView = () => {
    if (!mission && !vision && !values.length) {
      return (
        <div className={Styles.centerEmptyState}>
          <EmptyState
            imag={emptstateBio}
            text="Looks like you have not completed your bio yet"
            linkTag="/dashboard/account/editProfile"
            btnText="Update your bio"
            onClick={() => navigate("/dashboard/account/editProfile")}
          />
        </div>
      );
    }

    return (
      <div className={Styles.bioMain}>
        <div>
          <h4>About Your Company </h4>
          <p>{aboutCompany ? aboutCompany : ""}</p>
        </div>
        <div>
          <h4>Mission </h4>
          <p>{mission ? mission : ""}</p>
        </div>
        <div>
          <h4>Vision</h4>
          <p>{vision ? vision : ""}</p>
        </div>
        <div className={Styles.bioValues}>
          <h4>Value</h4>
          {values.map((value: string, i: number) => {
            return <p key={i}>{value ? value : ""}</p>;
          })}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className={Styles.profileBoard}>
        <div className={Styles.leftBoard}>
          <div className={Styles.ppBoard}>
            {profileInfo.user.profilePicture ? (
              <img
                src={profileInfo.user.profilePicture}
                alt="profile icon"
                className={Styles.rmPP}
              />
            ) : (
              <img src={avatar} alt="profile icon" className={Styles.rmPP} />
            )}
          </div>
          <div className={Styles.profileInfo}>
            <div className={Styles.profileInfoHead}>
              <h2>
                {profileInfo.company[0].companyName
                  ? profileInfo.company[0].companyName
                  : " "}
              </h2>
              <p>Lagos, Nigeria</p>
            </div>
            <div className={Styles.otherInfo}>
              <div>
                <p>Admin:</p>
                <p>Email:</p>
                <p>Phone:</p>
                <p>Role:</p>
              </div>
              <div className={Styles.valInfo}>
                <p>
                  {profileInfo.user.firstName ? profileInfo.user.firstName : ""}
                </p>
                <p>{profileInfo.user.email ? profileInfo.user.email : ""}</p>
                <p>
                  {profileInfo.user.phoneNumber
                    ? profileInfo.user.phoneNumber
                    : ""}
                </p>
                <p>{profileInfo.user.role ? profileInfo.user.role : "Admin"}</p>
              </div>
            </div>
          </div>
        </div>
        {/* break here */}
        <div className={Styles.rightBoard}>
          <div>
            <Link to="/dashboard/account/editProfile">
              <button className={Styles.editInfo}>
                <CgPen />
                <span>Edit</span>
              </button>
            </Link>
          </div>
          <div className={Styles.subscriptions}>
            <h4>Subscription</h4>
            <div className={Styles.slot}>
              <div className={Styles.slotSub}>
                <h5>Courses</h5>
                <p>{profileInfo.company[0].courses.length}</p>
              </div>

              <div className={Styles.slotSub}>
                <h5>Total Slot Purchased</h5>
                <p>{calNoOfSlotTotal(profileInfo.company[0].courses)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {renderView()}
    </>
  );
};

export default Bio;
