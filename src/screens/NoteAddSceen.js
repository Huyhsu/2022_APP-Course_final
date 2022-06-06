import { useState, useEffect } from "react";
import { useTheme } from "@react-navigation/native";
import { Box, HStack } from "native-base";

import {
  InputWithTitle,
  InputWithDateTimePicker,
  TextAreaWithNotes,
  InputOptionWithCategory,
  RadioWithDivide,
  ConfirmButton,
  CancelButton,
} from "../utils";

import { useDispatch } from "react-redux";
import { addTodoItem } from "../redux/todoItemSlice";

const NoteAddScreen = ({ navigation }) => {
  // Dispatch
  const dispatch = useDispatch();
  // time pattern to compare time
  const timePattern = /\//g;
  // title pattern
  const oneNotBlank = /\S/;

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

  // error check (default true)
  const [isCheck, setIsCheck] = useState(false);
  const [isTitleError, setIsTitleError] = useState(true);
  const [isTimeTextError, setIsTimeTextError] = useState(true);
  const [isCategoryError, setIsCategoryError] = useState(true);

  // 確認輸入值
  const checkInputValues = () => {
    if (title.length == 0 || !oneNotBlank.test(title)) {
      setIsTitleError(true);
    }
    if (timeText.length == 0) {
      setIsTimeTextError(true);
    }
    if (category.length == 0) {
      setIsCategoryError(true);
    }
  };
  // 確認是否錯誤，無誤就新增 todo item 並返回 Home
  const checkInputError = () => {
    if (!isTitleError && !isTimeTextError && !isCategoryError) {
      console.log("Add New Todo Item");
      createTodoItem();
      resetFormInput();
      navigation.navigate("HomeTopTabs");
    } else {
      console.log("Error! Can't Add New Todo Item");
    }
  };
  // 偵測輸入錯誤
  useEffect(() => {
    title.length != 0 && oneNotBlank.test(title)
      ? setIsTitleError(false)
      : setIsTitleError(true);
    timeText.length != 0 ? setIsTimeTextError(false) : setIsTimeTextError(true);
    category.length != 0 ? setIsCategoryError(false) : setIsCategoryError(true);
  }, [title, timeText, category]);
  // 建立 Todo Item
  const createTodoItem = () => {
    let newTodoItem = {
      title: title,
      notes: notes,
      timeText: timeText,
      category: category,
      divide: divide,
      done: false,
      compareTime: timeText.replace(timePattern, "").slice(0, 8),
      selectTime: timeText.replace(timePattern, "-").slice(0, 10),
    };
    dispatch(addTodoItem(newTodoItem));
  };
  // 重設表單輸入
  const resetFormInput = () => {
    setTitle("");
    setNotes("");
    setTimeText("");
    setCategory("");
    setDivide("low");
    setIsCheck(false);
    setIsTitleError(true);
    setIsTimeTextError(true);
    setIsCategoryError(true);
  };
  // 按下新增
  const onConfirmPress = () => {
    setIsCheck(true);
    checkInputValues();
    checkInputError();
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
      <InputWithTitle
        title={title}
        setTitle={setTitle}
        isCheck={isCheck}
        isTitleError={isTitleError}
      />
      <TextAreaWithNotes notes={notes} setNotes={setNotes} />
      <InputWithDateTimePicker
        timeText={timeText}
        setTimeText={setTimeText}
        isCheck={isCheck}
        isTimeTextError={isTimeTextError}
      />
      <InputOptionWithCategory
        category={category}
        setCategory={setCategory}
        newCategory={newCategory}
        setNewCategory={setNewCategory}
        isCheck={isCheck}
        isCategoryError={isCategoryError}
      />
      <RadioWithDivide divide={divide} setDivide={setDivide} />

      <HStack mt={6} justifyContent={"flex-end"}>
        <Box mr={2}>
          <ConfirmButton buttonText={"新增"} onConfirmPress={onConfirmPress} />
        </Box>
        <Box>
          <CancelButton buttonText={"取消"} onCancelPress={onCancelPress} />
        </Box>
      </HStack>
    </Box>
  );
};

export default NoteAddScreen;
