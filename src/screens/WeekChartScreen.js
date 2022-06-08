import { useState } from "react";
import { Box, Text, FlatList, HStack, Center, Pressable } from "native-base";
import { useTheme } from "@react-navigation/native";
import { getThisWeekData } from "../utils";

const WeekChartScreen = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <Box
      flex={1}
      bgColor={colors.Background}
      px={8}
      py={4}
      // px={10}
    >
      <Pressable
        onPress={() => getThisWeekData()}
        w={24}
        h={24}
        bgColor={"amber.100"}
      ></Pressable>
      <Text>I am WeekChart screen</Text>
    </Box>
  );
};

export default WeekChartScreen;
