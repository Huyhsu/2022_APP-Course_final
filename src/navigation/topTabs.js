import { useTheme } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Center, Pressable } from "native-base";

import { useDispatch, useSelector } from "react-redux";
import { selectCategorys, selectTodoItems } from "../redux/todoItemSlice";

// Home Stack
import { HomeStack } from "./stacks";
// Week Info Card
import WeekInfoCard from "../components/WeekInfoCard";

const Tab = createMaterialTopTabNavigator();

// Top Tab - HomeTabs (Many HomeStacks) with FAB and WeekChart
const HomeTopTabs = ({ navigation }) => {
  // States
  const todoItemsValue = useSelector(selectTodoItems);
  const categorysValue = useSelector(selectCategorys);
  // Dispatch
  const dispatch = useDispatch();

  const { colors } = useTheme();
  return (
    <>
      <Pressable
        onPress={() => {
          navigation.navigate("WeekChartStack");
        }}
      >
        <WeekInfoCard />
      </Pressable>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            elevation: 0,
            backgroundColor: colors.Primary100,
            padding: 0,
            paddingBottom: 0,
          },
          tabBarScrollEnabled: true,
          tabBarActiveTintColor: colors.Primary900,
          tabBarInactiveTintColor: colors.Grey,
          tabBarContentContainerStyle: {
            height: 56,
          },
          tabBarAllowFontScaling: false,
          tabBarItemStyle: {
            width: "auto",
            padding: 0,
            paddingHorizontal: 16,
          },
          tabBarPressColor: colors.Primary100,
          tabBarIndicatorStyle: {
            backgroundColor: colors.Primary900,
          },
          tabBarLabelStyle: {
            textTransform: "none",
            fontSize: 16,
            padding: 0,
          },
        }}
      >
        <Tab.Screen
          name="所有"
          children={(props) => (
            <HomeStack currentTodoItems={todoItemsValue} {...props} />
          )}
        />
        {categorysValue.map((category, index) => {
          let currentCategoryTodoItems = [
            ...todoItemsValue.filter((item) => item.category == category),
          ];
          return (
            <Tab.Screen
              key={category + index}
              name={category + index}
              children={(props) => (
                <HomeStack
                  currentTodoItems={currentCategoryTodoItems}
                  {...props}
                />
              )}
              options={{
                title: category,
              }}
            />
          );
        })}
      </Tab.Navigator>
      <Pressable
        position={"absolute"}
        borderRadius={16}
        bottom={4}
        right={4}
        shadow={3}
        w={58}
        h={58}
        justifyContent={"center"}
        alignItems={"center"}
        onPress={() => {
          navigation.navigate("NoteAddStack");
        }}
      >
        {({ isHovered, isFocused, isPressed }) => (
          <Center
            bgColor={
              isPressed
                ? colors.Primary100
                : isHovered
                ? colors.Grey
                : colors.Primary500
            }
            w={"100%"}
            h={"100%"}
            borderRadius={16}
          >
            <MaterialIcons name="add" size={24} color={colors.Primary900} />
          </Center>
        )}
      </Pressable>
    </>
  );
};

export default HomeTopTabs;
