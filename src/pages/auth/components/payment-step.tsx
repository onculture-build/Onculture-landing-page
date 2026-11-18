import { Spinner, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CustomButton from "../../../components/custom-button";
import {
  PlanPrice,
  PublicPlan,
} from "../../../services/queries/subscriptions.query";
import SignupPayment from "../signup-payment";
import { signupError } from "../../../services/queries/signup-checkout";

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
  const provisioning = status.data?.status === "Provisioning";
  const [takingLonger, setTakingLonger] = useState(false);
  useEffect(() => {
    setTakingLonger(false);
    if (!provisioning) return;
    const timer = setTimeout(() => setTakingLonger(true), 120_000);
    return () => clearTimeout(timer);
  }, [provisioning]);

  if (
    status.data?.status === "ProvisioningFailed" ||
    (provisioning && takingLonger)
  )
    return (
      <Stack align="center" py={10}>
        <Text role="alert">
          {takingLonger
            ? "Workspace setup is taking longer than expected."
            : "We couldn’t create your workspace."}{" "}
          Please contact get@onculture.io with your company domain if this
          continues.
        </Text>
        <CustomButton onClick={() => status.refetch()}>
          Check setup status
        </CustomButton>
      </Stack>
    );
  if (status.isPending || provisioning)
    return (
      <Stack align="center" py={10}>
        <Spinner />
        <Text>Creating your workspace…</Text>
      </Stack>
    );

  if (status.isError)
    return (
      <Stack align="center" py={10}>
        <Text role="alert">{signupError(status.error)}</Text>
        <CustomButton onClick={() => status.refetch()}>Retry</CustomButton>
      </Stack>
    );

  if (
    selectedPrice?.unitAmountMinor === 0 &&
    status.data?.status === "PaymentRequired"
  )
    return (
      <Stack align="center" py={10}>
        <Text role="alert">
          Your workspace was created, but the Free plan could not be activated.
          Please contact get@onculture.io with your company domain.
        </Text>
        <CustomButton onClick={() => status.refetch()}>
          Check setup status
        </CustomButton>
      </Stack>
    );

  if (status.data && selectedPlan && selectedPrice)
    return (
      <>
        <SignupPayment
          token={token}
          state={status.data}
          plan={selectedPlan}
          price={selectedPrice}
          seats={seats}
          refresh={() => status.refetch()}
          onDone={() => setStep(4)}
          onBack={() => setStep(2)}
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
