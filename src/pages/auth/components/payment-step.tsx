import { Spinner, Stack, Text } from "@chakra-ui/react";
import CustomButton from "../../../components/custom-button";
import {
  PlanPrice,
  PublicPlan,
} from "../../../services/queries/subscriptions.query";
import SignupPayment from "../signup-payment";

export default function PaymentStep({
  status,
  selectedPlan,
  selectedPrice,
  token,
  seats,
  catalogRefetch,
  setStep,
}: {
  status: {
    isPending: boolean;
    isError: boolean;
    error: unknown;
    data?: any;
    refetch: () => unknown;
  };
  selectedPlan?: PublicPlan;
  selectedPrice?: PlanPrice;
  token: string;
  seats: number;
  catalogRefetch: () => unknown;
  setStep: (step: number) => void;
}) {
  if (
    status.isPending ||
    status.data?.status === "Provisioning" ||
    selectedPrice?.unitAmountMinor === 0
  )
    return (
      <Stack align="center" py={10}>
        <Spinner />
        <Text>Creating your workspace…</Text>
      </Stack>
    );

  if (status.data && selectedPlan && selectedPrice)
    return (
      <>
        {(!status.data.order || status.data.order.status === "Failed") && (
          <CustomButton
            variant="outline"
            h="40px"
            padding="8px 20px"
            mb={4}
            onClick={() => setStep(2)}
          >
            Back
          </CustomButton>
        )}
        <SignupPayment
          token={token}
          state={status.data}
          plan={selectedPlan}
          price={selectedPrice}
          seats={seats}
          refresh={() => status.refetch()}
          onDone={() => setStep(4)}
        />
      </>
    );

  return (
    <Stack align="center">
      <Text>Unable to load signup checkout.</Text>
      <CustomButton onClick={() => status.refetch()}>Retry</CustomButton>
      {(!status.data?.order || status.data.order.status === "Failed") && (
        <CustomButton
          variant="outline"
          onClick={() => {
            catalogRefetch();
            setStep(2);
          }}
        >
          Choose a plan
        </CustomButton>
      )}
    </Stack>
  );
}
