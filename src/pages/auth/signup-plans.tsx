import { useState } from "react";
import { Box, Flex, Grid, Stack, Text } from "@chakra-ui/react";
import CustomButton from "../../components/custom-button";
import CustomInput from "../../components/custom-input";
import CustomEnquiry from "../pricing/custom-enquiry";
import PricingCard from "../pricing/pricing-card";
import "../pricing/pricing.css";
import {
  formatPlanPrice,
  PublicPlan,
} from "../../services/queries/subscriptions.query";

export default function SignupPlans({
  plans,
  priceId,
  onPrice,
  seats,
  onSeats,
  currency,
  onCurrency,
  interval,
  onInterval,
}: {
  plans: PublicPlan[];
  priceId: string;
  onPrice: (id: string) => void;
  seats: number;
  onSeats: (count: number) => void;
  currency: string;
  onCurrency: (value: string) => void;
  interval: string;
  onInterval: (value: string) => void;
}) {
  const [custom, setCustom] = useState(false);
  const currencies = [
    ...new Set(
      plans.flatMap((plan) => plan.prices.map((price) => price.currency)),
    ),
  ].sort();
  const intervals = ["Monthly", "Annual"].filter((value) =>
    plans.some((plan) =>
      plan.prices.some(
        (price) => price.interval === value && price.currency === currency,
      ),
    ),
  );
  const selected = plans
    .flatMap((plan) => plan.prices)
    .find((price) => price.id === priceId);
  const plan = plans.find((item) =>
    item.prices.some((price) => price.id === priceId),
  );
  const billable = selected?.unitAmountMinor
    ? Math.max(3, seats || 1)
    : seats || 1;

  return (
    <Stack className="pricing-page" spacing={5} w="full">
      <Flex gap={3} align="center" wrap="wrap" justify="center">
        {intervals.length > 0 && (
          <Flex
            className="pricing-cycle"
            role="group"
            aria-label="Billing cycle"
          >
            {intervals.map((value) => (
              <button
                type="button"
                key={value}
                aria-pressed={value === interval}
                onClick={() => onInterval(value)}
              >
                {value === "Annual" ? "Yearly" : value}
              </button>
            ))}
          </Flex>
        )}
        {currencies.length > 1 && (
          <Flex className="pricing-cycle" role="group" aria-label="Currency">
            {currencies.map((value) => (
              <button
                type="button"
                key={value}
                aria-pressed={value === currency}
                onClick={() => onCurrency(value)}
              >
                {value === "NGN" ? "₦ NGN" : value === "USD" ? "$ USD" : value}
              </button>
            ))}
          </Flex>
        )}
      </Flex>

      <Box>
        <Flex
          p={"20px"}
          bg="#FAFAFB"
          borderRadius="4px"
          justify="space-between"
          align="center"
          gap={4}
          wrap="wrap"
          border="1px solid #EEEDF0"
        >
          <Box>
            <Text color={"#1B1B1B"} fontWeight={600} fontSize="16px">
              How many users?
            </Text>
            <Text fontSize="14px" color="#4A4F66">
              Everyone who’ll sign in, including you. Add more later from
              Billing.
            </Text>
          </Box>
          <Flex align="center" gap={2}>
            <CustomButton
              sx={{ border: "1px solid #D2B2FF", borderradius: "8px" }}
              aria-label="Remove a user"
              variant="outline"
              padding={0}
              minW="44px"
              h="49px"
              disabled={seats <= 1}
              onClick={() => onSeats(Math.max(1, seats - 1))}
            >
              −
            </CustomButton>
            <CustomInput
              aria-label="Number of users"
              type="number"
              min={1}
              max={1000000}
              h="49px"
              w="64px"
              sx={{ border: "1px solid #E9EAEC", borderradius: "8px" }}
              value={seats || ""}
              onChange={(event) =>
                onSeats(Number((event.target as HTMLInputElement).value))
              }
            />
            <CustomButton
              aria-label="Add a user"
              variant="outline"
              padding={0}
              minW="44px"
              h="49px"
              sx={{ border: "1px solid #D2B2FF", borderradius: "8px" }}
              onClick={() => onSeats(seats + 1)}
            >
              +
            </CustomButton>
          </Flex>
        </Flex>

        {selected && (
          <Flex
            p={"20px"}
            bg="#F7F2FD"
            borderRadius="4px"
            justify="space-between"
            align="center"
            gap={4}
            wrap="wrap"
            border="1px solid #EEEDF0"
            my={4}
          >
            <Text fontSize="16px">
              <b>{plan?.name}</b> · {formatPlanPrice(selected)} X{" "}
              {selected.perSeat ? billable : 1}
            </Text>
            <Text fontSize="15px">
              Total:{" "}
              <Text as="strong" color="brand.primary.600" fontSize="20px">
                {formatPlanPrice({
                  ...selected,
                  unitAmountMinor:
                    selected.unitAmountMinor *
                    (selected.perSeat ? billable : 1),
                })}
              </Text>{" "}
              / {interval === "Annual" ? "year" : "month"}
            </Text>
          </Flex>
        )}
      </Box>

      {!plans.some((item) =>
        item.prices.some(
          (price) => price.currency === currency && price.interval === interval,
        ),
      ) && (
        <Text role="status">
          No plans are available for this currency and billing cycle.
        </Text>
      )}

      <Grid className="pricing-grid">
        {plans.map((item) => {
          const price = item.prices.find(
            (candidate) =>
              candidate.currency === currency &&
              candidate.interval === interval,
          );
          return price ? (
            <PricingCard
              key={item.id}
              plan={item}
              price={price}
              selectable
              selected={price.id === priceId}
              actionLabel={price.id === priceId ? "Selected" : "Get started"}
              onClick={() => onPrice(price.id)}
            />
          ) : null;
        })}
        <PricingCard onClick={() => setCustom(true)} />
      </Grid>

      <CustomEnquiry isOpen={custom} onClose={() => setCustom(false)} />
    </Stack>
  );
}
