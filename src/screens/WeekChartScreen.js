import { useCallback, useRef, useMemo } from "react";
import { Box, Text, FlatList, HStack, Center, Pressable } from "native-base";
import { useTheme } from "@react-navigation/native";
import { getThisWeekData } from "../utils";
import MyBottomSheet from "../components/MyBottomSheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import MyCalendar from "../components/MyCalendar";

const WeekChartScreen = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <GestureHandlerRootView flex={1}>
      <Box flex={1} bgColor={colors.Background}>
        <MyCalendar />
        <Text>123</Text>
        <Text>123</Text>
        <Text>123</Text>
        <Text>123</Text>
        <Text>123</Text>
        <Text>123</Text>
        <Text>123</Text>
        <Text>123</Text>
        <Text>123</Text>
        <MyBottomSheet />
      </Box>
    </GestureHandlerRootView>
  );
};

export default WeekChartScreen;
