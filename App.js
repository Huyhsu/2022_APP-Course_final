import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { NativeBaseProvider } from "native-base";
import { Provider } from "react-redux";

import { store } from "./src/redux/store";
import MyNavigation from "./src/navigation";

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NativeBaseProvider>
          {/* <SafeAreaView> */}
          <MyNavigation />
          {/* </SafeAreaView> */}
        </NativeBaseProvider>
      </Provider>
    </SafeAreaProvider>
  );
}
