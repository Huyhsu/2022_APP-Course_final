import { NavigationContainer } from "@react-navigation/native";
import { StatusBar, useColorMode } from "native-base";
// Theme
import { lightTheme, darkTheme } from "../theme";
// Bottom Tabs
import BottomTabs from "../navigation/bottomTabs";

const Navigation = () => {
  const { colorMode } = useColorMode();
  const MyTheme = colorMode == "light" ? lightTheme : darkTheme;
  const colors = MyTheme.colors;
  return (
    <NavigationContainer theme={MyTheme}>
      <StatusBar
        barStyle={colorMode == "light" ? "dark-content" : "light-content"}
        backgroundColor={colors.Primary100}
        // backgroundColor={"lightblue"}
      />
      <BottomTabs />
    </NavigationContainer>
  );
};

export default Navigation;
