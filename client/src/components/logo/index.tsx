import type { FC } from "react";
import clsx from "clsx";

import { APP_NAME } from "../../const/common";
import { Orbit } from "../orbit";
import { RocketShip } from "../rocket-ship";
import { Typography } from "../typography";

import styles from "./index.module.scss";

type Props = {
  className?: string;
};

export const Logo: FC<Props> = ({ className }) => (
  <div className={clsx(className, styles.container)}>
    <Typography.Title tag="h1" className={styles.title}>
      {APP_NAME}
    </Typography.Title>

    <div className={styles.wrapper}>
      <Orbit className={styles.orbit} spin={true}>
        <RocketShip className={styles.rocket} animated={true} />
      </Orbit>
    </div>
  </div>
);
