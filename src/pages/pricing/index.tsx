import React from "react";
import {
  Box,
  Flex,
  Grid,
  Heading,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import "./pricing.css";
import PricingCard from "./pricing-card";
import CustomEnquiry from "./custom-enquiry";

import { useGetSubscriptionPlans } from "../../services/queries/subscriptions.query";
import CustomButton from "../../components/custom-button";
import { PageRoutes } from "../../lib/constants";

const Pricing = () => {
  const navigate = useNavigate();
  const [customOpen, setCustomOpen] = React.useState(false);
  const [interval, setInterval] = React.useState("Monthly");
  const [currency, setCurrency] = React.useState("");
  const {
    data: plans = [],
    isLoading,
    isError,
    refetch,
  } = useGetSubscriptionPlans();
  const currencies = [
    ...new Set(
      plans.flatMap((plan) => plan.prices.map((price) => price.currency)),
    ),
  ].sort();
  const selectedCurrency = currencies.includes(currency)
    ? currency
    : (currencies[0] ?? "");
  const intervals = ["Monthly", "Annual"].filter((value) =>
    plans.some((plan) =>
      plan.prices.some(
        (price) =>
          price.interval === value && price.currency === selectedCurrency,
      ),
    ),
  );
  const selectedInterval = intervals.includes(interval)
    ? interval
    : (intervals[0] ?? "");

  return (
    <Box as="main" className="pricing-page">
      <Stack className="pricing-hero" align="center" spacing={6}>
        <Heading as="h1">
          Simple pricing for teams of <span>every size</span>
        </Heading>
        <Text>
          Every plan is priced per user, per month, so you only pay for the
          people on your team. Need something different? Build a custom plan
          with our sales team.
        </Text>
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
                  aria-pressed={value === selectedInterval}
                  onClick={() => setInterval(value)}
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
                  key={value}
                  type="button"
                  aria-pressed={value === selectedCurrency}
                  onClick={() => setCurrency(value)}
                >
                  {value === "NGN"
                    ? "₦ NGN"
                    : value === "USD"
                      ? "$ USD"
                      : value}
                </button>
              ))}
            </Flex>
          )}
        </Flex>
      </Stack>
      <Box className="pricing-content">
        {isLoading ? (
          <Flex justify="center">
            <Spinner aria-label="Loading plans" />
          </Flex>
        ) : isError ? (
          <Stack align="center">
            <Text>Unable to load plans.</Text>
            <CustomButton onClick={() => refetch()}>Retry</CustomButton>
          </Stack>
        ) : (
          plans.length === 0 && (
            <Text textAlign="center">No plans are currently available.</Text>
          )
        )}
        <Grid className="pricing-grid">
          {plans.map((plan) => {
            const price = plan.prices.find(
              (candidate) =>
                candidate.interval === selectedInterval &&
                candidate.currency === selectedCurrency,
            );
            return (
              price && (
                <PricingCard
                  key={plan.id}
                  plan={plan}
                  price={price}
                  onClick={() =>
                    navigate(
                      "/" +
                        PageRoutes.signup +
                        "?price=" +
                        encodeURIComponent(price.id),
                    )
                  }
                />
              )
            );
          })}
          <PricingCard onClick={() => setCustomOpen(true)} />
        </Grid>
        {selectedCurrency && (
          <Text className="pricing-note">
            All prices are in {selectedCurrency}. Need a custom plan?{" "}
            <button type="button" onClick={() => setCustomOpen(true)}>
              Talk to sales
            </button>
            .
          </Text>
        )}
        <Grid className="pricing-faq">
          <Box>
            <Heading as="h2">Questions about pricing</Heading>
            <Text mt={3}>
              Can’t find what you need? Email{" "}
              <a href="mailto:Get@OnCulture.io">Get@OnCulture.io</a> and we’ll
              get back to you.
            </Text>
          </Box>
          <Box>
            {[
              [
                "How is pricing calculated?",
                "For per-seat plans, your total depends on the plan price, billing cycle and number of seats.",
              ],
              [
                "What is a custom plan?",
                "Tell our sales team which modules and how many seats you need. They’ll help you build a plan for your team.",
              ],
              [
                "Can I change plans later?",
                "You can review available plans and change your subscription from the billing page.",
              ],
              [
                "How can my company pay?",
                "Choose a plan and currency to see the payment options available at checkout.",
              ],
            ].map(([question, answer], i) => (
              <details key={question} open={i === 0}>
                <summary>
                  {question}
                  <img
                    className="faq-open"
                    src="/assets/pricing/82ac7.svg"
                    alt=""
                  />
                  <img
                    className="faq-closed"
                    src="/assets/pricing/cfb90.svg"
                    alt=""
                  />
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </Box>
        </Grid>
        <Stack className="pricing-demo" align="center" spacing={5}>
          <Heading as="h2">
            Want to see OnCulture
            <br /> before you decide?
          </Heading>
          <Text>
            Book a short demo and we’ll walk you through OnCulture with your own
            team in mind.
          </Text>
          <CustomButton
            bg="white"
            color="#1b0142"
            onClick={() => navigate("/" + PageRoutes.bookDemo)}
          >
            Book a demo
          </CustomButton>
        </Stack>
      </Box>
      <CustomEnquiry isOpen={customOpen} onClose={() => setCustomOpen(false)} />
    </Box>
  );
};

export default Pricing;
