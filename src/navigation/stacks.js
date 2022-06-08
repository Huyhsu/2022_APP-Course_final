import { useTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Box, Center, Text, Pressable } from "native-base";

// Home Top tabs
import HomeTopTabs from "./topTabs";
// Screens
import WeekChartScreen from "../screens/WeekChartScreen";
import CalendarScreen from "../screens/CalendarScreen";
import SettingsScreen from "../screens/SettingsScreen";
import DisplaySettingScreen from "../screens/DisplaySettingScreen";
import NoteEditScreen from "../screens/NoteEditScreen";
// Custom Header
import SearchBarHeader from "../components/SearchBarHeader";

const Stack = createNativeStackNavigator();

// Home Stack ( HomeTopTabs + WeekChart) -----------------------------------------------------------
const HomeStack = ({ navigation }) => {
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
        name="Home"
        component={HomeTopTabs}
        options={{ title: "清單", header: (props) => <SearchBarHeader /> }}
      />
      <Stack.Screen
        name="WeekChart"
        component={WeekChartScreen}
        options={{ title: "本週待辦" }}
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
        headerShown: false,
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
        options={{
          title: "日曆",
          headerShown: true,
          header: (props) => <SearchBarHeader />,
        }}
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
// const NoteAddStack = ({ navigation }) => {
//   const { colors } = useTheme();
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         title: null,
//         headerTitleAlign: "center",
//         headerTitleStyle: {
//           fontSize: 20,
//           color: colors.Primary900,
//         },
//         headerStyle: {
//           backgroundColor: colors.Primary100,
//         },
//         headerTintColor: colors.Primary900,
//         headerLeft: () => (
//           <Pressable onPress={() => navigation.navigate("HomeTopTabs")}>
//             <MaterialIcons
//               name="arrow-back"
//               size={24}
//               color={colors.Primary900}
//             />
//           </Pressable>
//         ),
//       }}
//     >
//       <Stack.Screen
//         name="NoteAdd"
//         component={NoteAddScreen}
//         options={{ title: "新增" }}
//       />
//     </Stack.Navigator>
//   );
// };
// NoteEdit Stack ( NoteEdit ) --------------------------------------
const NoteEditStack = ({ navigation }) => {
  const { colors } = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        // title: null,
        // headerTitleAlign: "center",
        // headerTitleStyle: {
        //   fontSize: 20,
        //   color: colors.Primary900,
        // },
        // headerStyle: {
        //   backgroundColor: colors.Primary100,
        // },
        // headerTintColor: colors.Primary900,
        // headerLeft: () => (
        //   <Pressable onPress={() => navigation.navigate("HomeTopTabs")}>
        //     <MaterialIcons
        //       name="arrow-back"
        //       size={24}
        //       color={colors.Primary900}
        //     />
        //   </Pressable>
        // ),
      }}
    >
      <Stack.Screen
        name="NoteEdit"
        component={NoteEditScreen}
        options={{ title: "編輯" }}
      />
    </Stack.Navigator>
  );
};
// WeekChart Stack ( WeekChart ) --------------------------------------
// const WeekChartStack = ({ navigation }) => {
//   const { colors } = useTheme();
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         // headerShown: false,
//         title: null,
//         headerTitleAlign: "center",
//         headerTitleStyle: {
//           fontSize: 20,
//           color: colors.Primary900,
//         },
//         headerStyle: {
//           backgroundColor: colors.Primary100,
//         },
//         headerTintColor: colors.Primary900,
//         headerLeft: () => (
//           <Pressable onPress={() => navigation.navigate("HomeTopTabs")}>
//             <MaterialIcons
//               name="arrow-back"
//               size={24}
//               color={colors.Primary900}
//             />
//           </Pressable>
//         ),
//       }}
//     >
//       <Stack.Screen
//         name="WeekChart"
//         component={WeekChartScreen}
//         options={{ title: "本週待辦" }}
//       />
//     </Stack.Navigator>
//   );
// };

// =================================================================================== export
// Stacks
export {
  HomeStack,
  CalendarStack,
  SettingsStack,
  // NoteAddStack,
  NoteEditStack,
  // WeekChartStack,
};
