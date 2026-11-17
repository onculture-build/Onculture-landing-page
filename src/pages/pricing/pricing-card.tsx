import { Card, Heading, List, ListItem, Stack, Text } from "@chakra-ui/react";
import CustomButton from "../../components/custom-button";
import {
  formatPlanPrice,
  PlanPrice,
  PublicPlan,
} from "../../services/queries/subscriptions.query";

type PricingProps = {
  onClick: () => void;
} & (
  | { plan: PublicPlan; price: PlanPrice }
  | { plan?: undefined; price?: undefined }
);

const customFeatures = [
  "Pick only the modules you need",
  "Pricing based on your team size",
  "Monthly or yearly billing",
  "Pay online or by invoice",
  "A walkthrough with our team",
];

const PricingCard = ({ plan, price, onClick }: PricingProps) => {
  const features = plan
    ? plan.grants
        .filter(({ capability }) => capability.moduleKey)
        .map(({ limit, capability }) =>
          capability.hasLimit
            ? `${capability.name}: ${limit ?? "Unlimited"}`
            : capability.name,
        )
    : customFeatures;

  return (
    <Card
      className={plan ? "pricing-card" : "pricing-card pricing-custom"}
      variant="unstyled"
    >
      <Stack spacing={4}>
        <Heading as="h3">{plan?.name ?? "Custom"}</Heading>
        <Text className="pricing-description">
          {plan?.description ??
            "Choose the modules and seats you need. We’ll price a plan around your team."}
        </Text>
        <div className="pricing-rate">
          <strong>{price ? formatPlanPrice(price) : "Let’s talk"}</strong>
          {price && (
            <span>
              {price.perSeat ? "per user / " : "per "}
              {price.interval === "Monthly" ? "month" : "year"}
            </span>
          )}
        </div>
        <CustomButton
          variant={plan ? "primary" : "primary-outline"}
          color={plan ? undefined : "brand.primary.600"}
          bg={plan ? undefined : "white"}
          w="100%"
          minH="48px"
          onClick={onClick}
        >
          {plan ? "Get started" : "Talk to sales"}
        </CustomButton>
      </Stack>
      <Text className="pricing-includes">
        {plan ? "Includes:" : "Built around you:"}
      </Text>
      <List spacing={2}>
        {features.map((feature, index) => (
          <ListItem key={index} className="pricing-feature">
            <img src="/assets/pricing/31d18.svg" alt="" />
            {feature}
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

export default PricingCard;
