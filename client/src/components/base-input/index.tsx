import { forwardRef, type ReactNode, useMemo } from "react";
import clsx from "clsx";

import { FormControl, type FormControlProps } from "../form-control/";

import styles from "./index.module.scss";

export type BaseInputProps = Omit<
  FormControlProps,
  "fieldClassName" | "bottomAddon" | "bottomAddonClassName"
> & {
  label: ReactNode;
  id?: string;
  focused?: boolean;
  disabled?: boolean;
  filled?: boolean;
  bottomAddonStart?: ReactNode;
  bottomAddonEnd?: ReactNode;
  bottomAddonStartClassName?: string;
  bottomAddonEndClassName?: string;
  error?: boolean;
  asterisk?: boolean;
  errorText?: string;
  required?: boolean;
};

export const BaseInput = forwardRef<HTMLDivElement, BaseInputProps>(
  (
    {
      focused = false,
      disabled = false,
      required = false,
      filled = false,
      id,
      label,
      children,
      className,
      bottomAddonStart,
      bottomAddonStartClassName,
      bottomAddonEnd,
      bottomAddonEndClassName,
      error,
      errorText,
      asterisk,
      startAddonClassName,
      endAddonClassName,
      ...formControlProps
    },
    forwardedRef
  ) => {
    const bottomAddonContent = useMemo(() => {
      const bottomStartContent =
        error && Boolean(errorText) ? errorText : bottomAddonStart;

      return (
        <>
          {bottomStartContent && (
            <div
              className={clsx(
                bottomAddonStartClassName,
                styles.bottomAddonStart
              )}
            >
              {bottomStartContent}
            </div>
          )}

          {bottomAddonEnd && (
            <div
              className={clsx(bottomAddonEndClassName, styles.bottomAddonEnd)}
            >
              {bottomAddonEnd}
            </div>
          )}
        </>
      );
    }, [
      bottomAddonStart,
      bottomAddonEnd,
      error,
      errorText,
      bottomAddonStartClassName,
      bottomAddonEndClassName,
    ]);

    return (
      <FormControl
        ref={forwardedRef}
        className={clsx(className, styles.primary, {
          [styles.focused]: focused,
          [styles.filled]: filled,
          [styles.disabled]: disabled,
          [styles.error]: error,
        })}
        fieldClassName={styles.field}
        bottomAddon={bottomAddonContent}
        bottomAddonClassName={clsx(styles.addon, styles.bottomAddon)}
        startAddonClassName={clsx(startAddonClassName, styles.addon)}
        endAddonClassName={clsx(endAddonClassName, styles.addon)}
        {...formControlProps}
      >
        <label htmlFor={id} className={styles.label}>
          <span className={styles.labelText}>
            {label}{" "}
            {(required || asterisk) && (
              <sup className={styles.asterisk} aria-hidden={true}>
                *
              </sup>
            )}
          </span>
        </label>

        <div className={styles.input}>{children}</div>
      </FormControl>
    );
  }
);
