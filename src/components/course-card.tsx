import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export type CourseCategory =
  | "Leadership"
  | "Teams & Performance"
  | "Culture & Engagement"
  | "Workplace Safety"
  | "Career & Communication";

export const CATEGORY_STYLES: Record<
  CourseCategory,
  { color: string; bg: string; border: string; art: string }
> = {
  Leadership: {
    color: "#5C00DD",
    bg: "#F7F2FD",
    border: "#D2B2FF",
    art: "linear-gradient(135deg, #4802AA 0%, #7C1FFF 100%)",
  },
  "Teams & Performance": {
    color: "#15803D",
    bg: "#F0FDF4",
    border: "#86EFAC",
    art: "linear-gradient(135deg, #0F766E 0%, #5EBFB3 100%)",
  },
  "Culture & Engagement": {
    color: "#C026D3",
    bg: "#FDF4FF",
    border: "#F0ABFC",
    art: "linear-gradient(135deg, #7E22CE 0%, #C084FC 100%)",
  },
  "Workplace Safety": {
    color: "#DC2626",
    bg: "#FEF2F2",
    border: "#FCA5A5",
    art: "linear-gradient(135deg, #B91C1C 0%, #F87171 100%)",
  },
  "Career & Communication": {
    color: "#EA580C",
    bg: "#FFF7ED",
    border: "#FDBA74",
    art: "linear-gradient(135deg, #C2410C 0%, #FB923C 100%)",
  },
};

interface CourseCardProps {
  title: string;
  summary: string;
  category: CourseCategory;
  type: "full" | "short";
  modules?: number | null;
  quizzes?: number | null;
  cardImage?: string | null;
  slug: string;
  isReady: boolean;
}

const plural = (count: number, one: string, many: string) =>
  `${count} ${count === 1 ? one : many}`;

const CourseCard = ({
  title,
  summary,
  category,
  type,
  modules,
  quizzes,
  cardImage,
  slug,
  isReady,
}: CourseCardProps) => {
  const navigate = useNavigate();
  const style = CATEGORY_STYLES[category];

  const meta =
    type === "full" && modules && quizzes
      ? `${plural(modules, "module", "modules")} · ${plural(quizzes, "quiz", "quizzes")}`
      : "Short course";

  return (
    <Flex
      as={isReady ? "button" : "article"}
      onClick={isReady ? () => navigate(`/courses/${slug}`) : undefined}
      direction="column"
      textAlign="left"
      h="100%"
      w="100%"
      bg="white"
      border="1px solid"
      borderColor="#E7E7EE"
      borderRadius="6px"
      overflow="hidden"
      transition="box-shadow 0.2s, border-color 0.2s"
      _hover={
        isReady
          ? {
              borderColor: "brand.primary.200",
              boxShadow: "0 8px 24px rgba(72, 2, 170, 0.08)",
            }
          : undefined
      }
    >
      <Box h="104px" w="100%" flexShrink={0} bg={style.art}>
        {cardImage && (
          <Image
            src={cardImage}
            alt=""
            w="100%"
            h="100%"
            objectFit="cover"
          />
        )}
      </Box>
      <Flex direction="column" flex={1} p="18px">
        <Box
          alignSelf="flex-start"
          fontSize="11px"
          lineHeight="16px"
          px="6px"
          borderRadius="3px"
          border="1px solid"
          borderColor={style.border}
          bg={style.bg}
          color={style.color}
          mb="12px"
        >
          {category}
        </Box>
        <Heading
          as="h3"
          fontSize="16px"
          fontWeight="semiBold"
          lineHeight="23px"
          color="#16161D"
          mb="12px"
        >
          {title}
        </Heading>
        <Text fontSize="13px" lineHeight="21px" color="#5F6170" mb="18px">
          {summary}
        </Text>
      </Flex>
      <Box
        borderTop="1px solid"
        borderColor="#EFEFF4"
        px="18px"
        py="14px"
        fontSize="12px"
        color="#5F6170"
      >
        {meta}
      </Box>
    </Flex>
  );
};

export default CourseCard;
