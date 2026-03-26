import { configureStore } from "@reduxjs/toolkit";
import testReducer from "@/lib/features/test/test-slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      test: testReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
