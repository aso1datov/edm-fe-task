import type { FC, PropsWithChildren } from "react";
import clsx from "clsx";

import styles from "./index.module.scss";

export type CardProps = PropsWithChildren<{
  className?: string;
}>;

export const Card: FC<CardProps> = ({ children, className }) => (
  <div className={clsx(className, styles.card)}>{children}</div>
);
