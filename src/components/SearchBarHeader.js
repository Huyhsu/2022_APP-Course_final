import { useState, useEffect } from "react";
import { useTheme } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Box, Center, Input, Pressable, Menu } from "native-base";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { ModalWithCategorysToEdit } from "../utils";

import { useSelector } from "react-redux";
import { selectCategorys } from "../redux/todoItemSlice";

const SearchBarHeader = (props) => {
  // State
  const categorysValue = useSelector(selectCategorys);
  // Edit Category Modal Visible
  const [editCategoryModalVisible, setEditCategoryModalVisible] =
    useState(false);

  // sort categorys
  const [currentCategorys, setCurrentCategorys] = useState([...categorysValue]);
  // 更新待排列的暫存類別
  useEffect(() => {
    setCurrentCategorys(categorysValue);
  }, [categorysValue]);

  // Delete Category Modal
  const [deleteCategoryModalVisible, setDeleteCategoryModalVisible] =
    useState(false);
  // Delete Category Check Modal
  const [deleteCategoryCheckModalVisible, setDeleteCategoryCheckModalVisible] =
    useState(false);

  const onEditCategoryPress = () => {
    console.log("Select Edit Category");
    setCurrentCategorys(categorysValue);
    setEditCategoryModalVisible(true);
  };

  const { colors } = useTheme();
  return (
    <SafeAreaView>
      <Box bgColor={colors.Primary100}>
        <Center marginY={4}>
          <Input
            bgColor={colors.White}
            w={"80%"}
            h={6}
            p={0}
            fontSize={"md"}
            borderWidth={0}
            borderRadius={1}
            placeholder="搜尋..."
            placeholderTextColor={colors.Grey}
            InputLeftElement={
              <MaterialIcons
                name="search"
                size={24}
                color={colors.Primary900}
              />
            }
          />
          {/* <Pressable
            position={"absolute"}
            right={2}
            onPress={() => console.log("more")}
          >
            <MaterialIcons
              name="more-vert"
              size={24}
              color={colors.Primary900}
            ></MaterialIcons>
          </Pressable> */}
          <Menu
            mr={4}
            trigger={(triggerProps) => {
              return (
                <Pressable
                  position={"absolute"}
                  right={2}
                  accessibilityLabel="More options menu"
                  {...triggerProps}
                >
                  <MaterialIcons
                    name="more-vert"
                    size={24}
                    color={colors.Primary900}
                  />
                </Pressable>
              );
            }}
          >
            <Menu.Item onPress={() => onEditCategoryPress()}>
              編輯類別
            </Menu.Item>
            <Menu.Item onPress={() => console.log("Select remove Category")}>
              移除類別
            </Menu.Item>
          </Menu>
        </Center>
        <ModalWithCategorysToEdit
          modalVisible={editCategoryModalVisible}
          setModalVisible={setEditCategoryModalVisible}
          currentCategorys={currentCategorys}
          setCurrentCategorys={setCurrentCategorys}
        />
      </Box>
    </SafeAreaView>
  );
};

export default SearchBarHeader;
