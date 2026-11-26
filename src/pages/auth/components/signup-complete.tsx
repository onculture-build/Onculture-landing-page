import { Box, Circle, Flex, Heading, Text } from "@chakra-ui/react";
import { CheckIcon, WarningIcon } from "@chakra-ui/icons";
import CustomButton from "../../../components/custom-button";
import toast from "react-hot-toast";
import {
  signupRequest,
  signupError,
} from "../../../services/queries/signup-checkout";
import { MdOutlineMail } from "react-icons/md";

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
  const isActive = status.data?.status === "Active";

  return (
    <Box maxW="500px" mx="auto" px={4} py={16} textAlign="center">
      <Circle size="96px" bg="#F7F2FD" mx="auto" mb={6}>
        <MdOutlineMail color="#5C00DD" size="42px" />
      </Circle>
      <Text
        bg={isActive ? "#E8F9F0" : "#FCEAEE"}
        color={isActive ? "#127A30" : "#E23A2F"}
        display="inline-block"
        p={"7px 12px"}
        borderRadius="6px"
        fontSize="13px"
        fontWeight={600}
      >
        <Flex as="span" align="center" gap={1.5}>
          {isActive ? (
            <CheckIcon aria-hidden="true" boxSize="12px" />
          ) : (
            <WarningIcon aria-hidden="true" boxSize="12px" />
          )}
          {isActive
            ? selectedPrice?.unitAmountMinor
              ? "Payment confirmed"
              : "Your Free plan is active"
            : "Payment confirmation pending"}
        </Flex>
      </Text>
      <Heading fontSize="28px" mt={5}>
        Welcome to OnCulture!
      </Heading>
      <Text mt={5} fontSize="16px" color="#4A4F66">
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
      <Text mt={6} fontSize="14px" color="#4A4F66">
        Didn’t receive the email?{" "}
        <CustomButton
          variant="ghost"
          color="#5C00DD"
          fontSize="14px"
          fontWeight={600}
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
