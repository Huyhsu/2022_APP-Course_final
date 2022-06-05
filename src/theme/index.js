import { DefaultTheme, DarkTheme } from "@react-navigation/native";

export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    Primary100: "#DEEAEA",
    Primary500: "#D3F9E7",
    Primary900: "#024D60",
    Background: "#F1F1EE",
    Grey: "#888888",
    White: "#FAFAFA",
    High: "#FFA176",
    Medium: "#F2C94C",
    Low: "#ACD4DE",
    Black: "#444444",
  },
};

export const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    Primary100: "#242525",
    Primary500: "#71857B",
    Primary900: "#E4E6EB",
    Background: "#18191A",
    Grey: "#888888",
    White: "#3A3B3C",
    High: "#FFA176",
    Medium: "#F2C94C",
    Low: "#ACD4DE",
    Black: "#FAFAFA",
  },
};
