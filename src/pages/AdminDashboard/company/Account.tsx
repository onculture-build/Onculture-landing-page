import React from "react";
import {
  Outlet,
  //  useNavigate
} from "react-router-dom";
import { getUserDetails } from "../../../redux/actions/usersAction";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../../redux/store";
import dashBoardStyle from "../../../styles/Dashboard/Dashboard.module.css";

const Account = () => {
  const { profileInfo } = useAppSelector((state: RootState) => state.user);

  // const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   if (userToken === undefined) {
  //     navigate("/");
  //   }
  //   if (profileInfo === null) {
  //     dispatch(getUserDetails());
  //   }
  //   if (profileInfo === null) {
  //     navigate("/login");
  //   }
  //   if (profileInfo.company === null) {
  //     navigate("/company-onboarding");
  //   }

  //   if (!profileInfo && userToken) {
  //     dispatch(getUserDetails());
  //   }
  // }, [profileInfo, userToken]);

  React.useEffect(() => {
    dispatch(getUserDetails());
  }, []);

  return (
    <div className={dashBoardStyle.mainBoard}>
      <div className={dashBoardStyle.mainBoardContainer}>
        <Outlet />
      </div>
    </div>
  );
};

export default Account;
