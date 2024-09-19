import { RootState } from '..';

export const authUser = (state: RootState) => state.auth.userInfo;
export const authCompany = (state: RootState) => state.auth.companyInfo;
