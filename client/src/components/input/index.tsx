import {
  type AnimationEventHandler,
  type ChangeEventHandler,
  type DetailedHTMLProps,
  type FocusEventHandler,
  forwardRef,
  type InputHTMLAttributes,
  type Ref,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { mergeRefs } from "react-merge-refs";
import clsx from "clsx";
import { useDidMount } from "rooks";

import { BaseInput, type BaseInputProps } from "../base-input";

import { isEmptyInputValue, isFilled } from "./utils";

import styles from "./index.module.scss";

type NativeInputProps = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  "ref"
>;

export type InputProps = Omit<NativeInputProps, "placeholder"> &
  Omit<BaseInputProps, "children" | "focused" | "filled"> & {
    inputClassName?: string;
    wrapperRef?: Ref<HTMLDivElement>;
  };

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = "text",
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
      onChange,
      onFocus,
      onBlur,
      onAnimationStart,
      ...inputProps
    },
    forwardedRef
  ) => {
    const [focused, setFocused] = useState(false);
    const [filled, setFilled] = useState(!isEmptyInputValue(value));
    const inputRef = useRef<HTMLInputElement | null>(null);
    const ref = mergeRefs([forwardedRef, inputRef]);

    const checkFilled = useCallback((inputEl: HTMLInputElement | null) => {
      setFilled(isFilled(inputEl));
    }, []);

    const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
      (event) => {
        checkFilled(inputRef.current || event.target);

        if (typeof onChange !== "undefined") {
          onChange(event);
        }
      },
      [checkFilled, onChange]
    );

    const handleFocus = useCallback<FocusEventHandler<HTMLInputElement>>(
      (event) => {
        setFocused(true);

        if (typeof onFocus !== "undefined") {
          onFocus(event);
        }
      },
      [onFocus]
    );

    const handleBlur = useCallback<FocusEventHandler<HTMLInputElement>>(
      (event) => {
        setFocused(false);

        if (typeof onBlur !== "undefined") {
          onBlur(event);
        }
      },
      [onBlur]
    );

    const handleAutoFill = useCallback<AnimationEventHandler<HTMLInputElement>>(
      (event) => {
        // Provide a fake value as Chrome might not let you access it for security reasons.
        checkFilled(
          event.animationName.includes("auto-fill-cancel")
            ? inputRef.current
            : ({ value: "x" } as HTMLInputElement)
        );

        if (typeof onAnimationStart !== "undefined") {
          onAnimationStart(event);
        }
      },
      [checkFilled, onAnimationStart]
    );

    useLayoutEffect(() => {
      if (!focused) {
        checkFilled(inputRef.current);
      }
    }, [focused, checkFilled, value]);

    useDidMount(() => {
      checkFilled(inputRef.current);
    });

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
        <input
          id={id}
          ref={ref}
          type={type}
          className={clsx(inputClassName, styles.input)}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          required={required}
          disabled={disabled}
          onAnimationStart={handleAutoFill}
          {...inputProps}
        />
      </BaseInput>
    );
  }
);
