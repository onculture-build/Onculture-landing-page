import {
  AuthType,
  CompanySignupType,
  UserSignUpType,
} from '../../../lib/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: AuthType = {
  userInfo: {
    firstName: '',
    lastName: '',
    email: '',
  },
  companyInfo: {
    name: '',
    code: '',
    email: '',
    values: [{ value: '' }],
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    saveUserInfo: (state, { payload }: PayloadAction<UserSignUpType>) => {
      state.userInfo = payload;
    },
    saveCompanyInfo: (state, { payload }: PayloadAction<CompanySignupType>) => {
      state.companyInfo = payload;
    },
    clearEntries: (state) => {
      state.userInfo = initialState.userInfo;
      state.companyInfo = initialState.companyInfo;
    },
  },
});

export const { saveCompanyInfo, saveUserInfo, clearEntries } =
  authSlice.actions;

export default authSlice;
