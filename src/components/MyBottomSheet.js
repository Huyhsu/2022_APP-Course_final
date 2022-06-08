import React, { useCallback, useRef, useMemo } from "react";
import { useTheme } from "@react-navigation/native";
import { Box, Text } from "native-base";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";

const MyBottomSheet = (props) => {
  // hooks
  const sheetRef = useRef();

  // variables
  const data = useMemo(
    () =>
      Array(50)
        .fill(0)
        .map((_, index) => `index-${index}`),
    []
  );
  const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);

  // callbacks
  const handleSheetChange = useCallback((index) => {
    // console.log("handleSheetChange", index);
  }, []);

  const { colors } = useTheme();

  // render
  const renderItem = useCallback(
    ({ item }) => (
      <Box>
        <Text>{item}</Text>
      </Box>
    ),
    []
  );
  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={snapPoints}
      onChange={handleSheetChange}
      handleStyle={{
        backgroundColor: colors.White,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
      }}
      backgroundComponent={null}
      style={{ shadowColor: "black" }}
      // handleIndicatorStyle={{ backgroundColor: colors.White }}

      // containerStyle={{ backgroundColor: colors.White }}
      // contentContainerStyle={{ backgroundColor: colors.White }}
      // style={{ position: "absolute" }}
    >
      <BottomSheetFlatList
        data={data}
        keyExtractor={(i) => i}
        renderItem={renderItem}
        contentContainerStyle={{
          backgroundColor: colors.White,
          // borderColor: colors.White,
          // borderWidth: 0,
          padding: 16,
        }}
      />
    </BottomSheet>
  );
};

export default MyBottomSheet;
