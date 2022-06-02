import React from "react";
import { useTheme } from "@react-navigation/native";
import { Box, VStack } from "native-base";

import SettingsItem from "../components/SettingsItem";

const SettingsScreen = ({ navigation }) => {
  const { colors } = useTheme();
  return (
    <Box flex={1} bgColor={colors.Background}>
      <VStack pt={4} px={4}>
        <SettingsItem
          title={"主題設定"}
          navigation={navigation}
          destination="DisplaySetting"
        />
        <SettingsItem title={"垃圾桶"} navigation={navigation} />
      </VStack>
    </Box>
  );
};

export default SettingsScreen;
