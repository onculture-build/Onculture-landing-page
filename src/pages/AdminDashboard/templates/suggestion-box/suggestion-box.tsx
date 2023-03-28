import React from "react";
import { Link } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import DashboardHeader from "../../components/DashboardHeader";

const ComplaintsSuggestion = () => {
  return (
    <>
      <DashboardHeader>
        <Link to="/dashboard/templates">
          <span>Templates</span>
        </Link>
        <MdKeyboardArrowRight fontSize={20} />
        <span>Complaint and Suggestion Box</span>
      </DashboardHeader>
    </>
  );
};

export default ComplaintsSuggestion;
