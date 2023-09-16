import type { FC } from "react";
import { Outlet } from "react-router-dom";

import { APP_NAME } from "../../const/common";
import { Card } from "../card";
import { RocketShip } from "../rocket-ship";
import { Typography } from "../typography";

import styles from "./index.module.scss";

export const Layout: FC = () => {
  return (
    <section className={styles.layout}>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <RocketShip className={styles.rocket} animated={true} />
          <Typography.Title tag="h1">{APP_NAME}</Typography.Title>
        </header>

        <Card className={styles.content}>
          <Outlet />
        </Card>
      </div>
    </section>
  );
};
