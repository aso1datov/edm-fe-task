import type { FC, PropsWithChildren } from "react";
import clsx from "clsx";

import styles from "./index.module.scss";

type Props = PropsWithChildren<{
  className?: string;
}>;

export const Content: FC<Props> = ({ className, children }) => (
  <div className={clsx(className, styles.container)}>
    <div className={styles.body}>{children}</div>
  </div>
);
