import type { Ship } from "../types/ship";

import { api } from ".";

export const shipsApi = api.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    getAllShips: builder.query<Ship[], void>({
      query: () => "/ships",
      providesTags: (result) =>
        Array.isArray(result)
          ? [
              ...result.map(({ _id }) => ({ type: "Ship", id: _id }) as const),
              { type: "Ship", id: "LIST" },
            ]
          : [{ type: "Ship", id: "LIST" }],
    }),
  }),
});

export const { useGetAllShipsQuery, useLazyGetAllShipsQuery } = shipsApi;
