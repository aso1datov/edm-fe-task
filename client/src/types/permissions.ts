import { permissions } from "../permissions";

import { Role } from "./role";

export type Permission = (typeof permissions)[Role] extends Array<infer T>
  ? T
  : never;

export type Permissions = Permission[];
