import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TestState {
  value: string;
}

const initialState: TestState = {
  value: "",
};

export const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    update: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
    reset: (state) => {
      state.value = initialState.value;
    },
  },
});

export const { update, reset } = testSlice.actions;

export const selectValue = (state: { test: TestState }) => state.test.value;

export default testSlice.reducer;
