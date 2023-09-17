import { configureStore } from "@reduxjs/toolkit";

import { IS_DEVELOPMENT } from "../const/common";
import { api } from "../services";

import { auth } from "./slices/auth";
import { ships } from "./slices/ships";

export const store = configureStore({
  reducer: {
    auth,
    ships,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
  devTools: IS_DEVELOPMENT,
});
