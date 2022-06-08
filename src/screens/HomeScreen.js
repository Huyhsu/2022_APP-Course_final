import { useTheme } from "@react-navigation/native";
import { Box, Text, FlatList, HStack, Image, Pressable } from "native-base";

import TodoItem from "../components/TodoItem";

const HomeScreen = ({ navigation, currentTodoItems }) => {
  // render item
  const renderItem = ({ item }) => (
    <TodoItem todoItem={item} navigation={navigation} />
  );

  const { colors } = useTheme();

  let sortedTodoItems = [...currentTodoItems];
  sortedTodoItems.sort((first, second) => {
    return first.compareTime - second.compareTime;
  });

  return (
    <Box
      flex={1}
      bgColor={colors.Background}
      px={4}
      // px={10}
    >
      {currentTodoItems.length == 0 ? (
        <Text color={colors.Black} fontSize={"md"} pt={24} alignSelf={"center"}>
          點擊 + 號以新增項目
        </Text>
      ) : (
        <FlatList
          data={sortedTodoItems}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => item.title + item.category + index}
          contentContainerStyle={{
            paddingTop: 16,
            paddingBottom: 88,
          }}
        />
      )}
    </Box>
  );
};

export default HomeScreen;
