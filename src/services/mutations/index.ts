import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import customAxios from '../axios';
import URLS from '../urls';

import { IAddToWaitlist, IBookADemo, IContactUs } from '../../lib/interfaces';
import {
  AuthType,
  ForgotDomainType,
  UserLoginType,
  UserSignUpType,
} from '../../lib/types';

export const useAddToWaitlist = () =>
  useMutation({
    mutationKey: ['addToWaitlist'],
    mutationFn: async (data: IAddToWaitlist) => {
      const res = await axios.post(URLS.mailerLiteApi, data, {
        headers: {
          'Content-Type': 'application/json',
          mode: 'cors',
          'Cache-control': 'no-cache',
          Authorization: `Bearer ${import.meta.env.VITE_APP_MAILER_LITE_KEY}`,
        },
      });

      return res.data;
    },
  });

export const useContactUs = () =>
  useMutation({
    mutationKey: ['contactUs'],
    mutationFn: async (data: IContactUs) => {
      const res = await axios.post(URLS.mailerLiteApi, data, {
        headers: {
          'Content-Type': 'application/json',
          mode: 'cors',
          'Cache-control': 'no-cache',
          Authorization: `Bearer ${import.meta.env.VITE_APP_MAILER_LITE_KEY}`,
        },
      });

      return res.data;
    },
  });

export const useBookADemo = () =>
  useMutation({
    mutationKey: ['book_a_demo'],
    mutationFn: async (data: IBookADemo) => {
      const res = await axios.post(URLS.mailerLiteApi, data, {
        headers: {
          'Content-Type': 'application/json',
          mode: 'cors',
          'Cache-control': 'no-cache',
          Authorization: `Bearer ${import.meta.env.VITE_APP_MAILER_LITE_KEY}`,
        },
      });

      return res.data;
    },
  });

export const useCheckAllowedUser = () =>
  useMutation({
    mutationKey: ['checkAllowedUser'],
    mutationFn: async (data: UserSignUpType) => {
      const res = await customAxios.post(URLS.checkAllowedUser, data);

      return res.data;
    },
  });

export const useLoginUser = () =>
  useMutation({
    mutationKey: ['loginUser'],
    mutationFn: async (data: UserLoginType) => {
      const res = await customAxios.post(URLS.redirectToCompany, data);

      return res.data;
    },
  });

export const useForgotCompanyDomain = () =>
  useMutation({
    mutationKey: ['forgotCompanyDomain'],
    mutationFn: async (data: ForgotDomainType) => {
      const res = await customAxios.post(URLS.forgotCompanyDomain, data);

      return res.data;
    },
  });

export const useRegisterCompany = () =>
  useMutation({
    mutationKey: ['signup'],
    mutationFn: async (data: AuthType) => {
      const res = await customAxios.post(URLS.signup, data);

      return res.data;
    },
  });
