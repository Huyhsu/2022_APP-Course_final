import { useState, useEffect } from "react";
import { Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  Box,
  Text,
  Input,
  Image,
  FormControl,
  TextArea,
  Pressable,
  Button,
  WarningOutlineIcon,
  KeyboardAvoidingView,
  Center,
  ScrollView,
  Radio,
  Modal,
  useColorMode,
  Divider,
} from "native-base";
import { useTheme } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

// 取得今日日期 ----------------------------------------------------------------------------
const daysFull = ["週日", "週一", "週二", "週三", "週四", "週五", "週六"];

export const getCurrentTime = () => {
  let today = new Date();
  let myYear = today.getFullYear();
  let myMonth = (today.getMonth() < 10 ? "0" : "") + (today.getMonth() + 1);
  let myDate = (today.getDate() < 10 ? "0" : "") + today.getDate();
  let myDay = today.getDay();
  let myTime = {
    year: myYear,
    month: myMonth,
    date: myDate,
    day: daysFull[myDay],
  };
  return myTime;
};
// 選擇日期 ------------------------------------------------------------------------------
const days = ["日", "一", "二", "三", "四", "五", "六"];

export const InputWithDateTimePicker = (props) => {
  // // Date and Time
  const { dateText, setDateText, timeText, setTimeText } = props;
  // Date Time Picker
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  // 取得日期(設定日期文字)
  const getDate = (currentDate) => {
    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getFullYear() +
      "/" +
      (tempDate.getMonth() < 10 ? "0" : "") +
      (tempDate.getMonth() + 1) +
      "/" +
      (tempDate.getDate() < 10 ? "0" : "") +
      tempDate.getDate();
    let fDay = "(" + days[tempDate.getDay()] + ")";
    setDateText(fDate + " " + fDay + " ");
  };
  // 取得時間(設定最終時間文字)
  const getTime = (currentDate) => {
    let tempDate = new Date(currentDate);
    let fTime =
      (tempDate.getHours() < 10 ? "0" : "") +
      tempDate.getHours() +
      ":" +
      (tempDate.getMinutes() < 10 ? "0" : "") +
      tempDate.getMinutes();
    setTimeText(dateText + fTime);
  };
  // Date Time Picker Display (set date then set time)
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    if (event.type == "set") {
      if (mode == "date") {
        getDate(currentDate);
        setMode("time");
        setShow(Platform !== "ios");
      } else {
        getTime(currentDate);
        setShow(Platform.OS === "ios");
        setMode("date");
      }
    } else {
      return null;
    }
  };
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const { colors } = useTheme();
  const { colorMode } = useColorMode();

  return (
    <Box mt={4}>
      <FormControl isRequired>
        <Pressable onPress={() => showMode("date")}>
          {({ isHovered, isFocused, isPressed }) => (
            <Input
              bgColor={
                isPressed
                  ? colors.Background
                  : isHovered
                  ? colors.White
                  : colors.White
              }
              borderColor={colors.Grey}
              isReadOnly={true}
              placeholder={"日期*"}
              InputRightElement={
                <Box pr={3}>
                  <MaterialIcons
                    name="calendar-today"
                    size={24}
                    color={colors.Grey}
                  />
                </Box>
              }
              fontSize={"md"}
              color={colors.Black}
              value={timeText}
              h={12}
            />
          )}
        </Pressable>
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          請選擇日期!
        </FormControl.ErrorMessage>
      </FormControl>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          // is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </Box>
  );
};
// 標題輸入 ------------------------------------------------------------------------------
export const InputWithTitle = (props) => {
  // Title
  const { title, setTitle } = props;

  const { colors } = useTheme();

  return (
    <Box>
      <FormControl isRequired>
        <Input
          placeholder={"標題*"}
          fontSize={"md"}
          value={title}
          onChangeText={(text) => setTitle(text)}
          bgColor={colors.White}
          borderColor={colors.Grey}
          color={colors.Black}
        />
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          請輸入標題!
        </FormControl.ErrorMessage>
      </FormControl>
    </Box>
  );
};
// 備註輸入 ------------------------------------------------------------------------------
export const TextAreaWithNotes = (props) => {
  // Notes
  const { notes, setNotes } = props;

  const { colors } = useTheme();

  return (
    <Box mt={4}>
      <FormControl>
        <TextArea
          placeholder={"添加備註..."}
          value={notes}
          onChangeText={(text) => setNotes(text)}
          fontSize={"md"}
          // minH={144}
          h={144}
          bgColor={colors.White}
          borderColor={colors.Grey}
          color={colors.Black}
        />
      </FormControl>
    </Box>
  );
};
// 類別輸入 ------------------------------------------------------------------------------
export const InputOptionWithCategory = (props) => {
  // Category
  const { category, setCategory } = props;
  // Native Base Modal
  const [modalVisible, setModalVisible] = useState(false);
  const [secondModalVisible, setSecondModalVisible] = useState(false);

  const { colors } = useTheme();
  const { colorMode } = useColorMode();

  return (
    <Box mt={4}>
      <FormControl isRequired>
        {/* <FormControl.Label
          _text={{
            fontSize: "md",
            color: colorMode == "light" ? colors.primary700 : colors.primary700,
          }}
        >
          類別
        </FormControl.Label> */}
        <Pressable
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
        >
          {({ isHovered, isFocused, isPressed }) => (
            <Input
              bgColor={
                isPressed
                  ? colors.Background
                  : isHovered
                  ? colors.Grey
                  : colors.White
              }
              isReadOnly={true}
              placeholder={"類別*"}
              InputRightElement={
                <Box pr={3}>
                  <MaterialIcons
                    name="arrow-drop-down"
                    size={24}
                    color={colors.Grey}
                  />
                </Box>
              }
              fontSize={"md"}
              value={category}
              color={colors.Black}
              borderColor={colors.Grey}
            />
          )}
        </Pressable>
        <Modal
          isOpen={modalVisible}
          onClose={() => setModalVisible(false)}
          avoidKeyboard
          bottom="4"
          size="lg"
          // borderRadius={0}
        >
          <Modal.Content bgColor={colors.light100} borderRadius={4}>
            <Modal.Header _text={{ fontSize: "md", color: colors.dark700 }}>
              選擇類別
            </Modal.Header>
            <ScrollView>
              <Modal.Body>
                <FormControl mt={4} isRequired>
                  <Radio.Group
                    name="selecCategory"
                    value={category}
                    onChange={(nextValue) => {
                      setCategory(nextValue);
                    }}
                  >
                    {/* {categoryList.categorys.length == 0 ? (
                      <Text fontSize={"md"} color={colors.dark700}>
                        請先建立一個類別
                      </Text>
                    ) : (
                      categoryList.categorys.map((value, index) => (
                        <Radio
                          key={value + index}
                          value={value}
                          mx={1}
                          my={1}
                          _text={{ color: colors.dark700, fontSize: "md" }}
                        >
                          {" "}
                          {value}
                        </Radio>
                      ))
                    )} */}
                    <Text fontSize={"md"} color={colors.dark700}>
                      請先建立一個類別
                    </Text>
                  </Radio.Group>
                </FormControl>
                <Pressable
                  onPress={() => {
                    setModalVisible(false);
                    setSecondModalVisible(!secondModalVisible);
                  }}
                >
                  {({ isHovered, isFocused, isPressed }) => (
                    <Box
                      color={colors.dark700}
                      bgColor={
                        isPressed
                          ? colors.light400
                          : isHovered
                          ? colors.light400
                          : colors.light100
                      }
                      borderRadius={5}
                      px={2}
                      py={1}
                      mt={4}
                    >
                      <Text
                        color={colors.primary700}
                        fontSize={"md"}
                        fontWeight={"medium"}
                      >
                        + 建立新類別
                      </Text>
                    </Box>
                  )}
                </Pressable>
              </Modal.Body>
            </ScrollView>

            <Modal.Footer bgColor={colors.light100}>
              {/* <Divider /> */}
              <Button.Group space={2}>
                <Button
                  variant="ghost"
                  colorScheme="blueGray"
                  onPress={() => {
                    setModalVisible(false);
                    setCategory("");
                    // setCategoryIsError(true);
                  }}
                >
                  取消
                </Button>
                <Button
                  _text={{ color: colors.primary700 }}
                  bgColor={colors.light100}
                  onPress={() => {
                    setModalVisible(false);
                  }}
                  isDisabled={category.length == 0}
                >
                  確定
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>

        {/* <Modal
          isOpen={secondModalVisible}
          onClose={() => setSecondModalVisible(false)}
          avoidKeyboard
          bottom="4"
          size="lg"
        >
          <Modal.Content bgColor={colors.light100}>
            <Modal.Body>
              <FormControl>
                <FormControl.Label
                  _text={{
                    fontSize: "md",
                    color:
                      colorMode == "light" ? colors.dark700 : colors.dark700,
                  }}
                  mt={4}
                >
                  建立新類別
                </FormControl.Label>
                <Input
                  placeholder={"類別名稱"}
                  fontSize={"md"}
                  value={newCategory}
                  onChangeText={(text) => setNewCategory(text)}
                  color={colors.dark700}
                />
              </FormControl>
            </Modal.Body>
            <Modal.Footer bgColor={colors.light100}>
              <Divider />
              <Button.Group space={2}>
                <Button
                  variant="ghost"
                  colorScheme="blueGray"
                  onPress={() => {
                    setSecondModalVisible(false);
                    setNewCategory("");
                  }}
                >
                  取消
                </Button>
                <Button
                  onPress={() => {
                    setSecondModalVisible(false);
                    setCategory(newCategory);
                    setNewCategory("");
                    dispatch(addCategory(newCategory));
                  }}
                  _text={{ color: colors.primary700 }}
                  bgColor={colors.light100}
                  isDisabled={newCategory.length == 0 || newCategory[0] == " "}
                >
                  確定
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal> */}

        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          請選擇一項類別!
        </FormControl.ErrorMessage>
      </FormControl>
    </Box>
  );
};
