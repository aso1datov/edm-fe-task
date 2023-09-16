import { forwardRef, type ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { getDefaultPortalContainer, setRef } from "./utils";

export type PortalProps = {
  children?: ReactNode;
  getPortalContainer?: () => Element;
};

export const Portal = forwardRef<Element, PortalProps>(
  (
    { getPortalContainer = getDefaultPortalContainer, children },
    forwardedRef
  ) => {
    const [mountNode, setMountNode] = useState<Element | null>(null);

    useEffect(() => {
      setMountNode(getPortalContainer());
    }, [getPortalContainer]);

    useEffect(() => {
      if (mountNode) {
        setRef(forwardedRef, mountNode);

        return () => {
          setRef(forwardedRef, null);
        };
      }

      return () => null;
    }, [forwardedRef, mountNode]);

    return mountNode ? createPortal(children, mountNode) : mountNode;
  }
);
