import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQueryWithReauth } from "./base-query";

export const api = createApi({
  reducerPath: "api",
  tagTypes: ["Ship", "Manufacturer", "Focus"],
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
