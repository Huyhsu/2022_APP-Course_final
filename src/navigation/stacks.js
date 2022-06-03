import { useTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// Screens
import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import DisplaySettingScreen from "../screens/DisplaySettingScreen";

const Stack = createNativeStackNavigator();

// Home Stack ( Home + ? )
const HomeStack = ({ navigation }, parentProps) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Home"
        children={(props) => <HomeScreen {...parentProps} />}
      />
    </Stack.Navigator>
  );
};
// Settings Stack ( Settings + DisplaySetting )
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

export { HomeStack, SettingsStack };
