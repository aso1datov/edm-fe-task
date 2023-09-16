import type { FC, PropsWithChildren } from "react";
import clsx from "clsx";

import { TableContentContext, TableContentContextType } from "..";

import styles from "./index.module.scss";

type Props = PropsWithChildren<{
  className?: string;
  sticky?: boolean;
}>;

const contextValue: TableContentContextType = {
  variant: "header",
};

export const Header: FC<Props> = ({ children, className, sticky }) => (
  <TableContentContext.Provider value={contextValue}>
    <thead className={clsx(className, { [styles.sticky]: sticky })}>
      {children}
    </thead>
  </TableContentContext.Provider>
);
