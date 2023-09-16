import type { Role } from "./role";

export type AuthTokenData = {
  exp: number;
  iat: number;
  user: {
    id: string;
    username: string;
    roles: Role[];
  };
};

export type SignInResponse = {
  id: string;
  username: string;
  roles: Role[];
  accessToken: string;
};

export type SignInPayload = {
  username: string;
  password: string;
};
