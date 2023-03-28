import React from "react";
import { TEMPLATE_VIEW } from "../../../enum";
import { RiMessage2Line, RiChatCheckLine } from "react-icons/ri";
import { PeerProps } from "../../../enum";
import TopStyles from "../../../../../styles/Dashboard/Templates/template.module.css";
import Styles from "../../../../../styles/Dashboard/Templates/fireside.module.css";

const FireSideSummary = ({ currentView, setCurrentView }: PeerProps) => {
  return (
    <div className={Styles.summary}>
      <div className={TopStyles.header}>
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

      <div className={Styles.summaryInfo}>
        <div className={Styles.summaryInfoCard}>
          <div className={Styles.cardIcon}>
            <RiMessage2Line />
          </div>
          <div>
            <h4>15</h4>
            <p>No of Sparks</p>
          </div>
        </div>
        <div className={Styles.summaryInfoCard}>
          <div className={Styles.cardIcon}>
            <RiChatCheckLine />
          </div>
          <div>
            <h4>10</h4>
            <p>Average response per spark</p>
          </div>
        </div>
      </div>

      <div className={Styles.fireSideContainer}>
        <div className={Styles.summaryIntro}>
          <h2>Check out your Spark activities below</h2>
        </div>

        <div className={Styles.firesideList}>
          <div className={Styles.engagingSparks}>
            <div className={Styles.top}>
              <span>Most Engaging Spark</span>
              <span>No of Eng</span>
            </div>
            <div className={Styles.bottom}>
              {[1, 2, 3, 4, 5, 6, 7].map((item, i) => {
                return (
                  <div className={Styles.spark}>
                    <div>
                      <p>What Series are you bingeing on?</p>
                      <span>Tue, 13/03/21 10:00 AM</span>
                    </div>
                    <div className={Styles.number}>20</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className={Styles.engagingEmployees}>
            <div className={Styles.top}>Most Engaging Employee</div>
            <div className={Styles.bottom}>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item, i) => {
                return (
                  <div className={Styles.employee}>
                    <p>Aldulraham Immanuel</p>
                    <span>Product manager</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FireSideSummary;
