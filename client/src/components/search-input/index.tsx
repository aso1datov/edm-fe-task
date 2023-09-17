import {
  type DetailedHTMLProps,
  type FocusEventHandler,
  forwardRef,
  type InputHTMLAttributes,
  useCallback,
  useRef,
  useState,
} from "react";
import { mergeRefs } from "react-merge-refs";

import { BaseInput, type BaseInputProps } from "../base-input";

import styles from "./index.module.scss";

type NativeInputProps = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  "ref"
>;

export type SearchInputProps = NativeInputProps &
  Omit<BaseInputProps, "children" | "focused" | "filled" | "label">;

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      className,
      id,
      error,
      errorText,
      containerProps,
      startAddon,
      startAddonClassName,
      endAddon,
      endAddonClassName,
      bottomAddonStart,
      bottomAddonStartClassName,
      bottomAddonEnd,
      bottomAddonEndClassName,
      required,
      disabled,
      value,
      placeholder = "Search...",
      onFocus,
      onBlur,
      ...inputProps
    },
    forwardedRef
  ) => {
    const [focused, setFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const ref = mergeRefs([forwardedRef, inputRef]);

    const handleFocus = useCallback<FocusEventHandler<HTMLInputElement>>(
      (event) => {
        setFocused(true);

        if (typeof onFocus !== "undefined") {
          onFocus(event);
        }
      },
      [onFocus]
    );

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const handleBlur = useCallback<FocusEventHandler<HTMLInputElement>>(
      (event) => {
        setFocused(false);

        if (typeof onBlur !== "undefined") {
          onBlur(event);
        }
      },
      [onBlur]
    );

    return (
      <BaseInput
        label=""
        className={className}
        id={id}
        error={error}
        errorText={errorText}
        startAddon={startAddon}
        startAddonClassName={startAddonClassName}
        endAddon={endAddon}
        endAddonClassName={endAddonClassName}
        bottomAddonStart={bottomAddonStart}
        bottomAddonStartClassName={bottomAddonStartClassName}
        bottomAddonEnd={bottomAddonEnd}
        bottomAddonEndClassName={bottomAddonEndClassName}
        focused={focused}
        required={required}
        disabled={disabled}
        containerProps={containerProps}
      >
        <input
          ref={ref}
          type="search"
          className={styles.input}
          value={value}
          required={required}
          disabled={disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          autoComplete="off"
          {...inputProps}
        />
      </BaseInput>
    );
  }
);
