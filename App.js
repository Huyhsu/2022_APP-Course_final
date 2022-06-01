import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { NativeBaseProvider } from "native-base";
import { Provider } from "react-redux";

import MyNavigation from "./src/navigation";

export default function App() {
  return (
    <SafeAreaProvider>
      <NativeBaseProvider>
        {/* <SafeAreaView> */}
        <MyNavigation />
        {/* </SafeAreaView> */}
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
}
