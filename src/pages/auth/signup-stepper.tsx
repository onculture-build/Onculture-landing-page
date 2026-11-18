import {
  Step,
  StepIndicator,
  Stepper,
  StepSeparator,
  StepStatus,
  StepIcon,
  StepNumber,
  Text,
  Stack,
} from "@chakra-ui/react";

const steps = ["Admin Details", "Company Details", "Subscription", "Payment"];

export default function SignupStepper({
  currentStep,
}: {
  currentStep: number;
}) {
  return (
    <Stack w="full" maxW="520px" mx="auto">
      <Stepper index={currentStep} colorScheme="purple" gap="0">
        {steps.map((step, index) => (
          <Step
            key={step}
            style={{
              flexDirection: "column",
              alignItems: "center",
              position: "relative",
            }}
          >
            <StepIndicator
              boxSize="28px"
              fontSize="14px"
              sx={{
                "[data-status=complete] &": {
                  background: "#5C00DD",
                  borderColor: "#B1BCD3",
                },
                "[data-status=active] &": {
                  background: "white",
                  borderColor: "#5C00DD",
                },
                "[data-status=incomplete] &": {
                  background: "white",
                  borderColor: "#B1BCD3",
                },
              }}
            >
              <StepStatus
                complete={<StepIcon />}
                active={<StepNumber />}
                incomplete={<StepNumber />}
              />
            </StepIndicator>
            <Text
              mt={2}
              fontSize={{ base: "12px", md: "14px" }}
              fontWeight="semiBold"
              sx={{
                "[data-status=complete] &": { color: "brand.primary.600" },
                "[data-status=active] &": { color: "brand.primary.600" },
                "[data-status=incomplete] &": { color: "#B5BFC9" },
              }}
            >
              {step}
            </Text>

            {index < steps.length - 1 && (
              <StepSeparator
                style={{
                  position: "absolute",
                  top: "14px",
                  left: "calc(50% + 18px)",
                  width: "calc(100% - 36px)",
                }}
              />
            )}
          </Step>
        ))}
      </Stepper>
    </Stack>
  );
}
