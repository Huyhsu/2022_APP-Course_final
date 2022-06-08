import { useState } from "react";
import { Box, Text, FlatList, HStack, Center, Pressable } from "native-base";
import { useTheme } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { useDispatch, useSelector } from "react-redux";
import {
  selectSelectedTodoItemsInCalendar,
  selectTodoItems,
  setCalendarSelectedTodoItems,
} from "../redux/todoItemSlice";
// Calendar
import MyCalendar from "../components/MyCalendar";
// Bottom Sheet
import MyBottomSheet from "../components/MyBottomSheet";

const CalendarScreen = ({ navigation }) => {
  const selectedTodoItemsInCalendarValue = useSelector(
    selectSelectedTodoItemsInCalendar
  );
  // Dispatch
  const dispatch = useDispatch();

  const { colors } = useTheme();
  return (
    <GestureHandlerRootView
      flex={1}
      style={{ backgroundColor: colors.Background }}
    >
      <Box flex={1} bgColor={colors.Background} p={4}>
        <MyCalendar />
        <MyBottomSheet
          itemsData={selectedTodoItemsInCalendarValue}
          navigation={navigation}
          emptyText={"當日無待辦事項"}
        />
      </Box>
    </GestureHandlerRootView>
  );
};

export default CalendarScreen;
