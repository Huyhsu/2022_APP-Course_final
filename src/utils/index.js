import { useState, useEffect } from "react";
import { Platform } from "react-native";
import { useTheme } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {
  Box,
  Text,
  Input,
  FormControl,
  TextArea,
  Pressable,
  WarningOutlineIcon,
  KeyboardAvoidingView,
  Center,
  ScrollView,
  Radio,
  Modal,
  useColorMode,
  Divider,
  HStack,
} from "native-base";
import DateTimePicker from "@react-native-community/datetimepicker";
import DraggableFlatList, {
  NestableDraggableFlatList,
  NestableScrollContainer,
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from "react-native-gesture-handler";

import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  editCategoryNameAndTodoItemsCategory,
  selectCategorys,
  sortCategorys,
} from "../redux/todoItemSlice";
import { SafeAreaView } from "react-native-safe-area-context";

// 取得今日日期 ---------------------------------------------------------------------------- 取得今日日期
const daysFull = ["週日", "週一", "週二", "週三", "週四", "週五", "週六"];

const getCurrentTime = () => {
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
// 選擇日期 ------------------------------------------------------------------------------ 選擇日期
const days = ["日", "一", "二", "三", "四", "五", "六"];

const InputWithDateTimePicker = (props) => {
  // timeText
  const { timeText, setTimeText, isCheck, isTimeTextError } = props;
  // Date Text
  const [dateText, setDateText] = useState("");
  // Date Time Picker
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  // 取得日期(設定 Date Text)
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
  // 取得時間(設定 timeText)
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
  // Date Time Picker Show(true) and Mode(date or time)
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  // color
  const { colors } = useTheme();
  return (
    <Box mt={4}>
      <FormControl isRequired isInvalid={isTimeTextError && isCheck}>
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
          請選擇日期
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
// 標題輸入 ------------------------------------------------------------------------------ 標題輸入
const InputWithTitle = (props) => {
  // title
  const { title, setTitle, isCheck, isTitleError } = props;
  // color
  const { colors } = useTheme();
  return (
    <Box>
      <FormControl isRequired isInvalid={isTitleError && isCheck}>
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
          請輸入非全空白的標題
        </FormControl.ErrorMessage>
      </FormControl>
    </Box>
  );
};
// 備註輸入 ------------------------------------------------------------------------------ 備註輸入
const TextAreaWithNotes = (props) => {
  // notes
  const { notes, setNotes } = props;
  // color
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
// 類別輸入 ------------------------------------------------------------------------------ 類別輸入
const InputOptionWithCategory = (props) => {
  // category, newCategory, and check
  const {
    category,
    setCategory,
    newCategory,
    setNewCategory,
    isCheck,
    isCategoryError,
  } = props;
  // native base modalVisible * 2
  const [modalVisible, setModalVisible] = useState(false);
  const [secondModalVisible, setSecondModalVisible] = useState(false);
  // color
  const { colors } = useTheme();
  return (
    <Box mt={4}>
      <FormControl isRequired isInvalid={isCategoryError && isCheck}>
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

        <ModalWithCategory
          category={category}
          setCategory={setCategory}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          nextModalVisible={secondModalVisible}
          setNextModalVisible={setSecondModalVisible}
        />

        <ModalWithNewCategory
          category={category}
          setCategory={setCategory}
          newCategory={newCategory}
          setNewCategory={setNewCategory}
          modalVisible={secondModalVisible}
          setModalVisible={setSecondModalVisible}
        />

        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          請選擇一項類別
        </FormControl.ErrorMessage>
      </FormControl>
    </Box>
  );
};
// 選擇類別 Modal ------------------------------------------------------------------------ 選擇類別 Modal
const ModalWithCategory = (props) => {
  // State
  const categorysValue = useSelector(selectCategorys);
  // category, modalVisible and secondModalVisible
  const {
    category,
    setCategory,
    modalVisible,
    setModalVisible,
    nextModalVisible,
    setNextModalVisible,
  } = props;
  // color
  const { colors } = useTheme();
  return (
    <Box>
      <Modal
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
        avoidKeyboard
        size="lg"
      >
        <Modal.Content bgColor={colors.White} borderRadius={4}>
          <Modal.Header
            _text={{
              fontSize: "md",
              color: colors.Black,
              fontWeight: "normal",
            }}
            bgColor={colors.White}
          >
            選擇類別
          </Modal.Header>
          <ScrollView>
            <Modal.Body>
              <FormControl mt={4} px={2} isRequired>
                <Radio.Group
                  colorScheme={"teal"}
                  name="selecCategory"
                  value={category}
                  onChange={(nextValue) => {
                    setCategory(nextValue);
                  }}
                >
                  {categorysValue.length == 0 ? (
                    <Text fontSize={"md"} color={colors.Black}>
                      請先建立一個類別
                    </Text>
                  ) : (
                    categorysValue.map((value, index) => (
                      <Radio
                        key={value + index}
                        value={value}
                        my={2}
                        size={"sm"}
                        _text={{
                          color: colors.Black,
                          fontSize: "md",
                        }}
                      >
                        {" "}
                        {value}
                      </Radio>
                    ))
                  )}
                </Radio.Group>
              </FormControl>
              <Pressable
                onPress={() => {
                  setModalVisible(false);
                  setNextModalVisible(!nextModalVisible);
                }}
              >
                {({ isHovered, isFocused, isPressed }) => (
                  <HStack
                    color={colors.Black}
                    bgColor={
                      isPressed
                        ? colors.Background
                        : isHovered
                        ? colors.White
                        : colors.White
                    }
                    borderRadius={4}
                    px={2}
                    py={1}
                    mt={4}
                    alignItems={"center"}
                  >
                    <MaterialIcons name="add" size={20} color={colors.Black} />
                    <Text color={colors.Black} fontSize={"md"} ml={5}>
                      建立新類別
                    </Text>
                  </HStack>
                )}
              </Pressable>
            </Modal.Body>
          </ScrollView>

          <Modal.Footer bgColor={colors.White}>
            <HStack>
              <Pressable
                mr={5}
                onPress={() => {
                  setModalVisible(false);
                  setCategory("");
                  // setCategoryIsError(true);
                }}
              >
                <Text fontSize={"md"} color={colors.Grey}>
                  取消
                </Text>
              </Pressable>
              <Pressable
                isDisabled={category == ""}
                onPress={() => {
                  setModalVisible(false);
                }}
              >
                <Text
                  fontSize={"md"}
                  color={category == "" ? colors.Grey : colors.Black}
                >
                  確認
                </Text>
              </Pressable>
            </HStack>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Box>
  );
};
// 新增類別 Modal ------------------------------------------------------------------------ 新增類別 Modal
const ModalWithNewCategory = (props) => {
  const categorysValue = useSelector(selectCategorys);
  // Dispatch
  const dispatch = useDispatch();
  // category, newCategory and modalVisible
  const {
    category,
    setCategory,
    newCategory,
    setNewCategory,
    modalVisible,
    setModalVisible,
  } = props;

  // category pattern
  const oneNotBlank = /\S/;
  // check new category
  const [isNewCategoryError, setIsNewCategoryError] = useState(false);
  useEffect(() => {
    if (newCategory.length != 0) setIsNewCategoryError(false);
  }, [newCategory]);

  // 確認輸入的類別名稱
  const checkNewCategoryValue = () => {
    const alreadyHave = categorysValue.find((item) => item == newCategory);
    // 還沒有該類別存在
    if (alreadyHave == undefined) {
      dispatch(addCategory(newCategory));
      setCategory(newCategory);
      setNewCategory("");
      setModalVisible(false);
    }
    // 已有該類別
    else {
      setIsNewCategoryError(true);
      console.log("Already Have that category!");
    }
  };
  // color
  const { colors } = useTheme();
  return (
    <Box>
      <Modal
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
        avoidKeyboard
        bottom="4"
        size="lg"
        closeOnOverlayClick={false}
      >
        <Modal.Content bgColor={colors.White} borderRadius={4}>
          <Modal.Header
            _text={{
              fontSize: "md",
              color: colors.Black,
              fontWeight: "normal",
            }}
            bgColor={colors.White}
          >
            建立新類別
          </Modal.Header>
          <Modal.Body>
            <FormControl isInvalid={isNewCategoryError}>
              <Input
                placeholder={"類別名稱"}
                fontSize={"md"}
                value={newCategory}
                onChangeText={(text) => setNewCategory(text)}
                color={colors.Black}
                bgColor={colors.White}
              />
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                此類別已存在
              </FormControl.ErrorMessage>
            </FormControl>
          </Modal.Body>
          <Modal.Footer bgColor={colors.White}>
            <HStack>
              <Pressable
                mr={5}
                onPress={() => {
                  setModalVisible(false);
                  setCategory("");
                  setNewCategory("");
                  setIsNewCategoryError(false);
                }}
              >
                <Text fontSize={"md"} color={colors.Grey}>
                  取消
                </Text>
              </Pressable>
              <Pressable
                isDisabled={!oneNotBlank.test(newCategory)}
                onPress={() => {
                  checkNewCategoryValue();
                }}
              >
                <Text
                  fontSize={"md"}
                  color={
                    oneNotBlank.test(newCategory) ? colors.Black : colors.Grey
                  }
                >
                  確認
                </Text>
              </Pressable>
            </HStack>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Box>
  );
};
// 事項劃分 ------------------------------------------------------------------------------ 事項劃分
const RadioWithDivide = (props) => {
  // divide
  const { divide, setDivide } = props;
  // color
  const { colors } = useTheme();
  return (
    <Box mt={8}>
      <FormControl isRequired>
        <Radio.Group
          // defaultValue={divide}
          defaultValue={"low"}
          name="selectDivide"
          value={divide}
          onChange={(nextValue) => {
            setDivide(nextValue);
          }}
          flexDir={"row"}
          justifyContent={"space-between"}
          pr={6}
        >
          <Radio
            value="high"
            mx={2}
            size={"sm"}
            _text={{
              fontSize: "md",
              color: colors.Black,
            }}
            colorScheme="red"
          >
            <Text color={colors.Black} fontSize={"md"} p={0}>
              優先
            </Text>
          </Radio>
          <Radio
            value="medium"
            mx={2}
            // ml={6}
            size={"sm"}
            _text={{ fontSize: "md", color: colors.Black }}
            colorScheme="amber"
          >
            <Text color={colors.Black} fontSize={"md"} p={0}>
              重要
            </Text>
          </Radio>
          <Radio
            value="low"
            mx={2}
            // ml={6}
            size={"sm"}
            _text={{ fontSize: "md", color: colors.Black }}
            colorScheme="cyan"
          >
            <Text color={colors.Black} fontSize={"md"} p={0}>
              普通
            </Text>
          </Radio>
        </Radio.Group>
        <FormControl.ErrorMessage>Something is wrong.</FormControl.ErrorMessage>
      </FormControl>
    </Box>
  );
};
// 確認按鍵 ------------------------------------------------------------------------------ 確認按鍵
const ConfirmButton = (props) => {
  const { buttonText, onConfirmPress } = props;
  // color
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={() => onConfirmPress()}
      borderRadius={16}
      //shadow={3}
    >
      {({ isHovered, isFocused, isPressed }) => (
        <Center
          bgColor={
            isPressed
              ? colors.Primary100
              : isHovered
              ? colors.Primary500
              : colors.Primary500
          }
          borderRadius={16}
          px={4}
          py={3}
        >
          <Text fontSize={"md"}>{buttonText}</Text>
        </Center>
      )}
    </Pressable>
  );
};
// 取消按鍵 ------------------------------------------------------------------------------ 取消按鍵
const CancelButton = (props) => {
  const { buttonText, onCancelPress } = props;
  // color
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={() => onCancelPress()}
      borderRadius={16}
      // shadow={3}
    >
      {({ isHovered, isFocused, isPressed }) => (
        <Center
          bgColor={
            isPressed
              ? colors.Primary100
              : isHovered
              ? colors.Background
              : colors.Background
          }
          borderRadius={16}
          px={4}
          py={3}
        >
          <Text fontSize={"md"}>{buttonText}</Text>
        </Center>
      )}
    </Pressable>
  );
};
// 編輯類別 Modal ------------------------------------------------------------------------ 編輯類別 Modal (addCategory and editCategoryName)
const ModalWithCategorysToEdit = (props) => {
  // State
  const categorysValue = useSelector(selectCategorys);
  // Dispatch
  const dispatch = useDispatch();
  // category, modalVisible and secondModalVisible
  const {
    modalVisible,
    setModalVisible,
    currentCategorys,
    setCurrentCategorys,
  } = props;

  // Add Category Modal and Edit Category Name Modal
  const [addCategoryModalVisible, setAddCategoryModalVisible] = useState(false);
  const [editCategoryNameModalVisible, setEditCategoryNameModalVisible] =
    useState(false);

  // add new category
  const [newCategory, setNewCategory] = useState("");
  // edit category name
  const [updatedCategoryName, setUpdatedCategoryName] = useState("");
  const [initialCategoryName, setInitialCategoryName] = useState("");

  // color
  const { colors } = useTheme();

  const onEditPress = (value) => {
    // console.log(value);
    setModalVisible(false);
    setInitialCategoryName(value);
    setUpdatedCategoryName(value);
    setEditCategoryNameModalVisible(true);
  };

  const renderItem = ({ item, index, drag, isActive }) => (
    <Pressable onLongPress={drag} isActive={isActive} mt={4}>
      {({ isHovered, isFocused, isPressed }) => (
        <HStack
          color={colors.Black}
          bgColor={
            isPressed
              ? colors.Background
              : isHovered
              ? colors.White
              : colors.White
          }
          borderRadius={4}
          px={2}
          py={1}
          alignItems={"center"}
        >
          <MaterialIcons name="menu" size={20} color={colors.Black} />
          <Text color={colors.Black} fontSize={"md"} ml={5}>
            {item}
          </Text>
          <Pressable
            onPress={() => onEditPress(item)}
            position={"absolute"}
            right={4}
          >
            <MaterialIcons name="edit" size={20} color={colors.Black} />
          </Pressable>
        </HStack>
      )}
    </Pressable>
  );

  return (
    <Box>
      <Modal
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
        avoidKeyboard
        size="lg"
        scrollEnabled={false}
        enableAutomaticScroll={false}
      >
        <Modal.Content
          bgColor={colors.White}
          borderRadius={4}
          scrollEnabled={false}
          enableAutomaticScroll={false}
        >
          <Modal.Header
            _text={{
              fontSize: "md",
              color: colors.Black,
              fontWeight: "normal",
            }}
            bgColor={colors.White}
          >
            編輯類別
          </Modal.Header>
          <Modal.Body
            // p={0}
            scrollEnabled={false}
            enableAutomaticScroll={false}
            nestedScrollEnabled={true}
          >
            {categorysValue.length == 0 ? (
              <Text fontSize={"md"} color={colors.Black}>
                請先建立一個類別
              </Text>
            ) : (
              <Box h={200}>
                <GestureHandlerRootView>
                  <NestableScrollContainer showsVerticalScrollIndicator={false}>
                    <NestableDraggableFlatList
                      data={currentCategorys}
                      renderItem={renderItem}
                      keyExtractor={(item, index) => item + index}
                      onDragEnd={({ data }) => setCurrentCategorys(data)}
                    />
                  </NestableScrollContainer>
                </GestureHandlerRootView>
              </Box>
            )}

            <Pressable
              onPress={() => {
                setModalVisible(false);
                setAddCategoryModalVisible(true);
              }}
              mt={4}
            >
              {({ isHovered, isFocused, isPressed }) => (
                <HStack
                  color={colors.Black}
                  bgColor={
                    isPressed
                      ? colors.Background
                      : isHovered
                      ? colors.White
                      : colors.White
                  }
                  borderRadius={4}
                  px={2}
                  py={1}
                  alignItems={"center"}
                >
                  <MaterialIcons name="add" size={20} color={colors.Black} />
                  <Text color={colors.Black} fontSize={"md"} ml={5}>
                    建立新類別
                  </Text>
                </HStack>
              )}
            </Pressable>
          </Modal.Body>

          <Modal.Footer bgColor={colors.White}>
            <HStack>
              <Pressable
                mr={5}
                onPress={() => {
                  setModalVisible(false);
                  setCurrentCategorys(categorysValue);
                }}
              >
                <Text fontSize={"md"} color={colors.Grey}>
                  取消
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setModalVisible(false);
                  dispatch(sortCategorys(currentCategorys));
                }}
              >
                <Text
                  fontSize={"md"}
                  // color={category == "" ? colors.Grey : colors.Black}
                >
                  確認
                </Text>
              </Pressable>
            </HStack>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      <ModalWithNewCategoryInEditCategoryModal
        newCategory={newCategory}
        setNewCategory={setNewCategory}
        modalVisible={addCategoryModalVisible}
        setModalVisible={setAddCategoryModalVisible}
      />

      <ModalWithEditCategoryNameInEditCategoryModal
        updatedCategoryName={updatedCategoryName}
        setUpdatedCategoryName={setUpdatedCategoryName}
        modalVisible={editCategoryNameModalVisible}
        setModalVisible={setEditCategoryNameModalVisible}
        initialCategoryName={initialCategoryName}
        setInitialCategoryName={setInitialCategoryName}
      />
    </Box>
  );
};
// 新增類別(編輯類別 Modal 使用) Modal --------------------------------------------------------- 新增類別(編輯類別 Modal 使用) Modal
const ModalWithNewCategoryInEditCategoryModal = (props) => {
  const categorysValue = useSelector(selectCategorys);
  // Dispatch
  const dispatch = useDispatch();
  // newCategory and modalVisible
  const { newCategory, setNewCategory, modalVisible, setModalVisible } = props;

  // category pattern
  const oneNotBlank = /\S/;
  // check new category
  const [isNewCategoryError, setIsNewCategoryError] = useState(false);
  useEffect(() => {
    if (newCategory.length != 0) setIsNewCategoryError(false);
  }, [newCategory]);

  // 確認輸入的類別名稱
  const checkNewCategoryValue = () => {
    const alreadyHave = categorysValue.find((item) => item == newCategory);
    // 還沒有該類別存在
    if (alreadyHave == undefined) {
      dispatch(addCategory(newCategory));
      setNewCategory("");
      setIsNewCategoryError(false);
      setModalVisible(false);
    }
    // 已有該類別
    else {
      setIsNewCategoryError(true);
      console.log("Already Have that category!");
    }
  };
  // color
  const { colors } = useTheme();
  return (
    <Box>
      <Modal
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
        avoidKeyboard
        bottom="4"
        size="lg"
        closeOnOverlayClick={false}
      >
        <Modal.Content bgColor={colors.White} borderRadius={4}>
          <Modal.Header
            _text={{
              fontSize: "md",
              color: colors.Black,
              fontWeight: "normal",
            }}
            bgColor={colors.White}
          >
            建立新類別
          </Modal.Header>
          <Modal.Body>
            <FormControl isInvalid={isNewCategoryError}>
              <Input
                placeholder={"類別名稱"}
                fontSize={"md"}
                value={newCategory}
                onChangeText={(text) => setNewCategory(text)}
                color={colors.Black}
                bgColor={colors.White}
              />
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                此類別已存在
              </FormControl.ErrorMessage>
            </FormControl>
          </Modal.Body>
          <Modal.Footer bgColor={colors.White}>
            <HStack>
              <Pressable
                mr={5}
                onPress={() => {
                  setModalVisible(false);
                  setNewCategory("");
                  setIsNewCategoryError(false);
                }}
              >
                <Text fontSize={"md"} color={colors.Grey}>
                  取消
                </Text>
              </Pressable>
              <Pressable
                isDisabled={!oneNotBlank.test(newCategory)}
                onPress={() => {
                  checkNewCategoryValue();
                }}
              >
                <Text
                  fontSize={"md"}
                  color={
                    oneNotBlank.test(newCategory) ? colors.Black : colors.Grey
                  }
                >
                  確認
                </Text>
              </Pressable>
            </HStack>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Box>
  );
};
// 編輯 Category 名稱(編輯類別 Modal 使用) Modal------------------------------------------------ 編輯 Category 名稱(編輯類別 Modal 使用) Modal
const ModalWithEditCategoryNameInEditCategoryModal = (props) => {
  const categorysValue = useSelector(selectCategorys);
  // Dispatch
  const dispatch = useDispatch();
  // updatedCategoryName, initialCategoryName and modalVisible
  const {
    updatedCategoryName,
    setUpdatedCategoryName,
    modalVisible,
    setModalVisible,
    initialCategoryName,
    setInitialCategoryName,
  } = props;

  // Modal 標題顯示用
  const [headerTitle, setHeaderTitle] = useState(
    `修改「 ${initialCategoryName} 」類別名稱`
  );
  useEffect(() => {
    if (modalVisible) {
      setHeaderTitle(`修改「 ${initialCategoryName} 」類別名稱`);
    }
  }, [initialCategoryName]);

  // category pattern
  const oneNotBlank = /\S/;
  // check new category
  const [isUpdatedCategoryNameError, setIsUpdatedCategoryNameError] =
    useState(false);
  useEffect(() => {
    if (updatedCategoryName.length != 0 && modalVisible)
      setIsUpdatedCategoryNameError(false);
  }, [updatedCategoryName]);

  // 確認輸入的類別名稱
  const checkUpdatedCategoryNameValue = () => {
    const initialCategoryNameIndex = categorysValue.findIndex(
      (value) => value == initialCategoryName
    );
    const alreadyHave = categorysValue.find(
      (value) => value == updatedCategoryName && value != initialCategoryName
    );
    // 還沒有該類別存在(或等於原名稱)
    if (alreadyHave == undefined) {
      dispatch(
        editCategoryNameAndTodoItemsCategory({
          initialCategoryName,
          initialCategoryNameIndex,
          updatedCategoryName,
        })
      );
      setUpdatedCategoryName("");
      setIsUpdatedCategoryNameError(false);
      setModalVisible(false);
    }
    // 已有該類別
    else {
      setIsUpdatedCategoryNameError(true);
      console.log("Already Have that category!");
    }
  };
  // color
  const { colors } = useTheme();
  return (
    <Box>
      <Modal
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
        avoidKeyboard
        bottom="4"
        size="lg"
        closeOnOverlayClick={false}
      >
        <Modal.Content bgColor={colors.White} borderRadius={4}>
          <Modal.Header
            _text={{
              fontSize: "md",
              color: colors.Black,
              fontWeight: "normal",
            }}
            bgColor={colors.White}
          >
            {/* 修改「{initialCategoryName}」類別名稱 */}
            {headerTitle}
          </Modal.Header>
          <Modal.Body>
            <FormControl isInvalid={isUpdatedCategoryNameError}>
              <Input
                placeholder={"類別名稱"}
                fontSize={"md"}
                value={updatedCategoryName}
                onChangeText={(text) => setUpdatedCategoryName(text)}
                color={colors.Black}
                bgColor={colors.White}
              />
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                此類別已存在
              </FormControl.ErrorMessage>
            </FormControl>
          </Modal.Body>
          <Modal.Footer bgColor={colors.White}>
            <HStack>
              <Pressable
                mr={5}
                onPress={() => {
                  setUpdatedCategoryName("");
                  setIsUpdatedCategoryNameError(false);
                  setModalVisible(false);
                }}
              >
                <Text fontSize={"md"} color={colors.Grey}>
                  取消
                </Text>
              </Pressable>
              <Pressable
                isDisabled={!oneNotBlank.test(updatedCategoryName)}
                onPress={() => {
                  checkUpdatedCategoryNameValue();
                }}
              >
                <Text
                  fontSize={"md"}
                  color={
                    oneNotBlank.test(updatedCategoryName)
                      ? colors.Black
                      : colors.Grey
                  }
                >
                  確認
                </Text>
              </Pressable>
            </HStack>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Box>
  );
};
// ===================================================================================
// Functions
export { getCurrentTime };
// Form Input Utils
export {
  InputWithTitle,
  TextAreaWithNotes,
  InputWithDateTimePicker,
  InputOptionWithCategory,
  RadioWithDivide,
};
// Modal
export { ModalWithCategorysToEdit };
// Button
export { ConfirmButton, CancelButton };
