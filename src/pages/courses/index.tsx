import { useMemo, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import CourseList from "../../lib/db/courses.json";
import CourseCard, { CourseCategory } from "../../components/course-card";
import { PageRoutes } from "../../lib/constants";

type LengthFilter = "all" | "full" | "short";

const CATEGORIES: CourseCategory[] = [
  "Leadership",
  "Teams & Performance",
  "Culture & Engagement",
  "Workplace Safety",
  "Career & Communication",
];

const LENGTH_OPTIONS: { label: string; value: LengthFilter }[] = [
  { label: "All lengths", value: "all" },
  { label: "Full courses", value: "full" },
  { label: "Short courses", value: "short" },
];

const courses = CourseList.map((course) => ({
  ...course,
  category: course.category as CourseCategory,
  type: course.type as "full" | "short",
}));

const PageSection = ({ children }: { children: React.ReactNode }) => (
  <Box w="100%" maxW="1232px" mx="auto" px={{ base: "16px", md: "24px" }}>
    {children}
  </Box>
);

const CountBadge = ({ count, active }: { count: number; active: boolean }) => (
  <Box
    as="span"
    ml="8px"
    px="6px"
    borderRadius="999px"
    fontSize="11px"
    lineHeight="18px"
    bg={active ? "rgba(255, 255, 255, 0.2)" : "#F2F2F6"}
    color={active ? "white" : "#5F6170"}
  >
    {count}
  </Box>
);

const TopicChip = ({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) => (
  <Button
    onClick={onClick}
    h="36px"
    px="14px"
    fontSize="13px"
    fontWeight="regular"
    borderRadius="4px"
    border="1px solid"
    borderColor={active ? "brand.primary.600" : "#E2E2EA"}
    bg={active ? "brand.primary.600" : "white"}
    color={active ? "white" : "#2B2B36"}
    _hover={{ borderColor: "brand.primary.600" }}
    _active={{}}
    aria-pressed={active}
  >
    {label}
    <CountBadge count={count} active={active} />
  </Button>
);

const CoursesPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [length, setLength] = useState<LengthFilter>("all");
  const [topic, setTopic] = useState<CourseCategory | "all">("all");

  // Courses matching search + length; topic counts are derived from this set
  const baseMatches = useMemo(() => {
    const query = search.trim().toLowerCase();
    return courses.filter((course) => {
      if (length !== "all" && course.type !== length) return false;
      if (!query) return true;
      return [course.title, course.summary, course.category].some((field) =>
        field.toLowerCase().includes(query)
      );
    });
  }, [search, length]);

  const visibleCourses =
    topic === "all"
      ? baseMatches
      : baseMatches.filter((course) => course.category === topic);

  const countFor = (category: CourseCategory) =>
    baseMatches.filter((course) => course.category === category).length;

  const resetFilters = () => {
    setSearch("");
    setLength("all");
    setTopic("all");
  };

  return (
    <Box w="100%">
      {/* Hero */}
      <Box bg="brand.primary.50" py={{ base: "48px", md: "64px" }}>
        <PageSection>
          <Text
            fontSize="13px"
            fontWeight="semiBold"
            letterSpacing="0.06em"
            textTransform="uppercase"
            color="brand.primary.600"
            mb="16px"
          >
            Course library
          </Text>
          <Heading
            as="h1"
            fontSize={{ base: "32px", md: "44px" }}
            lineHeight={1.15}
            fontWeight="bold"
            letterSpacing="-0.02em"
            color="#16161D"
            maxW="720px"
            mb="20px"
          >
            Courses that build healthier, more productive workplaces
          </Heading>
          <Text
            fontSize={{ base: "16px", md: "17px" }}
            lineHeight="29px"
            color="#4B4D5A"
            maxW="640px"
          >
            Interactive courses on leadership, culture, teamwork and workplace
            safety. Short lessons your people can finish in one sitting, and
            full courses with modules and quizzes.
          </Text>
        </PageSection>
      </Box>

      {/* Filters */}
      <Box borderBottom="1px solid" borderColor="#EFEFF4" py="24px">
        <PageSection>
          <Flex gap="12px" wrap="wrap" mb="16px">
            <InputGroup w={{ base: "100%", md: "480px" }} size="lg">
              <InputLeftElement h="44px" pointerEvents="none" color="#8A8C99">
                <FiSearch size={15} />
              </InputLeftElement>
              <Input
                h="44px"
                fontSize="14px"
                borderRadius="4px"
                borderColor="#E2E2EA"
                placeholder="Search courses, e.g. leadership, harassment"
                _placeholder={{ color: "#8A8C99" }}
                focusBorderColor="brand.primary.600"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search courses"
              />
            </InputGroup>
            <Flex
              role="group"
              aria-label="Course length"
              bg="#F2F2F6"
              borderRadius="4px"
              p="4px"
              gap="2px"
              h="44px"
            >
              {LENGTH_OPTIONS.map((option) => {
                const active = length === option.value;
                return (
                  <Button
                    key={option.value}
                    onClick={() => setLength(option.value)}
                    h="36px"
                    px="14px"
                    fontSize="14px"
                    fontWeight="regular"
                    borderRadius="3px"
                    bg={active ? "white" : "transparent"}
                    color={active ? "#16161D" : "#4B4D5A"}
                    boxShadow={active ? "0 1px 2px rgba(0, 0, 0, 0.08)" : "none"}
                    _hover={{ color: "#16161D" }}
                    _active={{}}
                    aria-pressed={active}
                  >
                    {option.label}
                  </Button>
                );
              })}
            </Flex>
          </Flex>
          <Flex gap="8px" wrap="wrap">
            <TopicChip
              label="All topics"
              count={baseMatches.length}
              active={topic === "all"}
              onClick={() => setTopic("all")}
            />
            {CATEGORIES.map((category) => (
              <TopicChip
                key={category}
                label={category}
                count={countFor(category)}
                active={topic === category}
                onClick={() => setTopic(category)}
              />
            ))}
          </Flex>
        </PageSection>
      </Box>

      {/* Catalogue */}
      <Box pt="28px" pb={{ base: "64px", md: "72px" }}>
        <PageSection>
          <Text fontSize="14px" color="#5F6170" mb="20px">
            {visibleCourses.length === courses.length
              ? `Showing all ${courses.length} courses`
              : `Showing ${visibleCourses.length} of ${courses.length} courses`}
          </Text>
          {visibleCourses.length ? (
            <Grid
              templateColumns={{
                base: "1fr",
                sm: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
                xl: "repeat(4, 1fr)",
              }}
              gap="24px"
            >
              {visibleCourses.map((course) => (
                <CourseCard
                  key={course.slug}
                  title={course.title}
                  summary={course.summary}
                  category={course.category}
                  type={course.type}
                  modules={course.modules}
                  quizzes={course.quizzes}
                  cardImage={course.cardImage}
                  slug={course.slug}
                  isReady={course.isReady}
                />
              ))}
            </Grid>
          ) : (
            <Flex
              direction="column"
              align="center"
              textAlign="center"
              py="64px"
              border="1px dashed"
              borderColor="#E2E2EA"
              borderRadius="6px"
            >
              <Text fontSize="16px" fontWeight="semiBold" mb="6px">
                No courses match your filters
              </Text>
              <Text fontSize="14px" color="#5F6170" mb="16px">
                Try a different search term or topic.
              </Text>
              <Button
                variant="link"
                fontSize="14px"
                color="brand.primary.600"
                onClick={resetFilters}
              >
                Clear filters
              </Button>
            </Flex>
          )}
        </PageSection>
      </Box>

      {/* CTA */}
      <Box bg="brand.primary.700" py={{ base: "48px", md: "56px" }}>
        <PageSection>
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
                Bring these courses to your team
              </Heading>
              <Text fontSize="16px" lineHeight="26px" color="whiteAlpha.900">
                Assign courses, track who has completed them and see quiz
                results, all inside OnCulture.
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
        </PageSection>
      </Box>
    </Box>
  );
};

export default CoursesPage;
