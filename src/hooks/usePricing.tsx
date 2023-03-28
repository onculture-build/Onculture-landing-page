import axios from "axios";
import { useQuery } from "react-query";
import { useAppDispatch } from "../redux/store";
import { postAllPlans } from "../redux/subscription";

function usePricing() {
  const dispatch = useAppDispatch();

  const fetchPricing = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_PROXY}/subscription/allPlans`);

    if (response.status === 200) {
      //   return response.data;
      dispatch(postAllPlans(response.data));

      return response.data;
    }

    throw response.data.error;
  };

  return useQuery(["pricing"], fetchPricing, {
    retryOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
}

export default usePricing;
