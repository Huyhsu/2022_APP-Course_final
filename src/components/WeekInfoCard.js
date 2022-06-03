import { useState, useEffect } from "react";
import { useTheme } from "@react-navigation/native";
import { Box, Text, HStack, VStack, Center } from "native-base";
import { useSelector } from "react-redux";

import { getCurrentTime } from "../utils";

const WeekInfoCard = () => {
  // State
  // const { itemList } = useSelector((state) => state.item);

  // Time
  const [time, setTime] = useState({});
  let updateTime = {};

  // Check Today Todo
  // const [todayTodo, setTodayTodo] = useState(0);

  // 時間跟今天一樣 且 尚未完成
  // const checkTodayTodo = () => {
  //   let todayItems = itemList.items.filter(
  //     (value) =>
  //       value.compareTime == time.year + time.month + time.date && !value.done
  //   );
  //   setTodayTodo(todayItems.length);
  // };

  // 更新時間
  useEffect(() => {
    updateTime = getCurrentTime();
    setTime((time) => ({
      ...time,
      ...updateTime,
    }));
  }, []);
  // useEffect(() => {
  //   checkTodayTodo();
  // }, [itemList]);
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

          <Text color={colors.Primary900} fontSize={"md"}>
            本週待辦: 無
          </Text>

          {/* {todayTodo == 0 ? (
            <Text _light={{ color: colors.Primary900 }} fontSize={"md"}>
              本週待辦: 無
            </Text>
          ) : (
            <Text _light={{ color: colors.Primary900 }} fontSize={"md"}>
              今日待辦: {todayTodo}
            </Text>
          )} */}
        </HStack>
      </Center>
    </Box>
  );
};

export default WeekInfoCard;
