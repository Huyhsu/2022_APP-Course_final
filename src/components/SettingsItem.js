import { useTheme } from "@react-navigation/native";
import { Text, HStack, Pressable } from "native-base";

const SettingsItem = ({ navigation, title, destination }) => {
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={() => {
        destination ? navigation.navigate(destination) : null;
      }}
    >
      <HStack
        bgColor={colors.White}
        px={4}
        py={14}
        mb={4}
        borderRadius={5}
        shadow={1}
      >
        <Text _light={{ color: colors.Primary900 }} fontSize={"lg"}>
          {title}
        </Text>
      </HStack>
    </Pressable>
  );
};

export default SettingsItem;
