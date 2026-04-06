"use client";

import React, { useState } from "react";
import { Provider } from "react-redux";
import { makeStore, PreloadedStoreState } from "@/lib/store/store";

export default function StoreProvider({
  children,
  preloadedState,
}: {
  children: React.ReactNode;
  preloadedState?: PreloadedStoreState;
}) {
  const [store] = useState(() => makeStore(preloadedState));

  return <Provider store={store}>{children}</Provider>;
}
