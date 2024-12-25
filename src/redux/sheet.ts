import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { SheetType, SheetProps } from "@/constants/sheet";

export interface ISheetState {
  stack: Array<{
    type: SheetType;
    props?: SheetProps;
  }>;
}

const initialState: ISheetState = {
  stack: [],
};

export const sheetSlice = createSlice({
  name: "sheet",
  initialState,
  reducers: {
    showSheet: (
      state,
      action: PayloadAction<{
        type: SheetType;
        props?: SheetProps;
      }>
    ) => {
      const sheetExist = state.stack.find(
        (sheet) => sheet.type === action.payload.type
      );

      if (!sheetExist) {
        state.stack.push({
          type: action.payload.type,
          props: action.payload.props,
        });
      }
    },
    hideSheet: (state) => {
      state.stack.pop();
    },
    resetSheetStack: (state) => {
      state.stack = [];
    },
    removeSheet: (
      state,
      action: PayloadAction<{
        type: SheetType;
      }>
    ) => {
      state.stack = state.stack.filter(
        (sheet) => sheet.type !== action.payload.type
      );
    },
  },
});

export const { showSheet, hideSheet, resetSheetStack, removeSheet } =
  sheetSlice.actions;

const sheetReducer = sheetSlice.reducer;

export default sheetReducer;
