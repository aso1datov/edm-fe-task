import { createSlice } from "@reduxjs/toolkit";

import { authApi } from "../../services/auth";
import type { Role } from "../../types/role";
import { getAuthToken } from "../../utils/auth-token";
import { getRoleFromAuthToken } from "../../utils/get-role-from-auth-token";

type State = {
  auth: boolean;
  roles: Role[];
};

const initialState: State = {
  auth: false,
  roles: getRoleFromAuthToken(getAuthToken()),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthState(state) {
      state.auth = false;
      state.roles = [];
    },
  },
  extraReducers(builder) {
    builder.addMatcher(
      authApi.endpoints.signIn.matchFulfilled,
      (state, action) => {
        state.auth = true;
        state.roles = action.payload.roles;
      }
    );
  },
});

export const { resetAuthState } = authSlice.actions;

export const auth = authSlice.reducer;
