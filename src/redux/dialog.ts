import { DialogType, DialogProps } from "@/constants/dialog";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IDialogState {
  dialogStack: Array<{
    dialogType: DialogType;
    dialogProps?: DialogProps;
  }>;
}

const initialState: IDialogState = {
  dialogStack: [],
};

export const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    showDialog: (
      state,
      action: PayloadAction<{
        dialogType: DialogType;
        dialogProps?: DialogProps;
      }>
    ) => {
      const dialogExist = state.dialogStack.find(
        (dialog) => dialog.dialogType === action.payload.dialogType
      );

      if (!dialogExist) {
        state.dialogStack.push({
          dialogType: action.payload.dialogType,
          dialogProps: action.payload.dialogProps,
        });
      }
    },
    hideDialog: (state) => {
      state.dialogStack.pop();
    },
    resetDialogStack: (state) => {
      state.dialogStack = [];
    },
    removeDialog: (
      state,
      action: PayloadAction<{
        dialogType: DialogType;
      }>
    ) => {
      state.dialogStack = state.dialogStack.filter(
        (dialog) => dialog.dialogType !== action.payload.dialogType
      );
    },
  },
});

export const { showDialog, hideDialog, resetDialogStack, removeDialog } =
  dialogSlice.actions;

const dialogReducer = dialogSlice.reducer;

export default dialogReducer;
