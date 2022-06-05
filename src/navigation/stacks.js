import { useTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Box, Center, Text, Pressable } from "native-base";

// Screens
import HomeScreen from "../screens/HomeScreen";
import CalendarScreen from "../screens/CalendarScreen";
import SettingsScreen from "../screens/SettingsScreen";
import DisplaySettingScreen from "../screens/DisplaySettingScreen";
import NoteAddScreen from "../screens/NoteAddSceen";
import NoteEditScreen from "../screens/NoteEditScreen";

const Stack = createNativeStackNavigator();

// Home Stack ( Home + ? ) -----------------------------------------------------------
const HomeStack = ({ navigation, currentTodoItems }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Home"
        children={() => (
          <HomeScreen
            navigation={navigation}
            currentTodoItems={currentTodoItems}
          />
        )}
      />
    </Stack.Navigator>
  );
};
// Calendar Stack ( Calendar ) --------------------------------------
const CalendarStack = ({ navigation }) => {
  const { colors } = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        title: null,
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontSize: 20,
          color: colors.Primary900,
        },
        headerStyle: {
          backgroundColor: colors.Primary100,
        },
        headerTintColor: colors.Primary900,
      }}
    >
      <Stack.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{ title: "日曆" }}
      />
    </Stack.Navigator>
  );
};
// Settings Stack ( Settings + DisplaySetting ) --------------------------------------
const SettingsStack = ({ navigation }) => {
  const { colors } = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        title: null,
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontSize: 20,
          color: colors.Primary900,
        },
        headerStyle: {
          backgroundColor: colors.Primary100,
        },
        headerTintColor: colors.Primary900,
      }}
    >
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: "設定" }}
      />
      <Stack.Screen
        name="DisplaySetting"
        component={DisplaySettingScreen}
        options={{ title: "主題設定" }}
      />
    </Stack.Navigator>
  );
};
// NoteAdd Stack ( NoteAdd ) --------------------------------------
const NoteAddStack = ({ navigation }) => {
  const { colors } = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        title: null,
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontSize: 20,
          color: colors.Primary900,
        },
        headerStyle: {
          backgroundColor: colors.Primary100,
        },
        headerTintColor: colors.Primary900,
        headerLeft: () => (
          <Pressable onPress={() => navigation.navigate("HomeTopTabs")}>
            <MaterialIcons
              name="arrow-back"
              size={24}
              color={colors.Primary900}
            />
          </Pressable>
        ),
      }}
    >
      <Stack.Screen
        name="NoteAdd"
        component={NoteAddScreen}
        options={{ title: "新增" }}
      />
    </Stack.Navigator>
  );
};
// NoteEdit Stack ( NoteEdit ) --------------------------------------
const NoteEditStack = ({ navigation }) => {
  const { colors } = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        title: null,
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontSize: 20,
          color: colors.Primary900,
        },
        headerStyle: {
          backgroundColor: colors.Primary100,
        },
        headerTintColor: colors.Primary900,
        headerLeft: () => (
          <Pressable onPress={() => navigation.navigate("HomeTopTabs")}>
            <MaterialIcons
              name="arrow-back"
              size={24}
              color={colors.Primary900}
            />
          </Pressable>
        ),
      }}
    >
      <Stack.Screen
        name="NoteEdit"
        component={NoteEditScreen}
        options={{ title: "確認" }}
      />
    </Stack.Navigator>
  );
};
export { HomeStack, CalendarStack, SettingsStack, NoteAddStack, NoteEditStack };
