import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './slices/auth';

export const rootReducer = combineReducers({
  auth: authSlice.reducer,
});
