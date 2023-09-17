import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { Role } from "../../types/role";
import { getAuthToken } from "../../utils/auth-token";
import { getRolesFromAuthToken } from "../../utils/get-roles-from-auth-token";

type State = {
  auth: boolean;
  roles: Role[];
};

const initialState: State = {
  auth: getAuthToken() !== null,
  roles: getRolesFromAuthToken(getAuthToken()),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState(
      state,
      action: PayloadAction<{ auth: boolean; roles: Role[] }>
    ) {
      state.auth = action.payload.auth;
      state.roles = action.payload.roles;
    },
    resetAuthState(state) {
      state.auth = false;
      state.roles = [];
    },
  },
});

export const { setAuthState, resetAuthState } = authSlice.actions;

export const auth = authSlice.reducer;
