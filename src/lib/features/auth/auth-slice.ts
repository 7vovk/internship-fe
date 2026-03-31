import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/store/store";

export interface AuthState {
  isAuthenticated: boolean;
  userId: string | null;
  userRoles: string | null;
}

export const initialAuthState: AuthState = {
  isAuthenticated: false,
  userId: null,
  userRoles: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    update: (state, action: PayloadAction<Partial<AuthState>>) => {
      Object.assign(state, action.payload);
    },
    reset: (state) => {
      Object.assign(state, initialAuthState);
    },
  },
});

export const { update, reset } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectUserId = (state: RootState) => state.auth.userId;
export const selectUserRoles = (state: RootState) => state.auth.userRoles;

export default authSlice.reducer;
