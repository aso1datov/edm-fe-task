import { Role } from "../types/role";

import { GeneralPermission } from "./general";

export const permissions = {
  [Role.Viewer]: [GeneralPermission.Order],
  [Role.Editor]: [
    GeneralPermission.Add,
    GeneralPermission.Edit,
    GeneralPermission.Delete,
  ],
};
