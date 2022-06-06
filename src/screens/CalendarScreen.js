import { Box, Text, FlatList, HStack, Image } from "native-base";
import { useTheme } from "@react-navigation/native";

import MyCalendar from "../components/MyCalendar";

const CalendarScreen = ({ navigation }) => {
  const { colors } = useTheme();
  return (
    <Box
      flex={1}
      bgColor={colors.Background}
      px={4}
      // px={10}
    >
      <MyCalendar />
      <Text>I am calendar screen</Text>
    </Box>
  );
};

export default CalendarScreen;
