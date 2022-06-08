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
  Actionsheet,
  useDisclose,
} from "native-base";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { useDispatch, useSelector } from "react-redux";
import {
  removeTodoItem,
  selectTodoItems,
  setCurrentEditTodoItem,
} from "../redux/todoItemSlice";

const TodoItem = ({
  navigation,
  todoItem,
  todoItem: { title, notes, timeText, category, divide, done },
}) => {
  // States
  const todoItemsValue = useSelector(selectTodoItems);
  // Dispatch
  const dispatch = useDispatch();

  const { isOpen, onOpen, onClose } = useDisclose();

  // 處理點擊
  const onItemCheckPress = () => {
    // checkItemValue();
  };

  const onItemLongPress = () => {
    console.log("TAKOLONG");
    onOpen();
  };

  const onItemPress = () => {
    dispatch(setCurrentEditTodoItem(todoItem));
    navigation.navigate("NoteEditStack", {
      screen: "NoteEdit",
      params: todoItem,
    });
    console.log("takoshort");
  };

  // 暴力找出相同物件之 index
  const deleteItem = () => {
    const itemIndex = todoItemsValue.findIndex(
      (value) =>
        value.title == title &&
        value.timeText == timeText &&
        value.category == category &&
        value.divide == divide &&
        value.notes == notes
    );
    if (itemIndex == -1) {
      console.log("Error!! Can't find the item index to delete!!");
    } else {
      console.log("Delete One Todo Item");
      dispatch(removeTodoItem(itemIndex));
    }
  };

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
        onLongPress={() => onItemLongPress()}
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
            onItemCheckPress();
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
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content bgColor={colors.Background}>
          <Actionsheet.Item
            bgColor={colors.Background}
            onPress={() => deleteItem()}
            _text={{ fontSize: "md", color: colors.Black }}
          >
            刪除事項
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </Box>
  );
};

export default TodoItem;
