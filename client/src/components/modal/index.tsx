import {
  createContext,
  type FC,
  type ReactNode,
  useEffect,
  useMemo,
} from "react";
import FocusLock from "react-focus-lock";
import { CSSTransition } from "react-transition-group";
import clsx from "clsx";
import { useWillUnmount } from "rooks";

import { lockBodyScroll, releaseBodyScroll } from "../../utils/body-scroll";
import { Portal, PortalProps } from "../portal";

import { Close } from "./close";
import { Content } from "./content";
import { Header } from "./header";
import { Overlay } from "./overlay";

import styles from "./index.module.scss";

type ModalContextType = {
  onClose: () => void;
};

type ModalComponent = FC<ModalProps> & {
  Content: typeof Content;
  Close: typeof Close;
  Header: typeof Header;
  Overlay: typeof Overlay;
};

export type ModalProps = Pick<PortalProps, "getPortalContainer"> & {
  show: boolean;
  className?: string;
  dialogClassName?: string;
  centered?: boolean;
  overlay?: boolean;
  autoFocus?: boolean;
  returnFocus?: boolean;
  disableFocusLock?: boolean;
  keepMounted?: boolean;
  children?: ReactNode;
  onClose: () => void;
};

const noop = () => {};

export const ModalContext = createContext<ModalContextType>({
  onClose: noop,
});

const MODAL_APPEARANCE_TIMEOUT = 150;

export const Modal: ModalComponent = ({
  show,
  className,
  dialogClassName,
  children,
  overlay = true,
  centered = true,
  autoFocus = true,
  returnFocus = true,
  disableFocusLock = false,
  keepMounted = false,
  onClose,
  getPortalContainer,
}) => {
  const ctx = useMemo<ModalContextType>(() => ({ onClose }), [onClose]);

  useEffect(() => {
    if (show) {
      lockBodyScroll();
    } else {
      releaseBodyScroll();
    }
  }, [show]);

  useWillUnmount(releaseBodyScroll);

  return (
    <Portal getPortalContainer={getPortalContainer}>
      <ModalContext.Provider value={ctx}>
        <FocusLock
          autoFocus={autoFocus}
          returnFocus={returnFocus}
          disabled={disableFocusLock || !show}
        >
          {overlay && (
            <Overlay show={show} timeout={MODAL_APPEARANCE_TIMEOUT} />
          )}

          <div
            className={clsx(className, styles.container, {
              [styles.hidden]: !show,
            })}
            role="dialog"
            aria-modal="true"
            tabIndex={-1}
          >
            <div
              className={clsx(dialogClassName, styles.dialog, {
                [styles.centered]: centered,
              })}
            >
              <CSSTransition
                in={show}
                timeout={MODAL_APPEARANCE_TIMEOUT}
                appear={true}
                classNames={styles}
                unmountOnExit={!keepMounted}
              >
                {children}
              </CSSTransition>
            </div>
          </div>
        </FocusLock>
      </ModalContext.Provider>
    </Portal>
  );
};

Modal.Close = Close;
Modal.Content = Content;
Modal.Header = Header;
Modal.Overlay = Overlay;
