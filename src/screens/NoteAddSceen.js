import { useState, useEffect } from "react";
import { Box, Text, Pressable, Center } from "native-base";
import { useTheme } from "@react-navigation/native";

import {
  InputWithTitle,
  InputWithDateTimePicker,
  TextAreaWithNotes,
  InputOptionWithCategory,
  RadioWithDivide,
  ConfirmButton,
} from "../utils";

import { useDispatch, useSelector } from "react-redux";
import { addTodoItem, selectCategorys } from "../redux/todoItemSlice";

const NoteAddScreen = ({ Navigation }) => {
  // State
  const categorys = useSelector(selectCategorys);
  // Dispatch
  const dispatch = useDispatch();
  // compare time
  const timePattern = /\//g;
  // Title
  const [title, setTitle] = useState("");
  // Notes
  const [notes, setNotes] = useState("");
  // Time
  const [timeText, setTimeText] = useState("");
  // Category
  const [category, setCategory] = useState("");
  // Divide
  const [divide, setDivide] = useState("low");
  // New Todo Item Category
  const [newCategory, setNewCategory] = useState("");

  // 確認輸入
  const checkInputValues = () => {
    createTodoItem();
  };
  // 建立 Todo Item
  const createTodoItem = () => {
    let newItem = {
      title: title,
      notes: notes,
      time: timeText,
      category: category,
      divide: divide,
      done: false,
      compareTime: timeText.replace(timePattern, "").slice(0, 8),
      selectTime: timeText.replace(timePattern, "-").slice(0, 10),
    };
    dispatch(addTodoItem(newItem));
  };

  // color
  const { colors } = useTheme();

  return (
    <Box flex={1} bgColor={colors.Background} p={10}>
      <InputWithTitle title={title} setTitle={setTitle} />
      <TextAreaWithNotes notes={notes} setNotes={setNotes} />
      <InputWithDateTimePicker timeText={timeText} setTimeText={setTimeText} />
      <InputOptionWithCategory
        category={category}
        setCategory={setCategory}
        newCategory={newCategory}
        setNewCategory={setNewCategory}
      />
      <RadioWithDivide divie={divide} setDivide={setDivide} />
      <ConfirmButton buttonText={"新增"} onConfirmPress={checkInputValues} />
      {/* <Pressable
        w={"60%"}
        onPress={() => {
          checkInputValues();
        }}
      >
        {({ isHovered, isFocused, isPressed }) => (
          <Center
            h={12}
            mt={8}
            mb={24}
            shadow={1}
            rounded={5}
            bgColor={
              isPressed
                ? colors.Background
                : isHovered
                ? colors.White
                : colors.White
            }
          >
            <Text color={colors.Black} fontSize={"md"}>
              新增
            </Text>
          </Center>
        )}
      </Pressable> */}
    </Box>
  );
};

export default NoteAddScreen;
