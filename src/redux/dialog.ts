import { DialogType, DialogProps } from "@/constants/dialog";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IDialogState {
  stack: Array<{
    type: DialogType;
    props?: DialogProps;
  }>;
}

const initialState: IDialogState = {
  stack: [],
};

export const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    showDialog: (
      state,
      action: PayloadAction<{
        type: DialogType;
        props?: DialogProps;
      }>
    ) => {
      const dialogExist = state.stack.find(
        (dialog) => dialog.type === action.payload.type
      );

      if (!dialogExist) {
        state.stack.push({
          type: action.payload.type,
          props: action.payload.props,
        });
      }
    },
    hideDialog: (state) => {
      state.stack.pop();
    },
    resetDialogStack: (state) => {
      state.stack = [];
    },
    removeDialog: (
      state,
      action: PayloadAction<{
        type: DialogType;
      }>
    ) => {
      state.stack = state.stack.filter(
        (dialog) => dialog.type !== action.payload.type
      );
    },
  },
});

export const { showDialog, hideDialog, resetDialogStack, removeDialog } =
  dialogSlice.actions;

const dialogReducer = dialogSlice.reducer;

export default dialogReducer;
