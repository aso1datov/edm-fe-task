import {
  type DetailedHTMLProps,
  type FocusEventHandler,
  forwardRef,
  type Key,
  type Ref,
  type SelectHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { mergeRefs } from "react-merge-refs";
import clsx from "clsx";

import { BaseInput, type BaseInputProps } from "../base-input";

import styles from "./index.module.scss";

type NativeSelectProps = Omit<
  DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>,
  "ref"
>;

export type SelectOption = {
  key?: Key;
  label: string;
  value: string | number;
};

export type BaseSelectProps = Omit<NativeSelectProps, "placeholder"> &
  Omit<BaseInputProps, "children" | "focused"> & {
    options?: SelectOption[];
    inputClassName?: string;
    wrapperRef?: Ref<HTMLDivElement>;
  };

export const BaseSelect = forwardRef<HTMLSelectElement, BaseSelectProps>(
  (
    {
      wrapperRef,
      className,
      id,
      label,
      error,
      errorText,
      inputClassName,
      startAddon,
      startAddonClassName,
      endAddon,
      endAddonClassName,
      bottomAddonStart,
      bottomAddonStartClassName,
      bottomAddonEnd,
      bottomAddonEndClassName,
      variant,
      required,
      disabled,
      value,
      containerProps,
      options,
      onFocus,
      onBlur,
      ...selectProps
    },
    forwardedRef
  ) => {
    const [focused, setFocused] = useState(false);
    const [filled, setFilled] = useState(false);
    const selectRef = useRef<HTMLSelectElement | null>(null);
    const ref = mergeRefs([forwardedRef, selectRef]);

    const handleFocus = useCallback<FocusEventHandler<HTMLSelectElement>>(
      (event) => {
        setFocused(true);

        if (typeof onFocus !== "undefined") {
          onFocus(event);
        }
      },
      [onFocus]
    );

    const handleBlur = useCallback<FocusEventHandler<HTMLSelectElement>>(
      (event) => {
        setFocused(false);

        if (typeof onBlur !== "undefined") {
          onBlur(event);
        }
      },
      [onBlur]
    );

    useEffect(() => {
      setFilled(Array.isArray(options) && options.length > 0);
    }, [options]);

    return (
      <BaseInput
        ref={wrapperRef}
        className={className}
        id={id}
        label={label}
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
        filled={filled}
        required={required}
        disabled={disabled}
        variant={variant}
        containerProps={containerProps}
      >
        <select
          id={id}
          ref={ref}
          className={clsx(inputClassName, styles.select)}
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          required={required}
          disabled={disabled}
          defaultValue={value}
          {...selectProps}
        >
          {options?.map(({ key, label, value }) => (
            <option key={key ?? value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </BaseInput>
    );
  }
);
