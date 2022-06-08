import { useState, useEffect } from "react";
import { useTheme } from "@react-navigation/native";
import { Box, Text, HStack, VStack, Center } from "native-base";
import { useSelector, useDispatch } from "react-redux";

import { getCurrentTime, getThisWeekData } from "../utils";
import {
  selectTodoItems,
  selectWeekTodoItemsCount,
} from "../redux/todoItemSlice";

const WeekInfoCard = () => {
  // State
  const todoItemsValue = useSelector(selectTodoItems);
  const weekTodoItemsCountValue = useSelector(selectWeekTodoItemsCount);

  // Time
  const [time, setTime] = useState({});
  let updateTime = {};

  const thisWeekTime = getThisWeekData();
  const [thisWeekTodoItemsCount, setThisWeekTodoItemsCount] = useState(0);
  useEffect(() => {
    let count = 0;
    const temp = todoItemsValue.filter((value) => {
      // 從第一天 (日) 比較到最後一天 (六)
      for (let i = 0; i < 7; i++) {
        if (value.compareTime == thisWeekTime.compareTimes[i]) {
          count++;
          return value;
        }
      }
    });
    setThisWeekTodoItemsCount(count);
  }, [todoItemsValue]);

  // 更新時間
  useEffect(() => {
    updateTime = getCurrentTime();
    setTime((time) => ({
      ...time,
      ...updateTime,
    }));
  }, []);

  const { colors } = useTheme();
  return (
    <Box bgColor={colors.White}>
      <Center flexDirection={"row"} pt={4} pb={2}>
        <VStack alignItems={"center"}>
          <Text color={colors.Primary900} fontSize={"md"}>
            {time.year} {time.month}
          </Text>
          <Text color={colors.Primary900} fontSize={"5xl"}>
            {time.date}
          </Text>
        </VStack>
        <HStack
          w={"60%"}
          px={4}
          pb={3}
          alignSelf={"flex-end"}
          justifyContent={"space-between"}
        >
          <Text color={colors.Primary900} fontSize={"md"}>
            {time.day}
          </Text>
          {thisWeekTodoItemsCount == 0 ? (
            <Text color={colors.Primary900} fontSize={"md"}>
              本週待辦: 無
            </Text>
          ) : (
            <Text color={colors.Primary900} fontSize={"md"}>
              本週待辦: {thisWeekTodoItemsCount}
            </Text>
          )}
        </HStack>
      </Center>
    </Box>
  );
};

export default WeekInfoCard;
