import React, { useCallback, useRef, useMemo } from "react";
import { StyleSheet } from "react-native";
import { Box, Text, Button } from "native-base";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const MyBottomSheet = () => {
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
    console.log("handleSheetChange", index);
  }, []);

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
      // style={{ position: "absolute" }}
    >
      <BottomSheetFlatList
        data={data}
        keyExtractor={(i) => i}
        renderItem={renderItem}
        // contentContainerStyle={}
      />
    </BottomSheet>
  );
};

export default MyBottomSheet;
