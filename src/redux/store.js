import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore } from "@reduxjs/toolkit";
// Slice
import todoItemReducer from "./todoItemSlice";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

export const store = configureStore({
  reducer: {
    // todoItem: todoItemReducer,
    todoItem: persistReducer(persistConfig, todoItemReducer),
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

persistStore(store);
