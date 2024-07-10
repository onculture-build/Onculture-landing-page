import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import URLS from '../urls';
import { IAddToWaitlist, IBookADemo, IContactUs } from '../../lib/interfaces';

export const useAddToWaitlist = () =>
  useMutation({
    mutationKey: ['addToWaitlist'],
    mutationFn: async (data: IAddToWaitlist) => {
      const res = await axios.post(URLS.addToWaitlist, data, {
        headers: {
          'Content-Type': 'application/json',
          mode: 'cors',
          'X-MailerLite-ApiKey': import.meta.env.VITE_APP_MAILER_LITE_KEY,
        },
      });

      return res.data;
    },
  });

export const useContactUs = () =>
  useMutation({
    mutationKey: ['contactUs'],
    mutationFn: async (data: IContactUs) => {
      const res = await axios.post(URLS.contactUs, data, {
        headers: {
          'Content-Type': 'application/json',
          mode: 'cors',
          'X-MailerLite-ApiKey': import.meta.env.VITE_APP_MAILER_LITE_KEY,
        },
      });

      return res.data;
    },
  });

export const useBookADemo = () =>
  useMutation({
    mutationKey: ['book_a_demo'],
    mutationFn: async (data: IBookADemo) => {
      const res = await axios.post(URLS.bookADemo, data, {
        headers: {
          'Content-Type': 'application/json',
          mode: 'cors',
          'X-MailerLite-ApiKey': import.meta.env.VITE_APP_MAILER_LITE_KEY,
        },
      });

      return res.data;
    },
  });
