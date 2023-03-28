import axios from "axios";
import { useQuery } from "react-query";
import { RootState, useAppSelector } from "../../../redux/store";

function useChannels() {
  const { userToken, profileInfo } = useAppSelector(
    (state: RootState) => state.user
  );
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userToken}`,
    },
  };

  const { company } = profileInfo;

  const fetchChannels = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_PROXY}/slack/getAllchannel?companyId=${company[0].id}`,
      config
    );

    console.log(response, "channels");

    if (response.status === 200) {
      //   return response.data;
      return response;
    }

    throw response.data.error;
  };

  return useQuery(["channels"], fetchChannels, {
    retryOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
}

export default useChannels;
