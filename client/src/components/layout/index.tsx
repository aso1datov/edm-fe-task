import type { FC } from "react";
import { Outlet } from "react-router-dom";

import { ReactComponent as SignOutIcon } from "../../assets/sign-out.svg";
import { APP_NAME } from "../../const/common";
import { useAppDispatch } from "../../hooks/use-app-dispatch";
import { resetAuthState } from "../../store/slices/auth";
import { dropAuthToken } from "../../utils/auth-token";
import { Card } from "../card";
import { IconButton } from "../icon-button";
import { RocketShip } from "../rocket-ship";
import { Typography } from "../typography";

import styles from "./index.module.scss";

export const Layout: FC = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(resetAuthState());
    dropAuthToken();
  };

  return (
    <section className={styles.layout}>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <RocketShip className={styles.rocket} animated={true} />
          <Typography.Title tag="h1">{APP_NAME}</Typography.Title>

          <IconButton className={styles.logout} onClick={handleLogout}>
            <SignOutIcon />
          </IconButton>
        </header>

        <Card className={styles.content}>
          <Outlet />
        </Card>
      </div>
    </section>
  );
};
