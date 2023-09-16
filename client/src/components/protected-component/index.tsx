import {
  Children,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";

import { useHasPermission } from "../../hooks/use-has-permission";
import type { Permission } from "../../types/permissions";

type Props<T extends Record<string, unknown>> = {
  permission: Permission;
  children: ReactNode | { (permitted: boolean, props?: T): ReactElement };
};

export function ProtectedComponent<T extends Record<string, unknown>>({
  permission,
  children,
  ...props
}: Props<T>) {
  const permitted = useHasPermission(permission);

  if (typeof children === "function") {
    return children(permitted, props as T);
  }

  const content = Children.toArray(children);

  return permitted
    ? Children.map<ReactNode, ReactNode>(content, (child) => {
        if (isValidElement(child)) {
          return cloneElement(child, props as T);
        }
      })
    : null;
}
