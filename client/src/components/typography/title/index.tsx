import { forwardRef, type PropsWithChildren } from "react";
import clsx from "clsx";

import styles from "./index.module.scss";

export type TitleProps = PropsWithChildren<{
  tag: "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: "l" | "xl" | "xxl";
  weight?: "regular" | "medium" | "bold";
  className?: string;
}>;

type TitleRef = HTMLHeadingElement | HTMLDivElement;

export const Title = forwardRef<TitleRef, TitleProps>(
  (
    { tag: Component, children, className, size = "xxl", weight = "bold" },
    ref
  ) => (
    <Component
      ref={ref as never}
      className={clsx(className, styles.title, styles[size], styles[weight])}
    >
      {children}
    </Component>
  )
);
