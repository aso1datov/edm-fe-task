import { forwardRef, useRef, useState } from "react";
import { mergeRefs } from "react-merge-refs";
import clsx from "clsx";

import { ReactComponent as ShowIcon } from "../../assets/eye.svg";
import { ReactComponent as HideIcon } from "../../assets/eye-crossed.svg";
import { ReactComponent as LockIcon } from "../../assets/lock-rounded.svg";
import { Input, type InputProps } from "../input";

import styles from "./index.module.scss";

export type PasswordInputProps = Omit<
  InputProps,
  | "type"
  | "endAddon"
  | "endAddonClassName"
  | "startAddon"
  | "startAddonClassName"
> & {
  value?: string;
};

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label, inputClassName, ...inputProps }, forwardedRef) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const ref = mergeRefs([inputRef, forwardedRef]);

    const togglePasswordVisibility = () => {
      setShowPassword((prevShow) => !prevShow);
    };

    return (
      <Input
        ref={ref}
        label={label}
        type={showPassword ? "text" : "password"}
        startAddon={<LockIcon aria-hidden="true" />}
        inputClassName={clsx(inputClassName, styles.input)}
        endAddon={
          <button
            type="button"
            className={clsx(styles.toggleButton, {
              [styles.active]: showPassword,
            })}
            onClick={togglePasswordVisibility}
            tabIndex={-1}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <HideIcon aria-hidden="true" />
            ) : (
              <ShowIcon aria-hidden="true" />
            )}
          </button>
        }
        endAddonClassName={styles.addon}
        {...inputProps}
      />
    );
  }
);
