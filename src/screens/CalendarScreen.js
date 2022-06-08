import { Box } from "native-base";
import { useTheme } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { useSelector } from "react-redux";
import { selectSelectedTodoItemsInCalendar } from "../redux/todoItemSlice";

// Calendar
import MyCalendar from "../components/MyCalendar";
// Bottom Sheet
import MyBottomSheet from "../components/MyBottomSheet";

const CalendarScreen = ({ navigation }) => {
  // State
  const selectedTodoItemsInCalendarValue = useSelector(
    selectSelectedTodoItemsInCalendar
  );

  const { colors } = useTheme();
  return (
    <GestureHandlerRootView
      flex={1}
      style={{ backgroundColor: colors.Background }}
    >
      <Box flex={1} bgColor={colors.White} p={4}>
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
