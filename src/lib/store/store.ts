import { configureStore } from "@reduxjs/toolkit";
import testReducer from "../features/test/test-slice";
import authReducer from "../features/auth/auth-slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      test: testReducer,
      auth: authReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
