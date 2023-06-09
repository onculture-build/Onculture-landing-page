import { unwrapResult } from "@reduxjs/toolkit";
import axios from "axios";
import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { useNavigate } from "react-router-dom";
import {
  getUserDetails,
  //  userLogin
} from "../redux/actions/usersAction";
import { useAppDispatch } from "../redux/store";
import { updateToken, updateUserEmail } from "../redux/users";

// const dispatch = useAppDispatch()
function useGoogleAuthentication() {
  const navigate = useNavigate();
  const handleSuccess = async (response: any) => {
    if (response.error !== undefined) {
    }
    let result: any;

    result = await axios.post(
      `${process.env.REACT_APP_API_PROXY}/google-authentication`,
      {
        token: response.tokenId,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    localStorage.setItem("userToken", result.data.token);

    // dispatch(updateUserEmail(result.data.email))
  };

  return {
    handleSuccess,
  };
}

export default useGoogleAuthentication;
