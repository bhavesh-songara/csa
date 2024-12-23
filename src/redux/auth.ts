import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  isAuthenticated: boolean;
  user: {
    _id?: string;
    name?: string;
    email?: string;
  };
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<any>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },

    logout: (state) => {
      state.isAuthenticated = false;
      state.user = {};
    },

    updateUserProfile: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, updateUserProfile } = authSlice.actions;

const authReducer = authSlice.reducer;

export default authReducer;
