import { useState } from "react";
import { useTheme } from "@react-navigation/native";
import {
  Box,
  Center,
  Image,
  HStack,
  VStack,
  Text,
  Pressable,
  useColorMode,
} from "native-base";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { useDispatch } from "react-redux";
import { setCurrentEditTodoItem } from "../redux/todoItemSlice";

const TodoItem = ({
  navigation,
  todoItem,
  todoItem: { title, timeText, divide, done },
}) => {
  // States

  // Dispatch
  const dispatch = useDispatch();

  // 處理點擊
  const handleClick = () => {
    // checkItemValue();
  };

  const onItemPress = () => {
    dispatch(setCurrentEditTodoItem(todoItem));
    navigation.navigate("NoteEditStack", {
      screen: "NoteEdit",
      params: todoItem,
    });
    console.log("takoshort");
  };

  // 暴力找出相同物件之 index, 並呼叫 updateItem
  // const checkItemValue = () => {
  //   const itemIndex = itemList.items.findIndex(
  //     (value) =>
  //       value.title == item.title &&
  //       value.time == item.time &&
  //       value.category == item.category &&
  //       value.divide == item.divide &&
  //       value.note == item.note
  //   );
  //   if (itemIndex == -1) {
  //     console.log("Error!! Can't find the item to update!!");
  //   }
  //   const updatedItem = { ...item, done: !item.done };
  //   dispatch(updateItem(updatedItem, itemIndex));
  // };

  // 處理過長標題
  let tempTitle = title;
  let tempTime = timeText.slice(5);

  const { colors } = useTheme();

  return (
    <Box
      h={88}
      mt={2}
      bgColor={colors.White}
      borderRadius={4}
      justifyContent={"center"}
    >
      <Pressable
        pl={6}
        pr={4}
        h={"100%"}
        w={"100%"}
        onPress={() => onItemPress()}
        onLongPress={() => console.log("TAKOLONG")}
        flexDir={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <HStack alignItems={"center"} maxW={"80%"}>
          <MaterialIcons
            name="circle"
            size={24}
            color={
              divide == "high"
                ? colors.High
                : divide == "medium"
                ? colors.Medium
                : colors.Low
            }
          />
          <VStack ml={6} pt={1}>
            <Text color={colors.Primary900} fontSize={"lg"}>
              {tempTitle.length > 10
                ? tempTitle.substring(0, 10) + "..."
                : tempTitle}
            </Text>
            <Text color={colors.Grey} fontSize={"sm"}>
              {tempTime}
              {/* 2022 06/09 (四) 12:30 */}
            </Text>
          </VStack>
        </HStack>
        <Pressable
          w={12}
          h={12}
          justifyContent={"center"}
          alignItems={"center"}
          onPress={() => {
            handleClick();
            console.log("Check !");
          }}
        >
          <MaterialIcons
            name="check-box-outline-blank"
            size={24}
            color={colors.Primary900}
          />
        </Pressable>
      </Pressable>
    </Box>
  );
};

export default TodoItem;
