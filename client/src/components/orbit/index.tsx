import { memo, type PropsWithChildren } from "react";
import clsx from "clsx";

import styles from "./index.module.scss";

type Props = PropsWithChildren<{
  spin?: boolean;
  className?: string;
}>;

export const Orbit = memo<Props>(({ className, spin, children }) => (
  <div
    className={clsx(className, styles.container, { [styles.spin]: spin })}
    aria-hidden={true}
  >
    <div className={styles.placeholder}>{children}</div>
  </div>
));
