import { Link as RouterLink, useSearchParams } from "react-router-dom";
import { Box, Link, Text } from "@chakra-ui/react";
import {
  formatPlanPrice,
  useGetSubscriptionPlans,
} from "../services/queries/subscriptions.query";
import { PageRoutes } from "../lib/constants";

const SelectedPlan = () => {
  const [params] = useSearchParams();
  const priceId = params.get("price");
  const { data: plans, isLoading, isError } = useGetSubscriptionPlans();
  if (!priceId) return null;
  const plan = plans?.find((candidate) =>
    candidate.prices.some((price) => price.id === priceId),
  );
  const price = plan?.prices.find((candidate) => candidate.id === priceId);
  return (
    <Box mt={6} p={4} bg="brand.gray.200" borderRadius={8} aria-live="polite">
      {isLoading ? (
        <Text>Loading selected plan…</Text>
      ) : plan && price ? (
        <Text>
          Selected plan — {plan.name}, {formatPlanPrice(price)} {price.currency}
          {price.perSeat ? " per seat" : ""} per{" "}
          {price.interval === "Monthly" ? "month" : "year"}
        </Text>
      ) : (
        <Text>
          {isError
            ? "Unable to confirm your selected plan."
            : "Your selected plan is no longer available."}
        </Text>
      )}
      <Link as={RouterLink} to={`/${PageRoutes.pricing}`}>
        Choose a plan
      </Link>
    </Box>
  );
};

export default SelectedPlan;
