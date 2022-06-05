import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// todoItem: {
//   title: "",         標題
//   notes: "",         備註
//   time: "",          時間
//   category: "",      事項類別
//   divide: "",        劃分優先度
//   done: "",          完成與否
//   compareTime: "",   比較事項先後用的日期格式
//   selectTime: "",    代表日曆所選日期的格式
// }

const initialState = {
  todoItems: [],
  currentEditTodoItem: {
    title: "",
    notes: "",
    time: "",
    category: "",
    divide: "",
    done: "",
    compareTime: "",
    selectTime: "",
  },
  categorys: [],
};

const todoItemSlice = createSlice({
  name: "todoItem",
  initialState,
  reducers: {
    addTodoItem: (state, action) => {
      state.todoItems = [...state.todoItems, action.payload];
    },
    setCurrentEditItem: (state, action) => {
      state.currentEditItem = action.payload;
    },
    addCategory: (state, action) => {
      state.categorys = [...state.categorys, action.payload];
    },
  },
});

// States
export const selectTodoItems = (state) => state.todoItem.todoItems;
export const selectCategorys = (state) => state.todoItem.categorys;
// Actions
export const { addTodoItem, addCategory } = todoItemSlice.actions;
// Reducer
export default todoItemSlice.reducer;
