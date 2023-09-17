import type { FC } from "react";
import { CSSTransition } from "react-transition-group";
import clsx from "clsx";

import styles from "./index.module.scss";

type Props = {
  show: boolean;
  timeout?: number;
  className?: string;
};

const DEFAULT_APPEARANCE_TIMEOUT = 150;

export const Overlay: FC<Props> = ({
  show,
  timeout = DEFAULT_APPEARANCE_TIMEOUT,
  className,
}) => (
  <CSSTransition
    in={show}
    appear={true}
    classNames={styles}
    timeout={timeout}
    unmountOnExit={true}
  >
    <div className={clsx(styles.overlay, className)} aria-hidden="true" />
  </CSSTransition>
);
