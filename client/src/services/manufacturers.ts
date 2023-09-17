import type { Manufacturer } from "../types/manufacturer";

import { api } from ".";

export const manufacturersApi = api.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    getAllManufacturers: builder.query<Manufacturer[], void>({
      query: () => "/manufacturers",
      providesTags: (result) =>
        Array.isArray(result)
          ? [
              ...result.map(
                ({ _id }) => ({ type: "Manufacturer", id: _id }) as const
              ),
              { type: "Manufacturer", id: "LIST" },
            ]
          : [{ type: "Manufacturer", id: "LIST" }],
    }),
  }),
});

export const { useGetAllManufacturersQuery, useLazyGetAllManufacturersQuery } =
  manufacturersApi;
