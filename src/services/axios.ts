import Axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';

const axios = Axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL as string,
  headers: { 'Content-Type': 'application/json' },
});

axios.interceptors.response.use(
  (res: any) => {
    return res;
  },
  async (error: any) => {
    if (error instanceof AxiosError && error.response?.status === 400) {
      toast.error(error.response?.data?.message || error.message);
      return Promise.reject(error.response);
    }
    // toast.error(error.response?.data?.message || error.message);
    return Promise.reject(error.response);
  }
);

export default axios;
