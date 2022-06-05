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
import {
  addTodoItem,
  updateCurrentEditTodoItem,
  setCurrentEditTodoItem,
  selectTodoItems,
  selectCurrentEditTodoItem,
} from "../redux/todoItemSlice";

const NoteEditScreen = ({ navigation, route: { params } }) => {
  // Selected Todo Item
  const { title, notes, timeText, category, divide, done } = params;
  // State
  const todoItemsValue = useSelector(selectTodoItems);
  const currentEditTodoItemValue = useSelector(selectCurrentEditTodoItem);
  // Dispatch
  const dispatch = useDispatch();
  // to compare time
  const timePattern = /\//g;

  // set title
  const setCurrentEditTodoItemTitle = (value) => {
    dispatch(setCurrentEditTodoItem({ title: value }));
  };
  // set notes
  const setCurrentEditTodoItemNotes = (value) => {
    dispatch(setCurrentEditTodoItem({ notes: value }));
  };
  // set timeText
  const setCurrentEditTodoItemTimeText = (value) => {
    dispatch(setCurrentEditTodoItem({ timeText: value }));
  };
  // set category
  const setCurrentEditTodoItemCategory = (value) => {
    dispatch(setCurrentEditTodoItem({ category: value }));
  };
  // set divide
  const setCurrentEditTodoItemDivide = (value) => {
    dispatch(setCurrentEditTodoItem({ divide: value }));
  };

  // New Todo Item Category
  const [newCategory, setNewCategory] = useState("");

  // error check
  const [isCheck, setIsCheck] = useState(false);
  const [isTitleError, setIsTitleError] = useState(true);
  const [isTimeTextError, setIsTimeTextError] = useState(true);
  const [isCategoryError, setIsCategoryError] = useState(true);
  // title pattern
  const oneNotBlank = /\S/;

  // 確認輸入值
  const checkInputValues = () => {
    if (
      currentEditTodoItemValue.title.length == 0 ||
      !oneNotBlank.test(currentEditTodoItemValue.title)
    ) {
      setIsTitleError(true);
    }
    if (currentEditTodoItemValue.timeText.length == 0) {
      setIsTimeTextError(true);
    }
    if (currentEditTodoItemValue.category.length == 0) {
      setIsCategoryError(true);
    }
  };
  // 確認是否錯誤，無誤就新增 todo item 並返回 Home
  const checkInputError = () => {
    if (!isTitleError && !isTimeTextError && !isCategoryError) {
      console.log("Correct");
      editCurrentTodoItem();
      resetFormInput();
      navigation.navigate("HomeTopTabs");
    } else {
      console.log("Error !");
    }
  };

  useEffect(() => {
    currentEditTodoItemValue.title.length != 0 &&
    oneNotBlank.test(currentEditTodoItemValue.title)
      ? setIsTitleError(false)
      : setIsTitleError(true);
    currentEditTodoItemValue.timeText.length != 0
      ? setIsTimeTextError(false)
      : setIsTimeTextError(true);
    currentEditTodoItemValue.category.length != 0
      ? setIsCategoryError(false)
      : setIsCategoryError(true);
  }, [
    currentEditTodoItemValue.title,
    currentEditTodoItemValue.timeText,
    currentEditTodoItemValue.category,
  ]);

  // 更新 Todo Item
  const editCurrentTodoItem = () => {
    let updatedTodoItem = {
      title: currentEditTodoItemValue.title,
      notes: currentEditTodoItemValue.notes,
      timeText: currentEditTodoItemValue.timeText,
      category: currentEditTodoItemValue.category,
      divide: currentEditTodoItemValue.divide,
      done: currentEditTodoItemValue.done,
      compareTime: currentEditTodoItemValue.timeText
        .replace(timePattern, "")
        .slice(0, 8),
      selectTime: currentEditTodoItemValue.timeText
        .replace(timePattern, "-")
        .slice(0, 10),
    };
    const updatedTodoItemIndex = todoItemsValue.findIndex(
      (value) =>
        value.title == title &&
        value.notes == notes &&
        value.timeText == timeText &&
        value.category == category &&
        value.divide == divide
    );
    if (updatedTodoItemIndex == -1) {
      console.log("Error! Can't Find the TodoItem to Edit!");
    }
    dispatch(updateCurrentEditTodoItem(updatedTodoItem, updatedTodoItemIndex));
  };
  // 重設表單輸入
  const resetFormInput = () => {
    setIsCheck(false);
    setIsTitleError(true);
    setIsTimeTextError(true);
    setIsCategoryError(true);
  };

  // 按下確認
  const onConfirmPress = () => {
    setIsCheck(true);
    checkInputValues();
    checkInputError();
  };
  // 按下取消
  const onCancelPress = () => {
    // resetFormInput();
    // navigation.navigate("HomeTopTabs");
    console.log(currentEditTodoItemValue);
  };

  const onTestConsolePress = () => {
    // console.log("");
  };

  // color
  const { colors } = useTheme();

  return (
    <Box flex={1} bgColor={colors.Background} p={10}>
      <InputWithTitle
        title={currentEditTodoItemValue.title}
        setTitle={setCurrentEditTodoItemTitle}
        isCheck={isCheck}
        isTitleError={isTitleError}
      />
      <TextAreaWithNotes
        notes={currentEditTodoItemValue.notes}
        setNotes={setCurrentEditTodoItemNotes}
      />
      <InputWithDateTimePicker
        timeText={currentEditTodoItemValue.timeText}
        setTimeText={setCurrentEditTodoItemTimeText}
        isCheck={isCheck}
        isTimeTextError={isTimeTextError}
      />
      <InputOptionWithCategory
        category={currentEditTodoItemValue.category}
        setCategory={setCurrentEditTodoItemCategory}
        newCategory={newCategory}
        setNewCategory={setNewCategory}
        isCheck={isCheck}
        isCategoryError={isCategoryError}
      />
      <RadioWithDivide
        divide={currentEditTodoItemValue.divide}
        setDivide={setCurrentEditTodoItemDivide}
      />

      <HStack mt={6} justifyContent={"flex-end"}>
        <Box mr={2}>
          <CancelButton buttonText={"取消"} onCancelPress={onCancelPress} />
        </Box>
        <Box>
          <ConfirmButton buttonText={"確認"} onConfirmPress={onConfirmPress} />
        </Box>
        {/* <Box>
          <CancelButton
            buttonText={"測試"}
            onCancelPress={onTestConsolePress}
          />
        </Box> */}
      </HStack>
    </Box>
  );
};

export default NoteEditScreen;
