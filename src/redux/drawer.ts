import { DrawerType, DrawerProps } from "@/constants/drawer";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IDrawerState {
  stack: Array<{
    type: DrawerType;
    props?: DrawerProps;
  }>;
}

const initialState: IDrawerState = {
  stack: [],
};

export const drawerSlice = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    showDrawer: (
      state,
      action: PayloadAction<{
        type: DrawerType;
        props?: DrawerProps;
      }>
    ) => {
      const drawerExist = state.stack.find(
        (drawer) => drawer.type === action.payload.type
      );

      if (!drawerExist) {
        state.stack.push({
          type: action.payload.type,
          props: action.payload.props,
        });
      }
    },
    hideDrawer: (state) => {
      state.stack.pop();
    },
    resetDrawerStack: (state) => {
      state.stack = [];
    },
    removeDrawer: (
      state,
      action: PayloadAction<{
        type: DrawerType;
      }>
    ) => {
      state.stack = state.stack.filter(
        (drawer) => drawer.type !== action.payload.type
      );
    },
  },
});

export const { showDrawer, hideDrawer, resetDrawerStack, removeDrawer } =
  drawerSlice.actions;

const drawerReducer = drawerSlice.reducer;

export default drawerReducer;
