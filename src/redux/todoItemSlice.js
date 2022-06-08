import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// todoItem: {
//   title: "",         標題
//   notes: "",         備註
//   timeText: "",      時間
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
  selectedTodoItemsInCalendar: [],
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
    removeCategorysAndEditTodoItems: (state, action) => {
      const selectedCategorys = [...action.payload];
      const currentTodoItems = [...state.todoItems];
      const currentCategorys = [...state.categorys];
      // const updatedCategorys = currentCategorys
      //   .map((value) => {
      //     let notRemove = true;
      //     for (let i = 0; i < selectedCategorys.length; i++) {
      //       if (value == selectedCategorys[i]) {
      //         notRemove = false;
      //       }
      //     }
      //     if (notRemove) {
      //       return value;
      //     }
      //   })
      //   .filter((value) => value != undefined);
      const updatedCategorys = currentCategorys.filter((value) => {
        let shouldRetain = true;
        for (let i = 0; i < selectedCategorys.length; i++) {
          if (value == selectedCategorys[i]) {
            shouldRetain = false;
          }
        }
        if (shouldRetain) {
          return value;
        }
      });
      // const updatedTodoItems = currentTodoItems
      //   .map((value) => {
      //     for (let i = 0; i < updatedCategorys.length; i++) {
      //       if (value.category == updatedCategorys[i]) {
      //         return value;
      //       }
      //     }
      //   })
      //   .filter((value) => value != undefined);
      const updatedTodoItems = currentTodoItems.filter((value) => {
        for (let i = 0; i < updatedCategorys.length; i++) {
          if (value.category == updatedCategorys[i]) {
            return value;
          }
        }
      });
      state.categorys = [...updatedCategorys];
      state.todoItems = [...updatedTodoItems];
    },
    setCalendarSelectedTodoItems: (state, action) => {
      const selectedDate = action.payload;
      const shouldDisplayTodoItems = state.todoItems.filter(
        (value) => value.selectTime == selectedDate
      );
      state.selectedTodoItemsInCalendar = [...shouldDisplayTodoItems];
    },
  },
});

// States
export const selectTodoItems = (state) => state.todoItem.todoItems;
export const selectCurrentEditTodoItem = (state) =>
  state.todoItem.currentEditTodoItem;
export const selectCategorys = (state) => state.todoItem.categorys;
export const selectSelectedTodoItemsInCalendar = (state) =>
  state.todoItem.selectedTodoItemsInCalendar;
// Actions
export const {
  addTodoItem,
  addCategory,
  setCurrentEditTodoItem,
  editTodoItem,
  sortCategorys,
  editCategoryNameAndTodoItemsCategory,
  removeCategorysAndEditTodoItems,
  setCalendarSelectedTodoItems,
} = todoItemSlice.actions;
// Reducer
export default todoItemSlice.reducer;
