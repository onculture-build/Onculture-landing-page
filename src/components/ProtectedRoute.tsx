import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  // const { userToken } = useAppSelector((state) => state.user);
  const userToken = localStorage.getItem("userToken")
    ? localStorage.getItem("userToken")
    : null;
  const userDetails = localStorage.getItem("userDetails")
    ? localStorage.getItem("userDetails")
    : null;
  let userRole;
  // let companyRegistered;
  if (userDetails) {
    userRole = JSON.parse(userDetails).user.isAdmin;
    // companyRegistered = JSON.parse(userDetails).user.regCompany
  }

  if (
    userToken === null ||
    userToken === "undefined" ||
    JSON.stringify(userDetails) === null ||
    !userDetails
  ) {
    localStorage.clear();
  }
  console.log(userToken, userRole, "USER TOKEN");

  // show unauthorized screen if no user is found in redux store
  if (!userToken) {
    return <Navigate to="/login" replace />;
  }

  // returns child route elements
  return <Outlet />;
};
export default ProtectedRoute;
