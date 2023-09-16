import {
  type ButtonHTMLAttributes,
  type DetailedHTMLProps,
  forwardRef,
  type ReactNode,
} from "react";
import clsx from "clsx";

import styles from "./index.module.scss";

type NativeButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export type IconButtonProps = NativeButtonProps & {
  children: ReactNode;
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ children, className, title, ...props }, forwardedRef) => (
    <button
      type="button"
      ref={forwardedRef}
      className={clsx(className, styles.button)}
      title={title}
      aria-label={title}
      {...props}
    >
      {children}
    </button>
  )
);
