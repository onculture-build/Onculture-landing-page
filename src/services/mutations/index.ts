import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import URLS from '../urls';
import { IAddToWaitlist } from '../../lib/interfaces';

export const useAddToWaitlist = () =>
  useMutation({
    mutationKey: ['addToWaitlist'],
    mutationFn: async (data: IAddToWaitlist) => {
      const res = await axios.post(URLS.addToWaitlist, data, {
        headers: {
          'Content-Type': 'application/json',
          mode: 'cors',
          "Cache-control": "no-cache",
          'X-MailerLite-ApiKey': import.meta.env.VITE_APP_MAILER_LITE_KEY,
        },
      });

      return res.data;
    },
  });
