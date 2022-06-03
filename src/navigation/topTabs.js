import { useTheme } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
// Home Stack
import { HomeStack } from "./stacks";
// Week Info Card
import WeekInfoCard from "../components/WeekInfoCard";

const Tab = createMaterialTopTabNavigator();

// Top Tab - HomeTabs (Many Home Stacks) with FAB
const HomeTopTabs = ({ navigation }) => {
  // const { itemList, categoryList } = useSelector((state) => state.item);
  // const dispatch = useDispatch();
  const { colors } = useTheme();
  return (
    <>
      <WeekInfoCard />
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            elevation: 0,
            backgroundColor: colors.Primary100,
          },
          tabBarScrollEnabled: true,
          tabBarActiveTintColor: colors.Primary900,
          tabBarInactiveTintColor: colors.Grey,
          tabBarContentContainerStyle: {
            height: 56,
          },
          tabBarItemStyle: {
            width: "auto",
            paddingHorizontal: 16,
          },
          tabBarPressColor: colors.Primary100,
          tabBarIndicatorStyle: {
            backgroundColor: colors.Primary900,
          },
          tabBarLabelStyle: {
            textTransform: "none",
            fontSize: 16,
          },
        }}
      >
        <Tab.Screen
          name="所有"
          children={(props) => (
            // <HomeStack currentList={itemList.items} {...props} />
            <HomeStack {...props} />
          )}
        />
        {/* {categoryList.categorys.map((category, index) => {
          let currentCategoryItemList = [
            ...itemList.items.filter((item) => item.category == category),
          ];
          return (
            <TopTab.Screen
              key={category + index}
              name={category}
              children={(props) => (
                <HomeStack currentList={currentCategoryItemList} {...props} />
              )}
            />
          );
        })} */}
      </Tab.Navigator>
      {/* <Pressable
        position={"absolute"}
        rounded={16}
        bottom={4}
        right={4}
        shadow={3}
        w={58}
        h={58}
        justifyContent={"center"}
        bgColor={colors.green700}
        onPress={() => {
          navigation.navigate("NoteAddStack");
        }}
      >
        {({ isHovered, isFocused, isPressed }) => (
          <Center
            bgColor={
              isPressed
                ? colors.light700
                : isHovered
                ? colors.light700
                : colors.green700
            }
            w={"100%"}
            h={"100%"}
            rounded={16}
          >
            {colorMode == "light" ? (
              <Image
                source={require("../icon/icon_add.png")}
                alt={"add_icon"}
              />
            ) : (
              <>
                <Image
                  source={require("../icon/icon_dark_add.png")}
                  alt={"add_icon"}
                />
              </>
            )}
          </Center>
        )}
      </Pressable> */}
    </>
  );
};

export default HomeTopTabs;
