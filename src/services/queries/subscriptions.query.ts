import { useQuery } from '@tanstack/react-query';
import axios from '../axios';
import URLS from '../urls';

export const useGetSubscriptionPlans = () =>
  useQuery({
    queryKey: ['getSubscriptionsPlans'],
    queryFn: async () => {
      const res = await axios.get(URLS.getSubscriptionPlans);
      return res.data;
    },
  });
