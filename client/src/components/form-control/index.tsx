import {
  type DetailedHTMLProps,
  forwardRef,
  type HTMLAttributes,
  type PropsWithChildren,
  type ReactNode,
} from "react";
import clsx from "clsx";

import styles from "./index.module.scss";

type NativeContainerProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export type FormControlProps = PropsWithChildren<{
  className?: string;
  startAddon?: ReactNode;
  startAddonClassName?: string;
  endAddon?: ReactNode;
  endAddonClassName?: string;
  bottomAddon?: ReactNode;
  bottomAddonClassName?: string;
  fieldClassName?: string;
  containerProps?: Omit<NativeContainerProps, "ref">;
}>;

export const FormControl = forwardRef<HTMLDivElement, FormControlProps>(
  (
    {
      className,
      startAddon,
      startAddonClassName,
      endAddon,
      endAddonClassName,
      bottomAddon,
      bottomAddonClassName,
      children,
      fieldClassName,
      containerProps,
    },
    forwardedRef
  ) => (
    <div
      ref={forwardedRef}
      className={clsx(className, styles.container)}
      {...containerProps}
    >
      <div className={clsx(fieldClassName, styles.field)}>
        {startAddon && (
          <div
            className={clsx(
              startAddonClassName,
              styles.addon,
              styles.startAddon
            )}
          >
            {startAddon}
          </div>
        )}

        <div className={styles.content}>{children}</div>

        {endAddon && (
          <div
            className={clsx(endAddonClassName, styles.addon, styles.endAddon)}
          >
            {endAddon}
          </div>
        )}
      </div>

      {bottomAddon && (
        <div
          className={clsx(
            bottomAddonClassName,
            styles.addon,
            styles.bottomAddon
          )}
        >
          {bottomAddon}
        </div>
      )}
    </div>
  )
);
