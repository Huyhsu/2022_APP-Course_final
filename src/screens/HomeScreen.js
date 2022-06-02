import { Box, Text } from "native-base";
import { useTheme } from "@react-navigation/native";

const HomeScreen = ({ Navigation }) => {
  const { colors } = useTheme();
  return (
    <Box flex={1} bgColor={colors.Background}>
      <Text>Hello World 123</Text>
    </Box>
  );
};

export default HomeScreen;
