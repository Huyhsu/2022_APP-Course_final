import { Box, Text, FlatList, HStack, Image } from "native-base";
import { useTheme } from "@react-navigation/native";

const CalendarScreen = ({ navigation }) => {
  const { colors } = useTheme();
  return (
    <Box
      flex={1}
      bgColor={colors.Background}
      px={4}
      // px={10}
    >
      <Text> I am clendar screen </Text>
    </Box>
  );
};

export default CalendarScreen;
