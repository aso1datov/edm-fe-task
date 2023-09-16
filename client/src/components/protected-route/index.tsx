import type { FC, PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

import { useAppSelector } from "../../hooks/use-app-selector";
import { AppRoute } from "../../router/routes";
import { getAuthorizationStatus } from "../../store/selectors/auth";

type Props = PropsWithChildren;

export const ProtectedRoute: FC<Props> = ({ children }) => {
  const auth = useAppSelector(getAuthorizationStatus);

  if (!auth) {
    return <Navigate to={AppRoute.SignIn} replace={true} />;
  }

  return children;
};
