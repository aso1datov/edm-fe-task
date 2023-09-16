import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { API_BASE_URL } from "../const/common";
import { getAuthToken } from "../utils/auth-token";

export const api = createApi({
  reducerPath: "api",
  tagTypes: ["Ship", "Manufacturer", "Focus"],
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders(headers) {
      const token = getAuthToken();

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: () => ({}),
});
