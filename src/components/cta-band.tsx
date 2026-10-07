import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { PageRoutes } from "../lib/constants";

interface CtaBandProps {
  title: string;
  description: string;
}

const CtaBand = ({ title, description }: CtaBandProps) => {
  const navigate = useNavigate();
  return (
    <Box bg="brand.primary.700" py={{ base: "48px", md: "56px" }}>
      <Box w="100%" maxW="1232px" mx="auto" px={{ base: "16px", md: "24px" }}>
        <Flex
          direction={{ base: "column", md: "row" }}
          align={{ base: "flex-start", md: "center" }}
          justify="space-between"
          gap="24px"
        >
          <Box maxW="600px">
            <Heading
              as="h2"
              fontSize={{ base: "24px", md: "30px" }}
              fontWeight="bold"
              color="white"
              mb="10px"
            >
              {title}
            </Heading>
            <Text fontSize="16px" lineHeight="26px" color="whiteAlpha.900">
              {description}
            </Text>
          </Box>
          <Flex gap="12px" flexShrink={0}>
            <Button
              h="46px"
              px="22px"
              fontSize="14px"
              fontWeight="medium"
              borderRadius="4px"
              bg="white"
              color="brand.primary.700"
              _hover={{ bg: "brand.primary.50" }}
              onClick={() => navigate(`/${PageRoutes.bookDemo}`)}
            >
              Book a Demo
            </Button>
            <Button
              h="46px"
              px="22px"
              fontSize="14px"
              fontWeight="medium"
              borderRadius="4px"
              variant="outline"
              borderColor="whiteAlpha.700"
              color="white"
              _hover={{ bg: "whiteAlpha.100" }}
              onClick={() => navigate(`/${PageRoutes.joinWaitlist}`)}
            >
              Join Waitlist
            </Button>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default CtaBand;
