import { type FC, useEffect } from "react";
import { Outlet } from "react-router-dom";
import clsx from "clsx";

import { useAppDispatch } from "../../hooks/use-app-dispatch";
import { useLazyValidateTokenQuery } from "../../services/auth";
import { resetAuthState } from "../../store/slices/auth";
import { dropAuthToken, getAuthToken } from "../../utils/auth-token";

import styles from "./index.module.scss";

type Props = {
  className?: string;
};

export const Page: FC<Props> = ({ className }) => {
  const dispatch = useAppDispatch();
  const [validateTrigger, { isError }] = useLazyValidateTokenQuery();

  useEffect(() => {
    if (getAuthToken()) {
      void validateTrigger();
    }
  }, [validateTrigger]);

  useEffect(() => {
    if (isError) {
      dispatch(resetAuthState());
      dropAuthToken();
    }
  }, [isError, dispatch]);

  return (
    <div className={clsx(className, styles.container)}>
      <Outlet />
    </div>
  );
};
