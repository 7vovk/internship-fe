import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  token: string;
}

const initialState: AuthState = {
  token: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    update: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    reset: (state) => {
      state.token = initialState.token;
    },
  },
});

export const { update, reset } = authSlice.actions;

export const getToken = (state: { auth: AuthState }) => state.auth.token;

export default authSlice.reducer;
