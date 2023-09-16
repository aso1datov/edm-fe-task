import type { FC, PropsWithChildren } from "react";

import { TableContentContext, TableContentContextType } from "..";

type Props = PropsWithChildren<{
  className?: string;
}>;

const contextValue: TableContentContextType = {
  variant: "body",
};

export const Body: FC<Props> = ({ children, className }) => (
  <TableContentContext.Provider value={contextValue}>
    <tbody className={className}>{children}</tbody>
  </TableContentContext.Provider>
);
