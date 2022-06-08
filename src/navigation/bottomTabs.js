import { useTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

// Stacks
import { HomeStack, CalendarStack, SettingsStack } from "./stacks";

const Tab = createBottomTabNavigator();

// Bottom Tabs (HomeTopTabs + Calendar + Settings)
const BottomTabs = () => {
  const { colors } = useTheme();
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        headerShown: false,
        headerStatusBarHeight: 32,
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
        name="HomeStack"
        component={HomeStack}
        options={{
          headerShown: false,
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
        component={CalendarStack}
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

export default BottomTabs;
