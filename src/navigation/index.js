import { NavigationContainer, useTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Icon, Text } from "native-base";

import HomeScreen from "../screens/HomeScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default Navigation = () => {
  return (
    <NavigationContainer>
      <MyTab />
    </NavigationContainer>
  );
};

const MyTab = () => {
  return (
    // <Text>123</Text>
    <Tab.Navigator
      initialRouteName="HomeTabs"
      screenOptions={{
        headerShown: false,
        headerStatusBarHeight: 32,
        headerStyle: {
          backgroundColor: "lightyellow",
        },
        tabBarActiveTintColor: "#024D60",
        tabBarInactiveTintColor: "#888888",
        tabBarStyle: {
          height: 56,
          padding: 8,
          paddingBottom: 8,
          backgroundColor: "#DEEAEA",
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
          title: "清單",
          tabBarLabel: "清單",
          tabBarIcon: ({ focused }) => (
            <>
              {focused ? (
                <MaterialIcons name="note-add" size={24} color={"#024D60"} />
              ) : (
                <MaterialIcons name="note-add" size={24} color={"#888888"} />
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
                  color={"#024D60"}
                />
              ) : (
                <MaterialIcons
                  name="calendar-today"
                  size={24}
                  color={"#888888"}
                />
              )}
            </>
          ),
        }}
      />
      <Tab.Screen
        name="SettingsStack"
        component={HomStack}
        options={{
          title: "設定",
          tabBarLabel: "設定",
          tabBarIcon: ({ focused }) => (
            <>
              {focused ? (
                <MaterialIcons name="settings" size={24} color={"#024D60"} />
              ) : (
                <MaterialIcons name="settings" size={24} color={"#888888"} />
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
        // title: null,
        headerStyle: {
          backgroundColor: "lightblue",
        },
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} options={{}} />
    </Stack.Navigator>
  );
};
