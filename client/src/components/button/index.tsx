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

export type ButtonProps = NativeButtonProps & {
  size?: "xs" | "s" | "m" | "l" | "xl";
  variant?: "primary" | "secondary" | "link";
  view?: "default" | "outlined";
  startAddon?: ReactNode;
  startAddonClassName?: string;
  endAddon?: ReactNode;
  endAddonClassName?: string;
  contentClassName?: string;
  block?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = "button",
      size = "m",
      variant = "primary",
      view = "default",
      block = false,
      className,
      startAddon,
      startAddonClassName,
      endAddon,
      endAddonClassName,
      contentClassName,
      children,
      ...buttonProps
    },
    ref
  ) => (
    <button
      ref={ref}
      type={type}
      className={clsx(
        className,
        styles.button,
        styles[variant],
        styles[view],
        styles[size],
        {
          [styles.block]: block,
        }
      )}
      {...buttonProps}
    >
      <span className={styles.container}>
        {startAddon && (
          <span
            className={clsx(
              startAddonClassName,
              styles.addon,
              styles.startAddon
            )}
          >
            {startAddon}
          </span>
        )}

        <span className={clsx(contentClassName, styles.content)}>
          {children}
        </span>

        {endAddon && (
          <span
            className={clsx(endAddonClassName, styles.addon, styles.endAddon)}
          >
            {endAddon}
          </span>
        )}
      </span>
    </button>
  )
);
