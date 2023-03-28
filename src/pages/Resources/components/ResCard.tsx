import React from "react";
import { Link, useNavigate } from "react-router-dom";
import cardStyle from "../../../styles/Resource/ResCard.module.css";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

type resCardProp = {
  classBg: string;
  topLabel?: string;
  mainLabel: string;
  contentId: string;
  routeTo: string;
};

const ResCard = ({
  classBg,
  topLabel,
  mainLabel,
  contentId,
  routeTo,
}: resCardProp) => {
  const navigate = useNavigate();
  return (
    <div className={cardStyle.card}>
      <div
        style={{
          background: `url(${classBg})`,
          backgroundRepeat: "no-repeat",
          height: "234px",
          padding: "0.5rem 1rem",
          fontSize: "10px",
          color: "white",
        }}
      >
        {topLabel && <p className={cardStyle.topP}>{topLabel}</p>}
      </div>
      <div className={cardStyle.cardBottom}>
        <h2>{mainLabel}</h2>
        <Link
          className={cardStyle.lnk}
          to={`/resource/${routeTo}/${contentId}`}
        >
          <p>
            <span>Read</span>

            <HiOutlineArrowNarrowRight />
          </p>
        </Link>
      </div>
    </div>
  );
};

export default ResCard;
