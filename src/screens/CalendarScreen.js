import { useState } from "react";
import { Box, Text, FlatList, HStack, Center, Pressable } from "native-base";
import { useTheme } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import MyCalendar from "../components/MyCalendar";
import MyBottomSheet from "../components/MyBottomSheet";

const CalendarScreen = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <GestureHandlerRootView
      flex={1}
      style={{ backgroundColor: colors.Background }}
    >
      <Box flex={1} bgColor={colors.Background} p={4}>
        <MyCalendar />
        <MyBottomSheet />
      </Box>
    </GestureHandlerRootView>
  );
};

export default CalendarScreen;
