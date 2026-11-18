import { Box, Circle, Heading, Text } from "@chakra-ui/react";
import { EmailIcon } from "@chakra-ui/icons";
import CustomButton from "../../../components/custom-button";
import toast from "react-hot-toast";
import {
  signupRequest,
  signupError,
} from "../../../services/queries/signup-checkout";

export default function SignupComplete({
  status,
  selectedPrice,
  userEmail,
  draftCode,
  token,
  setStep,
}: {
  status: {
    data?: { status?: string; email?: string; code?: string };
  };
  selectedPrice?: { unitAmountMinor: number };
  userEmail: string;
  draftCode: string;
  token: string;
  setStep: (step: number) => void;
}) {
  return (
    <Box maxW="500px" mx="auto" px={4} py={16} textAlign="center">
      <Circle size="96px" bg="purple.50" mx="auto" mb={6}>
        <EmailIcon color="brand.primary.600" boxSize={9} />
      </Circle>
      <Text
        bg={status.data?.status === "Active" ? "green.50" : "orange.50"}
        color={status.data?.status === "Active" ? "green.700" : "orange.700"}
        display="inline-block"
        px={3}
        py={1}
        borderRadius="6px"
        fontSize="13px"
      >
        {status.data?.status === "Active"
          ? selectedPrice?.unitAmountMinor
            ? "Payment confirmed"
            : "Your Free plan is active"
          : "Payment confirmation pending"}
      </Text>
      <Heading fontSize="28px" mt={5}>
        Welcome to OnCulture!
      </Heading>
      <Text mt={5} color="gray.600">
        We’ve sent a verification link to {status.data?.email || userEmail}.
        Open it to create your password and log in to{" "}
        {status.data?.code || draftCode}.
        {import.meta.env.VITE_COMPANY_DOMAIN || "OnCulture.io"}.
      </Text>
      {status.data?.status !== "Active" && (
        <Text mt={4} fontSize="13px">
          You can set up your account now. Dashboard access begins after an
          administrator confirms your payment.
        </Text>
      )}
      <Text mt={5} fontSize="13px">
        Didn’t receive the email?{" "}
        <CustomButton
          variant="ghost"
          color="brand.primary.600"
          fontSize="13px"
          onClick={() =>
            signupRequest(token, "/resend-verification", {})
              .then(() => toast.success("Verification email requested."))
              .catch((error) => toast.error(signupError(error)))
          }
        >
          Click to resend
        </CustomButton>
      </Text>
      {status.data?.status !== "Active" && (
        <CustomButton
          mt={6}
          variant="outline"
          h="44px"
          padding={3}
          onClick={() => setStep(3)}
        >
          View payment status
        </CustomButton>
      )}
    </Box>
  );
}
