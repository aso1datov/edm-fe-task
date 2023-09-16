import {
  type FC,
  type TdHTMLAttributes,
  type ThHTMLAttributes,
  useContext,
} from "react";
import clsx from "clsx";

import { TableContentContext } from "..";

import styles from "./index.module.scss";

type Props = TdHTMLAttributes<HTMLTableCellElement> &
  ThHTMLAttributes<HTMLTableCellElement>;

export const Cell: FC<Props> = ({
  children,
  className,

  ...cellProps
}) => {
  const { variant } = useContext(TableContentContext)!;
  const Tag = variant === "header" ? "th" : "td";

  return (
    <Tag {...cellProps} className={clsx(className, styles.cell, styles[Tag])}>
      {children}
    </Tag>
  );
};
