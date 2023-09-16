import type { FC, HTMLAttributes } from "react";
import clsx from "clsx";

import styles from "./index.module.scss";

type Props = HTMLAttributes<HTMLTableRowElement>;

export const Row: FC<Props> = ({ children, className, ...props }) => (
  <tr className={clsx(className, styles.row)} {...props}>
    {children}
  </tr>
);
