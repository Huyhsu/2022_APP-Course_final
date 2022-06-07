import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// todoItem: {
//   title: "",         標題
//   notes: "",         備註
//   timeText: "",          時間
//   category: "",      事項類別
//   divide: "",        劃分優先度
//   done: "",          完成與否
//   compareTime: "",   比較事項先後用的日期格式  20220609
//   selectTime: "",    代表日曆所選日期的格式    2022-06-09
// }

const initialState = {
  todoItems: [],
  currentEditTodoItem: {
    title: "",
    notes: "",
    timeText: "",
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
    addCategory: (state, action) => {
      state.categorys = [...state.categorys, action.payload];
    },
    setCurrentEditTodoItem: (state, action) => {
      state.currentEditTodoItem = {
        ...state.currentEditTodoItem,
        ...action.payload,
      };
    },
    editTodoItem: (state, action) => {
      const updatedTodoItem = action.payload.updatedTodoItem;
      // console.log(updatedTodoItem);
      const updatedTodoItemIndex = action.payload.updatedTodoItemIndex;
      // console.log(updatedTodoItemIndex);
      const currentTodoItems = [...state.todoItems];
      currentTodoItems[updatedTodoItemIndex] = updatedTodoItem;
      state.todoItems = [...currentTodoItems];
    },
    sortCategorys: (state, action) => {
      state.categorys = [...action.payload];
    },
    editCategoryNameAndTodoItemsCategory: (state, action) => {
      const initialCategoryName = action.payload.initialCategoryName;
      const initialCategoryNameIndex = action.payload.initialCategoryNameIndex;

      const updatedCategoryName = action.payload.updatedCategoryName;

      const currentCategorys = [...state.categorys];
      const currentTodoItems = [...state.todoItems];
      currentCategorys[initialCategoryNameIndex] = updatedCategoryName;
      const updatedCategorys = [...currentCategorys];
      const updatedTodoItems = currentTodoItems.map((value) => {
        if (value.category == initialCategoryName) {
          value.category = updatedCategoryName;
          return value;
        } else {
          return value;
        }
      });
      state.categorys = [...updatedCategorys];
      state.todoItems = [...updatedTodoItems];
      console.log(state.categorys);
      console.log(state.todoItems);
    },
  },
});

// States
export const selectTodoItems = (state) => state.todoItem.todoItems;
export const selectCurrentEditTodoItem = (state) =>
  state.todoItem.currentEditTodoItem;
export const selectCategorys = (state) => state.todoItem.categorys;
// Actions
export const {
  addTodoItem,
  addCategory,
  setCurrentEditTodoItem,
  editTodoItem,
  sortCategorys,
  editCategoryNameAndTodoItemsCategory,
} = todoItemSlice.actions;
// Reducer
export default todoItemSlice.reducer;
