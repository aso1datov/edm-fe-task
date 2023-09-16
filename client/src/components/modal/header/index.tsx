import { type FC, type PropsWithChildren, useContext } from "react";
import clsx from "clsx";

import { Close } from "../close";
import { ModalContext } from "..";

import styles from "./index.module.scss";

type Props = PropsWithChildren<{
  className?: string;
}>;

export const Header: FC<Props> = ({ className, children }) => {
  const { onClose } = useContext(ModalContext);

  return (
    <div className={clsx(className, styles.container)}>
      <div className={styles.title}>{children}</div>
      <Close className={styles.close} onClick={onClose} />
    </div>
  );
};
