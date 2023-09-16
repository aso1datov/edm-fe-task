import type { MutableRefObject, RefObject } from "react";

const DEFAULT_PORTAL_CONTAINER_SELECTOR = "body";

export const getDefaultPortalContainer = (): Element =>
  document.querySelector(DEFAULT_PORTAL_CONTAINER_SELECTOR)!;

export function setRef<T>(
  ref: RefObject<T> | ((instance: T | null) => void) | null | undefined,
  value: T | null
) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref) {
    (ref as MutableRefObject<T | null>).current = value;
  }
}
