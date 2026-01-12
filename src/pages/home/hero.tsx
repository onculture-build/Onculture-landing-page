import { useNavigate } from "react-router-dom";
import { Box, Flex, Heading, Image, Stack, Text } from "@chakra-ui/react";
import CustomButton from "../../components/custom-button";
import ViewportContainer from "../../layouts/container";
import { PageRoutes } from "../../lib/constants";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <Flex
      backgroundAttachment={"fixed"}
      background={"url(/assets/images/home-hero-background.png)"}
      backgroundSize={"100% 100%"}
      backgroundRepeat={"no-repeat"}
      backgroundPosition={"0px 40px"}
      minH={"90vh"}
      h={"fit-content"}
    >
      <ViewportContainer>
        <Box my={28} px={{ base: "2rem", lg: "0" }}>
          <Stack
            h={"100%"}
            justifyContent={"center"}
            alignItems={"center"}
            direction={{ base: "column", lg: "row" }}
          >
            <Stack w={"100%"} justifyContent={"center"} h={"100%"}>
              <Box h={"fit-content"} mx={{ base: "auto", lg: 0 }}>
                <Heading
                  as={"h1"}
                  fontSize={{ base: "heading1", "2xl": "64px" }}
                  textAlign={{ base: "center", xl: "left" }}
                  fontWeight={"semiBold"}
                  maxW={{ md: "80%" }}
                >
                  <Text as={"span"} color={"brand.primary.600"}>
                    Find. Train.
                  </Text>{" "}
                  <Text as={"span"} color={"brand.primary.600"}>
                    Engage
                  </Text>{" "}
                  your Teams
                </Heading>
                <Text
                  fontSize={{ base: "paragraph", md: "heading5" }}
                  maxW={{ base: "90%", md: "70%" }}
                  textAlign={{ base: "center", lg: "left" }}
                  mt={10}
                >
                  OnCulture powers people and culture through learning and
                  automation.
                </Text>
                <Box
                  w={"40%"}
                  my={{ base: 20, lg: 14 }}
                  mx={{ base: "auto", lg: 0 }}
                >
                  <CustomButton
                    onClick={() => navigate(`/${PageRoutes.bookDemo}`)}
                    w={"100%"}
                  >
                    Book a Demo
                  </CustomButton>
                </Box>
              </Box>
            </Stack>
            <Box w={"100%"} position={"relative"} h={"100%"}>
              <Box
                position={"relative"}
                right={{ md: "-120px" }}
                h={"100%"}
                boxShadow={" -10px 1px 50px 0px #1C2C401A"}
              >
                <Image src="/assets/images/hero-dashboard.png" />
              </Box>
              <Flex
                gap={5}
                position={"absolute"}
                bottom={{ base: "-50px", md: "-50px" }}
                left={{ base: "20px", md: "-50px" }}
                w={{ base: "90%", md: "100%" }}
              >
                <Image
                  src="/assets/images/dashboard-mood.png"
                  boxShadow={" -10px 1px 50px 0px #1C2C401A"}
                  w={"30%"}
                />
                <Image
                  src="/assets/images/dashboard-sumup.png"
                  boxShadow={" -10px 1px 50px 0px #1C2C401A"}
                  w={"30%"}
                />
              </Flex>
            </Box>
          </Stack>
        </Box>
      </ViewportContainer>
    </Flex>
  );
};

export default Hero;
