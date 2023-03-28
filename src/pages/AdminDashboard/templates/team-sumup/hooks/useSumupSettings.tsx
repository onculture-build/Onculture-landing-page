import axios from "axios";
import { useQuery } from "react-query";
import { useAppSelector, RootState } from "../../../../../redux/store";

function useSumupSettings() {
  const { userToken } = useAppSelector((state: RootState) => state.user);

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userToken}`,
    },
  };

  const fetchSettings = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_PROXY}/template/getSummary?templateType=team_sum_up`,
      config
    );
    if (response.status === 200) {
      return response.data;
    }

    throw response.data.error;
  };

  return useQuery(["team-sumup-settings"], fetchSettings, {
    // keepPreviousData: true,
    retryOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
}

export default useSumupSettings;
