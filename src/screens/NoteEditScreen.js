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

import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentEditTodoItem,
  editTodoItem,
  selectTodoItems,
  selectCurrentEditTodoItem,
} from "../redux/todoItemSlice";

const NoteEditScreen = ({ navigation, route }) => {
  // selected todoItem params from TodoItem
  const { title, notes, timeText, category, divide, done } = route.params;

  // const {}
  // States
  const todoItemsValue = useSelector(selectTodoItems);
  const currentEditTodoItemValue = useSelector(selectCurrentEditTodoItem);
  // Dispatch
  const dispatch = useDispatch();
  // time pattern to compare time
  const timePattern = /\//g;
  // title pattern
  const oneNotBlank = /\S/;

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
  // error check (default false)
  const [isCheck, setIsCheck] = useState(false);
  const [isTitleError, setIsTitleError] = useState(false);
  const [isTimeTextError, setIsTimeTextError] = useState(false);
  const [isCategoryError, setIsCategoryError] = useState(false);
  // ???????????????
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
  // ???????????????????????????????????? todo item ????????? Home
  const checkInputError = () => {
    if (!isTitleError && !isTimeTextError && !isCategoryError) {
      console.log("Edit the Todo Item");
      updateTodoItem();
      resetFormInput();
      navigation.navigate("Home");
    } else {
      console.log("Error! Can't Edit the Todo Item");
    }
  };
  // ??????????????????
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
  // ?????? Todo Item
  const updateTodoItem = () => {
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
    // ???????????????????????? todo item ??? index
    const updatedTodoItemIndex = todoItemsValue.findIndex(
      (value) =>
        value.title == title &&
        value.notes == notes &&
        value.timeText == timeText &&
        value.category == category &&
        value.divide == divide
    );
    if (updatedTodoItemIndex == -1) {
      console.log("title: ", title);
      console.log("timeText: ", timeText);
      console.log("category: ", category);
      console.log("divide: ", divide);
      console.log("Error! Can't Find the TodoItem to Edit!");
    }
    // ?????????????????? todo item ??? ????????? index
    dispatch(editTodoItem({ updatedTodoItem, updatedTodoItemIndex }));
  };
  // ??????????????????
  const resetFormInput = () => {
    setIsCheck(false);
    setIsTitleError(false);
    setIsTimeTextError(false);
    setIsCategoryError(false);
  };
  // ????????????
  const onConfirmPress = () => {
    setIsCheck(true);
    checkInputValues();
    checkInputError();
  };
  // ????????????
  const onCancelPress = () => {
    resetFormInput();
    navigation.navigate("Home");
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
          <CancelButton buttonText={"??????"} onCancelPress={onCancelPress} />
        </Box>
        <Box>
          <ConfirmButton buttonText={"??????"} onConfirmPress={onConfirmPress} />
        </Box>
      </HStack>
    </Box>
  );
};

export default NoteEditScreen;
