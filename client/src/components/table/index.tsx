import { createContext, type FC, type PropsWithChildren } from "react";
import clsx from "clsx";

import { Body } from "./body";
import { Cell } from "./cell";
import { Header } from "./header";
import { Row } from "./row";

import styles from "./index.module.scss";

type Props = PropsWithChildren<{
  className?: string;
}>;

type TableComponent = FC<Props> & {
  Body: typeof Body;
  Cell: typeof Cell;
  Header: typeof Header;
  Row: typeof Row;
};

export type TableContentContextType = {
  variant: "header" | "body";
};

export const TableContentContext =
  createContext<TableContentContextType | null>(null);

export const Table: TableComponent = ({ children, className }) => (
  <div className={styles.container}>
    <table className={clsx(className, styles.table)}>{children}</table>
  </div>
);

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Cell = Cell;
