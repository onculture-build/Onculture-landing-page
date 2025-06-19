import CourseList from "../../lib/db/courses.json";
import {
  Box,
  Card,
  Flex,
  Grid,
  GridItem,
  Heading,
  Stack,
  Text,
  Image,
} from "@chakra-ui/react";
import ViewportContainer from "../../layouts/container";
import CourseCard from "../../components/course-card";

const CoursesPage = () => {
  return (
    <Box className="all-courses">
      <ViewportContainer>
        <Box mt={40} mb={"20vh"} p={8} px={{ base: "2rem", lg: "0" }}>
          <Stack alignItems={"center"} gap={10}>
            <Heading as={"h2"} fontSize={"heading2"}>
              Courses
            </Heading>
            <Text textAlign={"center"} w={"70%"} fontSize={"paragraph"}>
              Explore our interactive courses designed to foster a healthy,
              productive, and value-driven workplace culture.
            </Text>
          </Stack>
          <Grid
            templateColumns={{
              base: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            }}
            justifyContent={"center"}
            alignItems={"center"}
            w={{ base: "100%", lg: "80%" }}
            mx={"auto"}
            gap={32}
            mt={20}
            h={"100%"}
          >
            {CourseList?.map((course) => (
              <GridItem key={course?.slug} h={"100%"}>
                <CourseCard
                  icon={course?.icon}
                  title={course?.title}
                  tag={course?.tag}
                  description={course?.description}
                  slug={course?.slug}
                  isReady={course?.isReady}
                />
              </GridItem>
            ))}
          </Grid>
        </Box>
      </ViewportContainer>
    </Box>
  );
};

export default CoursesPage;
