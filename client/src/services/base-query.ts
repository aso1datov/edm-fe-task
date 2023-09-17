import {
  type BaseQueryFn,
  type FetchArgs,
  fetchBaseQuery,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";
import qs from "query-string";

import { API_BASE_URL } from "../const/common";
import { resetAuthState, setAuthState } from "../store/slices/auth";
import { SignInResponse } from "../types/auth";
import { getAuthToken, saveAuthToken } from "../utils/auth-token";

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  paramsSerializer(params) {
    return qs.stringify(params, { skipNull: true, skipEmptyString: true });
  },
  prepareHeaders(headers) {
    const token = getAuthToken();

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();

  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        const refreshResult = await baseQuery(
          {
            url: "/auth/refresh",
            method: "POST",
          },
          api,
          extraOptions
        );

        if (refreshResult.data) {
          const { accessToken, roles } = refreshResult.data as SignInResponse;

          saveAuthToken(accessToken);
          api.dispatch(setAuthState({ auth: true, roles }));
          console.log(setAuthState({ auth: true, roles }));
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(resetAuthState());
        }
      } finally {
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};
