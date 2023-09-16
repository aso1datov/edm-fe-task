import { configureStore } from "@reduxjs/toolkit";

import { IS_DEVELOPMENT } from "../const/common";
import { api } from "../services";

import { auth } from "./slices/auth";

export const store = configureStore({
  reducer: {
    auth,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
  devTools: IS_DEVELOPMENT,
});
