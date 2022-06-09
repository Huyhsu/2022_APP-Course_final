import React, { useCallback, useRef, useMemo } from "react";
import { useTheme } from "@react-navigation/native";
import { Box, Text } from "native-base";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";

import TodoItem from "../components/TodoItem";

const MyBottomSheet = (props) => {
  // selected items and navigation
  const { itemsData, navigation, emptyText } = props;

  // hooks
  const sheetRef = useRef();
  // callbacks
  const handleSheetChange = useCallback((index) => {
    console.log("handleSheetChange", index);
  }, []);

  const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);

  // color
  const { colors } = useTheme();

  // render
  const renderItem = useCallback(
    ({ item }) => <TodoItem todoItem={item} navigation={navigation} />,
    []
  );

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={snapPoints}
      // onChange={handleSheetChange}
      handleStyle={{
        backgroundColor: colors.Background,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
      }}
      backgroundComponent={null}
      style={{ shadowColor: "black" }}
      handleIndicatorStyle={{ backgroundColor: colors.Black }}
      // containerStyle={{ backgroundColor: colors.White }}
      // contentContainerStyle={{ backgroundColor: colors.White }}
    >
      {itemsData.length == 0 ? (
        <Box bgColor={colors.Background} h={"100%"}>
          <Text
            color={colors.Black}
            fontSize={"md"}
            pt={10}
            alignSelf={"center"}
          >
            {emptyText}
          </Text>
        </Box>
      ) : (
        <BottomSheetFlatList
          data={itemsData}
          keyExtractor={(item, index) => item.title + item.category + index}
          renderItem={renderItem}
          contentContainerStyle={{
            backgroundColor: colors.Background,
            height: "100%",
            padding: 16,
          }}
        />
      )}
    </BottomSheet>
  );
};

export default MyBottomSheet;
