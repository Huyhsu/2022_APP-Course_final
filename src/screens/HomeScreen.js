import { Box, Text } from "native-base";
import { useTheme } from "@react-navigation/native";

import TodoItem from "../components/TodoItem";

const HomeScreen = ({ Navigation }) => {
  const { colors } = useTheme();
  return (
    <Box
      flex={1}
      bgColor={colors.Background}
      // px={4}
      px={10}
    >
      <TodoItem />
      <TodoItem />
      <TodoItem />
    </Box>
  );
};

export default HomeScreen;
