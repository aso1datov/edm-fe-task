import { resetAuthState } from "../store/slices/auth";
import type { SignInPayload, SignInResponse } from "../types/auth";
import { dropAuthToken, saveAuthToken } from "../utils/auth-token";

import { api } from ".";

export const authApi = api.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    signIn: builder.mutation<SignInResponse, SignInPayload>({
      query: (body) => ({
        url: "/auth/signin",
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;

          saveAuthToken(data.accessToken);
        } catch (error) {
          dispatch(resetAuthState());
          dropAuthToken();
        }
      },
    }),
  }),
});

export const { useSignInMutation } = authApi;
