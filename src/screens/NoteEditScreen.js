import { useState, useEffect } from "react";
import { Box, Text, Pressable, Center, HStack } from "native-base";
import { useTheme } from "@react-navigation/native";

import {
  InputWithTitle,
  InputWithDateTimePicker,
  TextAreaWithNotes,
  InputOptionWithCategory,
  RadioWithDivide,
  ConfirmButton,
  CancelButton,
} from "../utils";

import { useDispatch, useSelector } from "react-redux";
import { addTodoItem, selectCategorys } from "../redux/todoItemSlice";

const NoteEditScreen = ({ navigation }) => {
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
    resetFormInput();
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
    navigation.navigate("HomeTopTabs");
  };
  // 重設表單輸入
  const resetFormInput = () => {
    setTitle("");
    setNotes("");
    setTimeText("");
    setCategory("");
    setDivide("low");
    // setIsCheck(false);
    // setTitleIsError(true);
    // setTimeIsError(true);
    // setCategoryIsError(true);
  };

  // 按下新增
  const onConfirmPress = () => {
    checkInputValues();
  };
  // 按下取消
  const onCancelPress = () => {
    resetFormInput();
    navigation.navigate("HomeTopTabs");
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

      <HStack mt={6} justifyContent={"flex-end"}>
        <Box mr={2}>
          <CancelButton buttonText={"取消"} onCancelPress={onCancelPress} />
        </Box>
        <Box>
          <ConfirmButton buttonText={"確認"} onConfirmPress={onConfirmPress} />
        </Box>
      </HStack>
    </Box>
  );
};

export default NoteEditScreen;
