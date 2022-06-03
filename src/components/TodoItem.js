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

import { useDispatch, useSelector } from "react-redux";

// import { LogBox } from "react-native";
// import { setEditItem, updateItem } from "../redux/actions";
// import {  } from "react-native-gesture-handler";

const TodoItem = () => {
  // State
  // const { itemList } = useSelector((state) => state.item);
  // const dispatch = useDispatch();

  // 處理點擊
  const handleClick = () => {
    // checkItemValue();
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
  // let tempTitle = title;
  // let tempTime = time.slice(5);

  const { colors } = useTheme();

  return (
    <Box
      h={88}
      pt={6}
      pl={6}
      pr={4}
      mt={2}
      bgColor={colors.White}
      borderRadius={5}
    >
      <Center w={"100%"}>
        <HStack
          w={"100%"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Pressable
            onPress={() => {
              // dispatch(setEditItem(item));
              // navigation.navigate("EditStack", {
              //   screen: "Edit",
              //   params: item,
              // });
            }}
            onLongPress={() => console.log("TAKOLONG")}
          >
            <HStack alignItems={"center"}>
              <MaterialIcons
                name="circle"
                size={24}
                color={
                  // divide == "high"
                  //   ? colors.high700
                  //   : divide == "medium"
                  //   ? colors.medium700
                  //   : colors.low700
                  colors.Low
                }
              />
              <VStack ml={6}>
                <Text color={colors.Primary900} fontSize={"lg"}>
                  {/* {tempTitle.length > 10
                    ? tempTitle.substring(0, 10) + "..."
                    : tempTitle} */}
                  行動程式設計期末作業
                </Text>
                <Text color={colors.Grey} fontSize={"sm"}>
                  {/* {tempTime} */}
                  2022 06/09 (四) 12:30
                </Text>
              </VStack>
            </HStack>
          </Pressable>

          <Pressable
            w={12}
            h={12}
            justifyContent={"center"}
            alignItems={"center"}
            // bgColor={"red.100"}
            onPress={() => {
              handleClick();
            }}
          >
            <MaterialIcons
              name="check-box-outline-blank"
              size={24}
              color={colors.Primary900}
            />

            {/* {done ? (
              colorMode == "light" ? (
                <Box>
                  <Image
                    source={require("../icon/icon_checkbox.png")}
                    alt={"checked_checkbox"}
                  />
                </Box>
              ) : (
                <>
                  <Image
                    source={require("../icon/icon_dark_checkbox.png")}
                    alt={"checked_checkbox"}
                  />
                </>
              )
            ) : colorMode == "light" ? (
              <>
                <Image
                  source={require("../icon/icon_checkbox_blank.png")}
                  alt={"blank_checkbox"}
                />
              </>
            ) : (
              <Box>
                <Image
                  source={require("../icon/icon_dark_checkbox_blank.png")}
                  alt={"blank_checkbox"}
                />
              </Box>
            )} */}
          </Pressable>
        </HStack>
      </Center>
    </Box>
  );
};

export default TodoItem;
