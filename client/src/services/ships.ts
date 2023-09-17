import { SortDirection } from "../types/common";
import type { AddShipPayload, Ship, UpdateShipPayload } from "../types/ship";

import { api } from ".";

export const shipsApi = api.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    getAllShips: builder.query<
      Ship[],
      { query: string; sortBy: SortDirection; orderBy: keyof Ship | null }
    >({
      query: (params) => ({
        url: "/ships",
        method: "GET",
        params,
      }),
      providesTags: (result) =>
        Array.isArray(result)
          ? [
              ...result.map(({ _id }) => ({ type: "Ship", id: _id }) as const),
              { type: "Ship", id: "LIST" },
            ]
          : [{ type: "Ship", id: "LIST" }],
    }),
    addNewShip: builder.mutation<Ship, AddShipPayload>({
      query: (body) => ({
        url: "/ships",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Ship", id: "LIST" }],
    }),
    updateShip: builder.mutation<Ship, UpdateShipPayload>({
      query: ({ _id, ...body }) => ({
        url: `/ships/${_id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (_result, _error, { _id }) => [
        { type: "Ship", id: _id },
      ],
    }),
    deleteShip: builder.mutation<Ship, string>({
      query: (id) => ({
        url: `/ships/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "Ship", id }],
    }),
  }),
});

export const {
  useGetAllShipsQuery,
  useAddNewShipMutation,
  useUpdateShipMutation,
  useLazyGetAllShipsQuery,
  useDeleteShipMutation,
} = shipsApi;
