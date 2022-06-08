import { useState, useEffect } from "react";
import { Box, Text, FlatList, HStack, Center, Pressable } from "native-base";
import { useTheme } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { useDispatch, useSelector } from "react-redux";
import { selectTodoItems } from "../redux/todoItemSlice";

import { getThisWeekData } from "../utils";
import MyBottomSheet from "../components/MyBottomSheet";

import {
  VictoryChart,
  VictoryBar,
  VictoryAxis,
  VictoryTheme,
} from "victory-native";

const WeekChartScreen = ({ navigation }) => {
  // States
  const todoItemsValue = useSelector(selectTodoItems);
  // color
  const { colors } = useTheme();

  const testData = [
    { x: "日", y: 2 },
    { x: "一", y: 1 },
    { x: "二", y: 2 },
    { x: "三", y: 2 },
    { x: "四", y: 1 },
    { x: "五", y: 3 },
    { x: "六", y: 2 },
  ];

  const thisWeekTime = getThisWeekData();

  const [thisWeekTodoItems, setThisWeekTodoItems] = useState([]);

  // 根據 todoItems 的變動來更新本週 todoItems
  // compareTime = 20220605
  useEffect(() => {
    const temp = todoItemsValue.filter((value) => {
      let compareTime = Number(thisWeekTime.weekStartTime.compareTime);
      for (let i = 0; i < 7; i++) {
        // console.log(compareTime);
        if (Number(value.compareTime) == compareTime) {
          compareTime += 1;
          return value;
        } else {
          compareTime += 1;
        }
      }
    });
    setThisWeekTodoItems([...temp]);
  }, [todoItemsValue]);

  return (
    <GestureHandlerRootView
      flex={1}
      style={{ backgroundColor: colors.Background }}
    >
      <Box flex={1} bgColor={colors.Background}>
        <Center pt={4}>
          <Text fontSize={"sm"}>
            {thisWeekTime.weekStartTime.monthAndDate} -{" "}
            {thisWeekTime.weekEndTime.monthAndDate}
          </Text>
        </Center>
        <VictoryChart domainPadding={{ x: 20 }}>
          <VictoryBar
            style={{
              data: { fill: colors.High, stroke: colors.Black },
              labels: { fill: colors.Black },
              stroke: "teal",
              axis: { stroke: "transparent" },
              ticks: { stroke: "transparent" },
            }}
            data={testData}
            labels={({ datum }) => `${datum.y}`}
          />
          <VictoryAxis
            style={{
              axis: { stroke: colors.Black },
              tickLabels: { fill: colors.Black },
              // tickFormat={({ datum }) => datum.y.toFixed(2)}
            }}
          />
        </VictoryChart>
        <MyBottomSheet
          itemsData={thisWeekTodoItems}
          navigation={navigation}
          emptyText={"本週無待辦事項"}
        />
      </Box>
    </GestureHandlerRootView>
  );
};

export default WeekChartScreen;
