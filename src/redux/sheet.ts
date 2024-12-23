import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { SheetType, SheetProps } from "@/constants/sheet";

export interface ISheetState {
  sheetStack: Array<{
    sheetType: SheetType;
    sheetProps?: SheetProps;
  }>;
}

const initialState: ISheetState = {
  sheetStack: [],
};

export const sheetSlice = createSlice({
  name: "sheet",
  initialState,
  reducers: {
    showSheet: (
      state,
      action: PayloadAction<{
        sheetType: SheetType;
        sheetProps?: SheetProps;
      }>
    ) => {
      const sheetExist = state.sheetStack.find(
        (sheet) => sheet.sheetType === action.payload.sheetType
      );

      if (!sheetExist) {
        state.sheetStack.push({
          sheetType: action.payload.sheetType,
          sheetProps: action.payload.sheetProps,
        });
      }
    },
    hideSheet: (state) => {
      state.sheetStack.pop();
    },
    resetSheetStack: (state) => {
      state.sheetStack = [];
    },
    removeSheet: (
      state,
      action: PayloadAction<{
        sheetType: SheetType;
      }>
    ) => {
      state.sheetStack = state.sheetStack.filter(
        (sheet) => sheet.sheetType !== action.payload.sheetType
      );
    },
  },
});

export const { showSheet, hideSheet, resetSheetStack, removeSheet } =
  sheetSlice.actions;

const sheetReducer = sheetSlice.reducer;

export default sheetReducer;
