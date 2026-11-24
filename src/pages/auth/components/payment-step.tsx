import { Spinner, Stack, Text } from "@chakra-ui/react";
import CustomButton from "../../../components/custom-button";
import {
  PlanPrice,
  PublicPlan,
} from "../../../services/queries/subscriptions.query";
import SignupPayment from "../signup-payment";
import { signupError } from "../../../services/queries/signup-checkout";

export default function PaymentStep({
  status,
  takingLonger,
  selectedPlan,
  selectedPrice,
  token,
  seats,
  catalogRefetch,
  setStep,
}: {
  takingLonger: boolean;
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

  if (
    status.data?.status === "ProvisioningFailed" ||
    (provisioning && takingLonger)
  )
    return (
      <Stack align="center" py={10}>
        <Text
          fontSize="xl"
          fontWeight={600}
          role={provisioning && takingLonger ? "status" : "alert"}
        >
          {provisioning && takingLonger
            ? status.data?.paymentConfirmed
              ? "Payment confirmed. Your account is still being created"
              : "Your account is still being created"
            : "We couldn’t finish creating your account"}
        </Text>
        <Text textAlign="center" color="gray.600">
          {provisioning && takingLonger
            ? "Setup is taking longer than expected. Automatic status checks have paused. Use the button below to check again."
            : "Please check the setup status again. If this continues, contact get@onculture.io with your company domain."}
        </Text>
        <Text textAlign="center" color="gray.600">
          You don’t need to register again. You can continue once your account
          is ready.
        </Text>
        {status.data?.paymentConfirmed && (
          <Text color="gray.600">
            Your payment is saved. You won’t be charged again for this signup.
          </Text>
        )}
        <CustomButton onClick={() => status.refetch()}>
          Check setup status
        </CustomButton>
      </Stack>
    );
  if (status.isPending)
    return (
      <Stack align="center" py={10} spacing={4} role="status">
        <Spinner color="brand.primary.600" />
        <Text>Loading your checkout…</Text>
      </Stack>
    );
  if (provisioning)
    return (
      <Stack
        align="center"
        py={10}
        spacing={4}
        role="status"
        aria-live="polite"
      >
        <Spinner color="brand.primary.600" />
        <Text fontSize="xl" fontWeight={600}>
          {status.data?.paymentConfirmed
            ? "Payment confirmed. Your account is being created"
            : "Your account is currently being created"}
        </Text>
        <Text textAlign="center" color="gray.600">
          This may take a few minutes. We’ll take you to the next step as soon
          as your account is ready.
        </Text>
        <Text textAlign="center" color="gray.600">
          {status.data?.paymentConfirmed
            ? "Your payment is saved. You won’t be charged again for this signup."
            : "You don’t need to register again or make a payment while we set things up."}
        </Text>
      </Stack>
    );

  if (status.isError && !status.data)
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
        {status.isError && (
          <Text role="alert" color="red.600" bg="red.50" p={3} mb={4}>
            We couldn’t refresh your checkout status.{" "}
            {signupError(status.error)}
          </Text>
        )}
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
