import { AuthTokenData } from "../types/auth";
import type { Role } from "../types/role";

import { parseJwt } from "./parse-jwt";

export function getRolesFromAuthToken(rawToken: string | null): Role[] {
  if (!rawToken) {
    return [];
  }

  const {
    user: { roles },
  } = parseJwt<AuthTokenData>(rawToken.trim());

  return roles;
}
