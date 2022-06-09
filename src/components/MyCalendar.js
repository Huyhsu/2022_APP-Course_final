import { useEffect, useState } from "react";
import { useTheme } from "@react-navigation/native";
import { useColorMode, Box } from "native-base";
import { Calendar, LocaleConfig } from "react-native-calendars";

import { useDispatch, useSelector } from "react-redux";
import {
  selectTodoItems,
  setCalendarSelectedTodoItems,
} from "../redux/todoItemSlice";

// Calendar Config
LocaleConfig.locales["fr"] = {
  monthNames: [
    "一月",
    "二月",
    "三月",
    "四月",
    "五月",
    "六月",
    "七月",
    "八月",
    "九月",
    "十月",
    "十一月",
    "十二月",
  ],
  monthNamesShort: [
    "一月",
    "二月",
    "三月",
    "四月",
    "五月",
    "六月",
    "七月",
    "八月",
    "九月",
    "十月",
    "十一月",
    "十二月",
  ],
  dayNames: ["週日", "週一", "週二", "週三", "週四", "週五", "週六"],
  dayNamesShort: ["日", "一", "二", "三", "四", "五", "六"],
  today: "今天",
};
LocaleConfig.defaultLocale = "fr";

const MyCalendar = () => {
  // State
  const todoItemsValue = useSelector(selectTodoItems);
  // Dispatch
  const dispatch = useDispatch();

  const { colors } = useTheme();
  const { colorMode } = useColorMode();
  const [{ key, theme }, setTheme] = useState({
    key: "light",
    theme: {
      calendarBackground: colors.White,
      dayTextColor: colors.Black,
      monthTextColor: colors.Black,
      arrowColor: colors.Primary900,
    },
  });
  useEffect(() => {
    colorMode == "light"
      ? setTheme({
          key: "light",
          theme: {
            calendarBackground: colors.White,
            dayTextColor: colors.Black,
            monthTextColor: colors.Black,
            arrowColor: colors.Primary900,
          },
        })
      : setTheme({
          key: "dark",
          theme: {
            calendarBackground: colors.White,
            dayTextColor: colors.Primary900,
            monthTextColor: colors.Primary900,
            arrowColor: colors.Primary900,
          },
        });
  }, [colorMode]);
  // color key
  const high = { key: "high", color: colors.High };
  const medium = {
    key: "medium",
    color: colors.Medium,
  };
  const low = { key: "low", color: colors.Low };
  const primary = { key: "primary", color: colors.Primary900 };
  // 點擊的日期
  const [pointedDate, setPointedDate] = useState({});
  // 儲存當前點擊的日期
  const [stayPointedDate, setStayPointedDate] = useState("");

  const getPointedDate = (date) => {
    let tempPointDate = {};
    tempPointDate[date] = {
      selected: true,
      selectedColor: colors.Primary500,
      selectedTextColor: colors.Black,
    };
    setStayPointedDate(date);
    // 標記當前點擊的日期
    setPointedDate(tempPointDate);
  };

  useEffect(() => {
    let tempPointDate = {};
    tempPointDate[stayPointedDate] = {
      selected: true,
      selectedColor: colors.Primary500,
      selectedTextColor: colors.Black,
    };
    // 標記當前點擊的日期，為了更新 dark mode 顏色，否則在切換 color mode 時會有沒更新到顏色的問題
    setPointedDate(tempPointDate);
    // 更新對應日期的事項
    dispatch(setCalendarSelectedTodoItems(stayPointedDate));
  }, [todoItemsValue, colorMode]);

  const [allMarkedDates, setAllMarkDates] = useState({});

  useEffect(() => {
    let tempMarkedDates = {};
    todoItemsValue.map((value) => {
      tempMarkedDates[value.selectTime] = {
        dots: [
          primary,
          // value.divide == "low"
          //   ? low
          //   : value.divide == "medium"
          //   ? medium
          //   : high,
        ],
      };
    });
    setAllMarkDates(tempMarkedDates);
  }, [todoItemsValue, colorMode]);

  return (
    <Box>
      <Calendar
        markingType={"multi-dot"}
        markedDates={{ ...allMarkedDates, ...pointedDate }}
        minDate={"2022-06-01"}
        onDayPress={(day) => {
          // console.log("selected day", day.dateString);
          dispatch(setCalendarSelectedTodoItems(day.dateString));
          getPointedDate(day.dateString);
          // console.log(allMarkedDates);
        }}
        enableSwipeMonths
        key={key}
        theme={{ ...theme, dotStyle: { width: 8, height: 8, borderRadius: 8 } }}
      />
    </Box>
  );
};

export default MyCalendar;
