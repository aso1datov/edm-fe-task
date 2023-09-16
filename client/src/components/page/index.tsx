import type { FC } from "react";
import { Outlet } from "react-router-dom";
import clsx from "clsx";

import styles from "./index.module.scss";

type Props = {
  className?: string;
};

export const Page: FC<Props> = ({ className }) => (
  <div className={clsx(className, styles.container)}>
    <Outlet />
  </div>
);
