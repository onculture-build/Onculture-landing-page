import { Box, Card, Heading, Image, Stack, Text } from "@chakra-ui/react";
import CustomButton from "./custom-button";
import { useNavigate } from "react-router-dom";
import { AppUtilities } from "../app.utiilities";

interface CourseCardProps {
  icon: string;
  title: string;
  tag: string;
  description: string;
  slug: string;
  isReady: boolean;
}

const CourseCard = ({
  icon,
  title,
  tag,
  description,
  slug,
  isReady,
}: CourseCardProps) => {
  const navigate = useNavigate();
  return (
    <Card
      boxShadow={"rgba(100, 100, 111, 0.3) 0px 7px 10px 0px"}
      h={"100%"}
      px={6}
      py={14}
      minH={"300px"}
    >
      <Stack alignItems={"center"} gap={5} h={"100%"}>
        <Box>
          <Image src={icon} w={24} />
        </Box>
        <Heading as={"h5"} fontSize={"heading5"}>
          {AppUtilities.truncateChars(title, 25)}
        </Heading>
        <Box
          borderRadius={4}
          bgColor={"brand.primary.100"}
          color={"brand.primary.700"}
          fontSize={"small"}
          p={"0.2rem 0.8rem"}
          fontWeight={600}
        >
          {tag}
        </Box>
        <Text fontSize={"label"} textAlign={"center"} mb={10}>
          {AppUtilities.truncateChars(description, 120)}
        </Text>
        <CustomButton
          mt={"auto"}
          padding={"1.5rem 1rem"}
          onClick={() => navigate(`/courses/${slug}`)}
          disabled={!isReady}
        >
          {isReady ? "See details" : "Coming Soon"}
        </CustomButton>
      </Stack>
    </Card>
  );
};

export default CourseCard;
