import { useState, useCallback } from "react";
import { Box, Text, FlatList, HStack, Center, Pressable } from "native-base";
import { useTheme } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";

import MyCalendar from "../components/MyCalendar";

import DraggableFlatList, {
  ScaleDecorator,
} from "react-native-draggable-flatlist";

const CalendarScreen = ({ navigation }) => {
  const { colors } = useTheme();

  const exampleData = [...Array(3)].map((d, index) => ({
    key: `item-${index}`,
    label: String(index) + "",
  }));

  const [data, setData] = useState(exampleData);

  const renderDragItem = ({ item, index, drag, isActive }) => {
    return (
      <ScaleDecorator>
        <TouchableOpacity
          onPressIn={drag}
          disabled={isActive}
          style={{ backgroundColor: "lightyellow", width: 160 }}
        >
          <Text fontSize={48}>{item.label}</Text>
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };

  return (
    <Box
      flex={1}
      bgColor={colors.Background}
      px={4}
      py={4}
      // px={10}
    >
      {/* <MyCalendar />
      <Text>I am calendar screen</Text> */}

      <DraggableFlatList
        data={data}
        onDragEnd={({ data }) => setData(data)}
        keyExtractor={(item) => item.key}
        renderItem={renderDragItem}
      />
    </Box>
  );
};

export default CalendarScreen;
