import { forwardRef, type PropsWithChildren } from "react";
import clsx from "clsx";

import styles from "./index.module.scss";

export type TextProps = PropsWithChildren<{
  tag?: "span" | "div" | "p";
  size?: "xs" | "s" | "m" | "l" | "xl" | "xxl";
  weight?: "regular" | "medium" | "bold";
  className?: string;
}>;

type TextRef = HTMLElement | HTMLSpanElement | HTMLParagraphElement;

export const Text = forwardRef<TextRef, TextProps>(
  (
    {
      children,
      className,
      size = "xl",
      weight = "regular",
      tag: Component = "span",
    },
    ref
  ) => (
    <Component
      ref={ref as never}
      className={clsx(className, styles.text, styles[size], styles[weight])}
    >
      {children}
    </Component>
  )
);
