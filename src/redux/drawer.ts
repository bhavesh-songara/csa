import { DrawerType, DrawerProps } from "@/constants/drawer";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IDrawerState {
  drawerStack: Array<{
    drawerType: DrawerType;
    drawerProps?: DrawerProps;
  }>;
}

const initialState: IDrawerState = {
  drawerStack: [],
};

export const drawerSlice = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    showDrawer: (
      state,
      action: PayloadAction<{
        drawerType: DrawerType;
        drawerProps?: DrawerProps;
      }>
    ) => {
      const drawerExist = state.drawerStack.find(
        (drawer) => drawer.drawerType === action.payload.drawerType
      );

      if (!drawerExist) {
        state.drawerStack.push({
          drawerType: action.payload.drawerType,
          drawerProps: action.payload.drawerProps,
        });
      }
    },
    hideDrawer: (state) => {
      state.drawerStack.pop();
    },
    resetDrawerStack: (state) => {
      state.drawerStack = [];
    },
    removeDrawer: (
      state,
      action: PayloadAction<{
        drawerType: DrawerType;
      }>
    ) => {
      state.drawerStack = state.drawerStack.filter(
        (drawer) => drawer.drawerType !== action.payload.drawerType
      );
    },
  },
});

export const { showDrawer, hideDrawer, resetDrawerStack, removeDrawer } =
  drawerSlice.actions;

const drawerReducer = drawerSlice.reducer;

export default drawerReducer;
