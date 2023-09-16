import { useEffect, useState } from "react";

import { permissions } from "../permissions";
import { getUserRole } from "../store/selectors/auth";
import type { Permission, Permissions } from "../types/permissions";
import type { Role } from "../types/role";

import { useAppSelector } from "./use-app-selector";

function hasRoleWithPermission(permission: Permission, roles: Role[]) {
  if (roles.length === 0) {
    return false;
  }

  for (let i = 0; i < roles.length; i++) {
    const role = roles[i];

    if ((permissions[role] as Permissions).includes(permission)) {
      return true;
    }
  }

  return false;
}

export function useHasPermission(permission: Permission) {
  const roles = useAppSelector(getUserRole);
  const [permitted, setPermitted] = useState(
    hasRoleWithPermission(permission, roles)
  );

  useEffect(() => {
    setPermitted(hasRoleWithPermission(permission, roles));
  }, [roles, permission]);

  return permitted;
}
