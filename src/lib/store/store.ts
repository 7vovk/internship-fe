import { configureStore } from "@reduxjs/toolkit";
import testReducer from "../features/test/test-slice";
import type { AuthState } from "../features/auth/auth-slice";
import authReducer from "../features/auth/auth-slice";

export interface PreloadedStoreState {
  auth: AuthState;
}

export const makeStore = (preloadedState?: PreloadedStoreState) => {
  return configureStore({
    reducer: {
      test: testReducer,
      auth: authReducer,
    },
    preloadedState,
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
