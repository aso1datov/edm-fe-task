import { memo } from "react";
import clsx from "clsx";

import styles from "./index.module.scss";

type Props = {
  className?: string;
  animated?: boolean;
};

export const RocketShip = memo<Props>(({ className, animated }) => (
  <div
    className={clsx(className, styles.body, { [styles.animated]: animated })}
  >
    <div className={styles.tail}></div>
    <ul className={styles.flames}>
      <li></li>
      <li></li>
    </ul>
  </div>
));
