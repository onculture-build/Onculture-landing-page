import {
  Box,
  Card,
  Flex,
  Heading,
  List,
  ListItem,
  Stack,
  Text,
} from "@chakra-ui/react";
import CustomButton from "../../components/custom-button";
import {
  formatPlanPrice,
  PlanPrice,
  PublicPlan,
} from "../../services/queries/subscriptions.query";

type PricingProps = {
  onClick: () => void;
  selectable?: boolean;
  selected?: boolean;
  actionLabel?: string;
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

const PricingCard = ({
  plan,
  price,
  onClick,
  selectable = false,
  selected = false,
  actionLabel,
}: PricingProps) => {
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
      className={
        plan
          ? `pricing-card${selected ? " pricing-selected" : ""}`
          : "pricing-card pricing-custom"
      }
      variant="unstyled"
    >
      <Stack spacing={4}>
        <Flex align="center" justify="space-between" gap={3}>
          <Heading as="h3">{plan?.name ?? "Custom"}</Heading>
          {selectable && plan && (
            <Box
              aria-hidden="true"
              boxSize="24px"
              border="2px solid"
              borderColor={selected ? "brand.primary.600" : "#C9BCE0"}
              borderRadius="full"
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexShrink={0}
              bg="white"
            >
              {selected && (
                <Box
                  boxSize="12px"
                  borderRadius="full"
                  bg="brand.primary.600"
                />
              )}
            </Box>
          )}
        </Flex>
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
          color={plan ? "brand.white" : "brand.primary.600"}
          bg={plan ? "brand.primary.600" : "white"}
          _hover={
            plan
              ? { backgroundColor: "brand.primary.700", color: "brand.white" }
              : undefined
          }
          w="100%"
          minH="48px"
          onClick={onClick}
        >
          {actionLabel ?? (plan ? "Get started" : "Talk to sales")}
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
