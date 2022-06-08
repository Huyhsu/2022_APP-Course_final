import { useState, useEffect } from "react";
import { Box, Text, FlatList, HStack, Center, Pressable } from "native-base";
import { useTheme } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { useSelector } from "react-redux";
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

  const thisWeekTime = getThisWeekData();

  const [thisWeekTodoItems, setThisWeekTodoItems] = useState([]);
  const [firstDayItemsCount, setFirstDayItemsCount] = useState(0);
  const [secondDayItemsCount, setSecondDayItemsCount] = useState(0);
  const [thirdDayItemsCount, setThirdDayItemsCount] = useState(0);
  const [fourthDayItemsCount, setFourthDayItemsCount] = useState(0);
  const [fifthDayItemsCount, setFifthDayItemsCount] = useState(0);
  const [sixthDayItemsCount, setSixthDayItemsCount] = useState(0);
  const [seventhDayItemsCount, setSeventhDayItemsCount] = useState(0);

  // 根據 todoItems 的變動來更新本週 todoItems => 換月有問題
  // useEffect(() => {
  //   const temp = todoItemsValue.filter((value) => {
  //     let compareTime = Number(thisWeekTime.weekStartTime.compareTime);
  //     for (let i = 0; i < 7; i++) {
  //       // console.log(compareTime);
  //       if (Number(value.compareTime) == compareTime) {
  //         compareTime += 1;
  //         return value;
  //       } else {
  //         compareTime += 1;
  //       }
  //     }
  //   });
  //   setThisWeekTodoItems([...temp]);
  // }, [todoItemsValue]);

  useEffect(() => {
    let one = 0;
    let two = 0;
    let three = 0;
    let four = 0;
    let five = 0;
    let six = 0;
    let seven = 0;
    const temp = todoItemsValue.filter((value) => {
      // 從第一天 (日) 比較到最後一天 (六)
      for (let i = 0; i < 7; i++) {
        if (value.compareTime == thisWeekTime.compareTimes[i]) {
          if (i == 0) {
            one++;
          } else if (i == 1) {
            two++;
          } else if (i == 2) {
            three++;
          } else if (i == 3) {
            four++;
          } else if (i == 4) {
            five++;
          } else if (i == 5) {
            six++;
          } else if (i == 6) {
            seven++;
          }
          return value;
        }
      }
    });
    setFirstDayItemsCount(one);
    setSecondDayItemsCount(two);
    setThirdDayItemsCount(three);
    setFourthDayItemsCount(four);
    setFifthDayItemsCount(five);
    setSixthDayItemsCount(six);
    setSeventhDayItemsCount(seven);
    setThisWeekTodoItems([...temp]);
  }, [todoItemsValue]);

  const weekData = [
    { x: "日", y: firstDayItemsCount },
    { x: "一", y: secondDayItemsCount },
    { x: "二", y: thirdDayItemsCount },
    { x: "三", y: fourthDayItemsCount },
    { x: "四", y: fifthDayItemsCount },
    { x: "五", y: sixthDayItemsCount },
    { x: "六", y: seventhDayItemsCount },
  ];

  let sortedTodoItems = [...thisWeekTodoItems];
  sortedTodoItems.sort((first, second) => {
    return first.compareTime - second.compareTime;
  });

  return (
    <GestureHandlerRootView
      flex={1}
      style={{ backgroundColor: colors.Background }}
    >
      <Box flex={1} bgColor={colors.White}>
        <Center pt={10}>
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
              axis: { stroke: "transparent" },
              ticks: { stroke: "transparent" },
            }}
            data={weekData}
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
          itemsData={sortedTodoItems}
          navigation={navigation}
          emptyText={"本週無待辦事項"}
        />
      </Box>
    </GestureHandlerRootView>
  );
};

export default WeekChartScreen;
