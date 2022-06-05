import thunk from "redux-thunk";
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { persistStore, persistReducer } from 'redux-persist';
import { configureStore } from "@reduxjs/toolkit";
import todoItemReducer from "./todoItemSlice";

export const store = configureStore({
  reducer: {
    todoItem: todoItemReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});
