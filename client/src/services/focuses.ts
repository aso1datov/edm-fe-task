import type { Focus } from "../types/focus";

import { api } from ".";

export const focusesApi = api.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    getAllFocuses: builder.query<Focus[], void>({
      query: () => "/focuses",
      providesTags: (result) =>
        Array.isArray(result)
          ? [
              ...result.map(({ _id }) => ({ type: "Focus", id: _id }) as const),
              { type: "Focus", id: "LIST" },
            ]
          : [{ type: "Focus", id: "LIST" }],
    }),
  }),
});

export const { useGetAllFocusesQuery, useLazyGetAllFocusesQuery } = focusesApi;
