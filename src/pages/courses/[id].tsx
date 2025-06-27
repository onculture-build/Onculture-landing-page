import { Box, Flex, Heading, Image, Text, AspectRatio } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import CourseData from "../../lib/db/courses.json";
import { FaChevronLeft } from "react-icons/fa6";
import ViewportContainer from "../../layouts/container";
import ErrorPage from "../ErrorPage";
import CustomButton from "../../components/custom-button";
import CourseListSection from "../../components/course-list-section";

const CourseInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const courseInfo = CourseData?.find((course) => course?.slug === id);

  if (!courseInfo) {
    return <ErrorPage errorTitle="Cannot find requested course" />;
  }

  return (
    <Box className="page">
      <Box position="relative" w="100%" maxH="482px" mb={12}>
        <Image
          src={courseInfo.coverImage}
          alt={courseInfo.title}
          objectFit="cover"
          objectPosition={
            courseInfo.id === "course-001" ? "center" : "top center"
          }
          w="100%"
          h={{ base: "320px", md: "482px" }}
        />
        <Box
          position="absolute"
          top={0}
          left={0}
          w="100%"
          h="100%"
          bg="rgba(0, 0, 0, 0.6)"
          zIndex={2}
        />
        <Flex
          position="absolute"
          top="50%"
          left={{ base: 6, md: "8rem" }}
          transform="translateY(-50%)"
          zIndex={3}
          direction="column"
          justify="center"
          align="flex-start"
          h="auto"
          maxW={{ base: "100%", md: "50%" }}
        >
          <CustomButton
            variant="ghost"
            color="white"
            _hover={{ color: "purple.300" }}
            leftIcon={<FaChevronLeft />}
            onClick={() => navigate(-1)}
          >
            Back
          </CustomButton>
          <Heading
            as="h1"
            color="white"
            fontSize={{ base: "heading2", md: "6.5rem" }}
          >
            {courseInfo.title}
          </Heading>
          <Text color="whiteAlpha.900" fontSize={"paragraph"}>
            {courseInfo.description}
          </Text>
        </Flex>
      </Box>
      <ViewportContainer>
        <Box padding={{ base: 6, md: "2rem 6rem" }}>
          {courseInfo?.intro?.length && (
            <Box mb={12}>
              {courseInfo?.intro?.map((introText, idx) => (
                <Text
                  key={idx}
                  fontWeight={idx === 0 ? "bold" : "normal"}
                  fontSize={"paragraph"}
                  mb={idx < (courseInfo?.intro?.length ?? 0) - 1 ? 2 : 0}
                >
                  {introText}
                </Text>
              ))}
            </Box>
          )}
          <CourseListSection
            title="In this interactive course, Employees will learn to:"
            items={courseInfo?.learningOutcomes ?? []}
          />
          <Box my={16}>
            {courseInfo?.videoUrl ? (
              <AspectRatio ratio={16 / 9} maxW="847px" mx="auto">
                <iframe
                  title="Course Video"
                  src={courseInfo?.videoUrl}
                  allowFullScreen
                />
              </AspectRatio>
            ) : (
              <Flex
                maxW="847px"
                mx="auto"
                h={{ base: "200px", md: "531px" }}
                position="relative"
                overflow="hidden"
              >
                <Image
                  src={courseInfo?.thumbnail}
                  alt="Course thumbnail"
                  objectFit="cover"
                  w="100%"
                  h="100%"
                />
                <CustomButton
                  position="absolute"
                  left="50%"
                  top="50%"
                  transform="translate(-50%, -50%)"
                  zIndex={2}
                  variant="ghost"
                  _hover={{ background: "none" }}
                  onClick={() => {}}
                >
                  <img
                    src="/assets/svg/play-button.svg"
                    alt="Play"
                    width={60}
                    height={60}
                  />
                </CustomButton>
              </Flex>
            )}
          </Box>

          <CourseListSection
            title="Through:"
            items={courseInfo?.through ?? []}
          />
          <CourseListSection
            title="What you will stand to gain:"
            items={courseInfo?.benefits ?? []}
          />
        </Box>
      </ViewportContainer>
    </Box>
  );
};

export default CourseInfo;
