import { NavigationContainer, useTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Icon, StatusBar, Text, useColorMode } from "native-base";

import { lightTheme, darkTheme } from "../theme";
// Screens
import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import DisplaySettingScreen from "../screens/DisplaySettingScreen";
import SearchBarHeader from "../components/SearchBarHeader";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Navigation = () => {
  const { colorMode } = useColorMode();
  const MyTheme = colorMode == "light" ? lightTheme : darkTheme;
  const colors = MyTheme.colors;
  return (
    <NavigationContainer theme={MyTheme}>
      <StatusBar
        barStyle={colorMode == "light" ? "dark-content" : "light-content"}
        backgroundColor={colors.Primary100}
      />
      <MyTab />
    </NavigationContainer>
  );
};

const MyTab = () => {
  const { colors } = useTheme();
  return (
    <Tab.Navigator
      initialRouteName="HomeTabs"
      screenOptions={{
        headerShown: false,
        headerStatusBarHeight: 32,
        headerStyle: {
          backgroundColor: "lightyellow",
        },
        tabBarActiveTintColor: colors.Primary900,
        tabBarInactiveTintColor: colors.Grey,
        tabBarStyle: {
          height: 56,
          backgroundColor: colors.Primary100,
        },
        tabBarItemStyle: {
          padding: 8,
        },
        tabBarIconStyle: {
          width: 24,
          height: 24,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
    >
      <Tab.Screen
        name="HomeTabs"
        component={HomStack}
        options={{
          headerShown: true,
          header: (props) => <SearchBarHeader />,
          title: "清單",
          tabBarLabel: "清單",
          tabBarIcon: ({ focused }) => (
            <>
              {focused ? (
                <MaterialIcons
                  name="note-add"
                  size={24}
                  color={colors.Primary900}
                />
              ) : (
                <MaterialIcons name="note-add" size={24} color={colors.Grey} />
              )}
            </>
          ),
        }}
      />
      <Tab.Screen
        name="CalendarStack"
        component={HomStack}
        options={{
          title: "日曆",
          tabBarLabel: "日曆",
          tabBarIcon: ({ focused }) => (
            <>
              {focused ? (
                <MaterialIcons
                  name="calendar-today"
                  size={24}
                  color={colors.Primary900}
                />
              ) : (
                <MaterialIcons
                  name="calendar-today"
                  size={24}
                  color={colors.Grey}
                />
              )}
            </>
          ),
        }}
      />
      <Tab.Screen
        name="SettingsStack"
        component={SettingsStack}
        options={{
          title: "設定",
          tabBarLabel: "設定",
          tabBarIcon: ({ focused }) => (
            <>
              {focused ? (
                <MaterialIcons
                  name="settings"
                  size={24}
                  color={colors.Primary900}
                />
              ) : (
                <MaterialIcons name="settings" size={24} color={colors.Grey} />
              )}
            </>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const HomStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} options={{}} />
    </Stack.Navigator>
  );
};

const SettingsStack = ({ navigation }) => {
  const { colors } = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        title: null,
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontSize: 20,
        },
        headerStyle: {
          backgroundColor: colors.Primary100,
        },
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

export default Navigation;
