import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AdminSignup, CompanyFInal } from "../types/interfaces";

const initialState: CompanyFInal = {
  id: "",
  firstName: "",
  surnName: "",
  email: "",
  phoneNumber: "",
  companyName: "",
  employeeCount: "1-20",
  mission: "",
  vision: "",
  values: [],
  aboutCompany: "",
};

export const companyonboardSlice = createSlice({
  name: "companyonboard",
  initialState,
  reducers: {
    handleAdminStep: (state, action: PayloadAction<AdminSignup>) => {
      state.firstName = action.payload.firstName;
      state.email = action.payload.email;
      state.surnName = action.payload.surnName;
      state.phoneNumber = action.payload.phoneNumber;
    },

    handleEmailUpdate: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },

    // updateCompanyInfo: (state, action: PayloadAction<any>) => {
    //     state.info = action.payload.company[0]
    // }
  },
  extraReducers: {},
});

// Action creators are generated for each case reducer function
export const {
  handleAdminStep,
  handleEmailUpdate,

  // updateCompanyInfo
} = companyonboardSlice.actions;

export default companyonboardSlice.reducer;
