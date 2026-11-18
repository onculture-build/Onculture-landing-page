import { ReactNode } from "react";
import { Box, Heading, Stack, Text, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import SignupStepper from "./signup-stepper";

export default function SignupShell({
  step,
  title,
  subtitle,
  wide = false,
  children,
}: {
  step: number;
  title: string;
  subtitle: string;
  wide?: boolean | "plans" | "payment";
  children: ReactNode;
}) {
  return (
    <Box
      as="main"
      w="full"
      px={{ base: 4, md: 8 }}
      pt={{ base: 6, md: 8 }}
      pb={12}
      minH="90vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      <SignupStepper currentStep={step} />
      <Stack spacing={2} textAlign="center" mt={8} mb={7}>
        <Heading
          as="h1"
          fontFamily="inherit"
          fontSize={{ base: "26px", md: "30px" }}
          fontWeight={600}
        >
          {title}
        </Heading>
        <Text color="gray.600" fontSize="14px">
          {subtitle}
        </Text>
      </Stack>
      <Box
        maxW={
          wide === "plans"
            ? "1348px"
            : wide === "payment"
              ? "960px"
              : wide
                ? "760px"
                : "520px"
        }
        w="full"
        mx="auto"
      >
        {children}
      </Box>
    </Box>
  );
}
export function SignupLogin() {
  return (
    <Text textAlign="center" fontSize="14px" mt={4}>
      Already have an account?{" "}
      <Link
        as={RouterLink}
        to="/login"
        color="brand.primary.600"
        textDecoration="underline"
      >
        Login
      </Link>
    </Text>
  );
}
