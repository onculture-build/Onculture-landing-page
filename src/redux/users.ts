// features/user/userSlice.js
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { stat } from "fs";
// import { platform } from "os";
import { SingUp, UserState } from "../types/interfaces";
// import { companyUpdate } from "./actions/companyAction";
import {
  createPassword,
  getNameByVeify,
  getUserDetails,
  googleLogin,
  updateCompany,
} from "./actions/usersAction";

const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;
const profileInfo = localStorage.getItem("userDetails")
  ? JSON.parse(localStorage.getItem("userDetails") as string)
  : null;

console.log(userToken, "insode user,ts");

const initialState: UserState = {
  loading: false,
  userInfo: {
    email: "",
    password: "",
  },
  userToken,
  error: null,
  success: false,
  profileInfo,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    handleInputSignup: (
      state,
      action: PayloadAction<{ key: SingUp; value: string }>
    ) => {
      let key = action.payload.key;
      state.userInfo[key] = action.payload.value;
    },
    updateToken: (state, action: PayloadAction<any>) => {
      state.userToken = action.payload;
    },
    updateUserEmail: (state, action: PayloadAction<any>) => {
      state.userInfo.email = action.payload;
    },
    updateProfileInfo: (state, action: PayloadAction<any>) => {
      state.profileInfo = action.payload;
      // state.userToken = action.payload.token;
      // state.userInfo.email = action.payload.email;
    },
    updateUserToken: (state, action: PayloadAction<any>) => {
      state.userToken = action.payload;
    },
  },
  extraReducers: {
    [getUserDetails.pending.toString()]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getUserDetails.fulfilled.toString()]: (state, { payload }) => {
      console.log(payload, "getuserDetails");
      state.loading = false;
      state.success = true;
      // state.userInfo.email = payload.user.email
      state.profileInfo = payload;
    },
    [getUserDetails.rejected.toString()]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
    }, //
    [googleLogin.pending.toString()]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [googleLogin.fulfilled.toString()]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.userToken = payload.token;
      state.profileInfo = {
        user: payload.user._doc,
        company: payload.company._doc,
      };
    },
    [googleLogin.rejected.toString()]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
    },
    [getNameByVeify.pending.toString()]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getNameByVeify.fulfilled.toString()]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.userToken = payload.token;
      state.profileInfo = payload;
    },
    [getNameByVeify.rejected.toString()]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
    },
    [createPassword.pending.toString()]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [createPassword.fulfilled.toString()]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.userToken = payload.token;
      state.profileInfo = payload;
    },
    [createPassword.rejected.toString()]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
    },
    [updateCompany.pending.toString()]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [updateCompany.fulfilled.toString()]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.profileInfo = payload.payload;
    },
    [updateCompany.rejected.toString()]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
    },
  },
});

export const {
  handleInputSignup,
  updateToken,
  updateUserEmail,
  updateProfileInfo,
  updateUserToken,
} = userSlice.actions;

export default userSlice.reducer;
