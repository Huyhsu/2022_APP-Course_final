import { NavigationContainer } from "@react-navigation/native";
import { Box, StatusBar, useColorMode } from "native-base";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Theme
import { lightTheme, darkTheme } from "../theme";
// Bottom Tabs
import BottomTabs from "../navigation/bottomTabs";
// Screens to not show bottom tabs
import NoteAddScreen from "../screens/NoteAddSceen";
import NoteEditScreen from "../screens/NoteEditScreen";
// Stack
import { NoteEditStack } from "./stacks";

const Stack = createNativeStackNavigator();

// BottomTabs + NoteAdd + NoteEdit
const Navigation = () => {
  const { colorMode } = useColorMode();
  const MyTheme = colorMode == "light" ? lightTheme : darkTheme;
  const colors = MyTheme.colors;
  return (
    <Box flex={1} bgColor={colors.Background}>
      <NavigationContainer theme={MyTheme}>
        <StatusBar
          barStyle={colorMode == "light" ? "dark-content" : "light-content"}
          backgroundColor={colors.Primary100}
        />
        <Stack.Navigator
          screenOptions={{
            // animationTypeForReplace: "pop",
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="BottomTabs"
            component={BottomTabs}
            options={{ title: "BottomTabs" }}
          />
          <Stack.Screen
            name="NoteAdd"
            component={NoteAddScreen}
            options={{
              title: "新增",
              headerShown: true,
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
          />
          <Stack.Screen
            name="NoteEditStack"
            component={NoteEditStack}
            options={{
              title: "編輯",
              headerShown: true,
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
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Box>
  );
};

export default Navigation;
