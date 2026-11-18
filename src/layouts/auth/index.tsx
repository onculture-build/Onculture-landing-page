import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <Box
      minH="100dvh"
      w="full"
      bg="brand.white"
      borderTop="1px solid"
      borderColor="gray.100"
    >
      {children}
    </Box>
  );
}
