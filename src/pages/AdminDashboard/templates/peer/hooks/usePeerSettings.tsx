import axios from "axios";
import { useQuery } from "react-query";
import { useAppSelector, RootState } from "../../../../../redux/store";

function usePeerSettings() {
  const { userToken } = useAppSelector((state: RootState) => state.user);

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userToken}`,
    },
  };

  const fetchPeerSettings = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_PROXY}/template/getSummary?templateType=peer_1:1&startDate=23-01-22&endDate=23-09-22`,
      config
    );
    if (response.status === 200) {
      return response.data;
    }

    throw response.data.error;
  };

  return useQuery(["peers-settings"], fetchPeerSettings, {
    // keepPreviousData: true,
    retryOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
}

export default usePeerSettings;
