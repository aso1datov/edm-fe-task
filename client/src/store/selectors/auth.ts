import { RootState } from "../../types/store";

const getAuthState = (state: RootState) => state.auth;

export const getAuthorizationStatus = (state: RootState) =>
  getAuthState(state).auth;

export const getUserRole = (state: RootState) => getAuthState(state).roles;
