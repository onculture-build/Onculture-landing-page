import { Flex, Spinner, Stack, Text } from "@chakra-ui/react";
import CustomButton from "../../../components/custom-button";
import { PublicPlan } from "../../../services/queries/subscriptions.query";
import SignupPlans from "../signup-plans";

export default function PlanSelectionStep({
  catalog,
  plans,
  priceId,
  choose,
  seats,
  setSeats,
  currency,
  setCurrency,
  interval,
  setInterval,
  selectedPrice,
  signupPending,
  token,
  register,
  back,
}: {
  catalog: {
    isPending: boolean;
    isError: boolean;
    refetch: () => unknown;
  };
  plans: PublicPlan[];
  priceId: string;
  choose: (id: string) => void;
  seats: number;
  setSeats: (value: number) => void;
  currency: string;
  setCurrency: (value: string) => void;
  interval: string;
  setInterval: (value: string) => void;
  selectedPrice?: { unitAmountMinor: number };
  signupPending: boolean;
  token: string;
  register: () => void;
  back: () => void;
}) {
  if (catalog.isPending) return <Spinner aria-label="Loading plans" />;
  if (catalog.isError)
    return (
      <Stack>
        <Text>Unable to load plans.</Text>
        <CustomButton onClick={() => catalog.refetch()}>Retry</CustomButton>
      </Stack>
    );

  return (
    <>
      <SignupPlans
        plans={plans}
        priceId={priceId}
        onPrice={choose}
        seats={seats}
        onSeats={setSeats}
        currency={currency}
        onCurrency={setCurrency}
        interval={interval}
        onInterval={setInterval}
      />
      <Flex maxW="440px" mx="auto" gap={4} mt={6}>
        <CustomButton
          variant="outline"
          w="full"
          h="44px"
          padding={2}
          onClick={back}
          disabled={signupPending || !!token}
        >
          Back
        </CustomButton>
        <CustomButton
          w="full"
          h="44px"
          padding={2}
          loading={signupPending}
          disabled={!selectedPrice}
          onClick={register}
        >
          {selectedPrice?.unitAmountMinor === 0 ? "Create workspace" : "Next"}
        </CustomButton>
      </Flex>
    </>
  );
}
