import React from "react";
import { MdChevronRight, MdChevronLeft } from "react-icons/md";
import CustomModal from "../../../../../../components/custom-modal";
import Styles from "../../../../../../styles/Dashboard/Templates/sumup-popup.module.css";
import { MOODCHECKERS } from "../../../../data";
import { getInitials } from "../../../../helpers";
import smiley from "../../../../../../Assets/icons/SmilingFace.svg";
import BadEmoji from "../../../../../../Assets/icons/SleepyFace.svg";
import excellent from "../../../../../../Assets/icons/StarStruck.svg";
import goodEmoji from "../../../../../../Assets/icons/BeamingFace.svg";
import TerribleEmoji from "../../../../../../Assets/icons/PoutingFaceActive.svg";

interface sumProps {
  isOpen: boolean;
  closeModal: any;
  data: any;
  active: number;
}

const SumupPopOp = ({ closeModal, isOpen, data, active }: sumProps) => {
  console.log(data);

  const {
    payload: { summary },
  } = data;
  // const ref = React.useRef<HTMLDivElement>(null);

  console.log(summary);

  const [state, setState] = React.useState({
    activeSlide: active,
    translate: 0,
    transition: 0.5,
  });

  const { translate, transition, activeSlide } = state;

  const nextSlide = () => {
    setState({
      ...state,
      // translate: -(translate + 800),
      translate: translate === 0 ? -800 : translate - 800,
      // activeSlide:
      //   activeSlide === sumUpResponses.length - 1
      //     ? sumUpResponses.length - 1
      //     : activeSlide + 1,
      activeSlide:
        activeSlide === summary.length ? activeSlide : activeSlide + 1,
    });
  };

  const prevSlide = () => {
    setState({
      ...state,
      translate: activeSlide > 1 ? translate + 800 : 0,
      activeSlide: activeSlide === 0 ? 0 : activeSlide - 1,
    });
  };

  console.log(summary[activeSlide]);

  // console.log(employee, "employee");
  // console.log(responses, "responses");

  const imgIcon =
    summary[activeSlide].sumUpResponses[4].answers === MOODCHECKERS.BAD.id
      ? BadEmoji
      : summary[activeSlide].sumUpResponses[4].answers ===
        MOODCHECKERS.TERRIBLE.id
      ? TerribleEmoji
      : summary[activeSlide].sumUpResponses[4].answers === MOODCHECKERS.OKAY.id
      ? smiley
      : summary[activeSlide].sumUpResponses[4].answers === MOODCHECKERS.GOOD.id
      ? goodEmoji
      : summary[activeSlide].sumUpResponses[4].answers ===
        MOODCHECKERS.EXCELLENT.id
      ? excellent
      : "";

  return (
    <CustomModal isOpen={isOpen} closeModal={closeModal} width="800px">
      <div
        // ref={ref}
        className={Styles.popup}
      >
        {activeSlide > 0 && (
          <div className={Styles.leftArrow} onClick={prevSlide}>
            <MdChevronLeft color="#5C00DD" fontSize={20} />
          </div>
        )}

        {summary.length > 1 && activeSlide < summary.length - 1 && (
          <div className={Styles.rightArrow} onClick={nextSlide}>
            <MdChevronRight color="#5C00DD" fontSize={20} />
          </div>
        )}

        <div
          className={Styles.popupBody}
          // style={{
          //   width: `${800 * summary.length}px`,
          //   transform: `translate(${translate}px, 0)`,
          //   transition: `transform ease-out ${transition}s`,
          // }}
        >
          {/* {summary.map((sum:any, i:number)=> {
            return (

            )
          })} */}
          <div className={Styles.topNameContainer}>
            <div>
              <div>{getInitials(summary[activeSlide].employee.firstName)}</div>
              <div>
                <p>{summary[activeSlide].employee.firstName}</p>
                <span>{summary[activeSlide].employee.role}</span>
              </div>
            </div>
            <div className={Styles.topMoodChecker}>
              <img src={imgIcon} alt="wmoji" />
              <span>Moodcheckers</span>
            </div>
          </div>

          <div className={Styles.slideContainer}>
            <div className={Styles.popupBodyTop}>
              <div className={Styles.popupPast}>
                <span>Past:</span>
                <p>{summary[activeSlide].sumUpResponses[0].question}</p>
                <ul>
                  {summary[activeSlide].sumUpResponses[0].answers.map(
                    (answer: string, i: number) => (
                      <li key={i}>{answer}</li>
                    )
                  )}
                </ul>
              </div>
              <div className={Styles.popupPast}>
                <span>Plan:</span>
                <p>{summary[activeSlide].sumUpResponses[1].question}</p>
                <ul>
                  {summary[activeSlide].sumUpResponses[1].answers.map(
                    (answer: string, i: number) => (
                      <li key={i}>{answer}</li>
                    )
                  )}
                </ul>
              </div>
            </div>

            <div className={Styles.popupBodyTop}>
              <div className={Styles.popupPast}>
                <span>Blockers:</span>
                <p>{summary[activeSlide].sumUpResponses[2].question}</p>
                <ul>
                  {summary[activeSlide].sumUpResponses[2].answers.map(
                    (answer: string, i: number) => (
                      <li key={i}>{answer}</li>
                    )
                  )}
                </ul>
              </div>
              <div className={Styles.popupPast}>
                <span>Support:</span>
                <p>{summary[activeSlide].sumUpResponses[3].question}</p>
                <ul>
                  {summary[activeSlide].sumUpResponses[3].answers.map(
                    (answer: string, i: number) => (
                      <li key={i}>{answer}</li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* {summary[activeSlide].map(
            (summary: any, i: number) => {
              return (
                <div className={Styles.slideContainer} key={i}>
                  <div className={Styles.popupBodyTop}>
                    <div className={Styles.popupPast}>
                      <span>Past:</span>
                      <p>{summary[0].question}</p>
                      <ul>
                        {summary[0].answers.map((answer: string, i: number) => (
                          <li key={i}>{answer}</li>
                        ))}
                      </ul>
                    </div>
                    <div className={Styles.popupPast}>
                      <span>Plan:</span>
                      <p>{summary[1].question}</p>
                      <ul>
                        {summary[1].answers.map((answer: string, i: number) => (
                          <li key={i}>{answer}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className={Styles.popupBodyTop}>
                    <div className={Styles.popupPast}>
                      <span>Blockers:</span>
                      <p>{summary[2].question}</p>
                      <ul>
                        {summary[2].answers.map((answer: string, i: number) => (
                          <li key={i}>{answer}</li>
                        ))}
                      </ul>
                    </div>
                    <div className={Styles.popupPast}>
                      <span>Support:</span>
                      <p>{summary[3].question}</p>
                      <ul>
                        {summary[3].answers.map((answer: string, i: number) => (
                          <li key={i}>{answer}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            }
          )} */}
        </div>
      </div>
    </CustomModal>
  );
};

export default SumupPopOp;
