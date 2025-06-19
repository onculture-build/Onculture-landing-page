import { Box, List, ListIcon, ListItem, Text } from "@chakra-ui/react";
import { FaCircle } from "react-icons/fa6";

interface CourseListSectionProps {
  title: string;
  items: string[];
}

const CourseListSection = ({ title, items }: CourseListSectionProps) => {
  return (
    <Box mb={12}>
      <Text fontWeight="bold" fontSize={"paragraph"} mb={4}>
        {title}
      </Text>
      <List spacing={3} mb={4}>
        {items.map((item, idx) => (
          <ListItem key={idx} display="flex" alignItems="center">
            <ListIcon
              as={FaCircle}
              color="rgba(92, 0, 221, 1)"
              boxSize={"12px"}
              mr={"24px"}
            />
            {item}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default CourseListSection;
