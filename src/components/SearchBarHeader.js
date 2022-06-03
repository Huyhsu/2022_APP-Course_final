import { useTheme } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Box, Center, Input, Pressable } from "native-base";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const SearchBarHeader = (props) => {
  const { colors } = useTheme();
  return (
    <SafeAreaView>
      <Box bgColor={colors.Primary100}>
        <Center marginY={4}>
          <Input
            bgColor={colors.White}
            w={"80%"}
            h={6}
            p={0}
            fontSize={"md"}
            borderWidth={0}
            borderRadius={1}
            placeholder="搜尋..."
            placeholderTextColor={colors.Grey}
            InputLeftElement={
              <MaterialIcons
                name="search"
                size={24}
                color={colors.Primary900}
              />
            }
          />
          <Pressable
            position={"absolute"}
            right={2}
            onPress={() => console.log("more")}
          >
            <MaterialIcons
              name="more-vert"
              size={24}
              color={colors.Primary900}
            />
          </Pressable>
        </Center>
      </Box>
    </SafeAreaView>
  );
};

export default SearchBarHeader;
