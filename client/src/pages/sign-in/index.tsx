import { type FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Card } from "../../components/card";
import { Logo } from "../../components/logo";
import { SignInForm } from "../../components/sign-in-form";
import { useAppSelector } from "../../hooks/use-app-selector";
import { AppRoute } from "../../router/routes";
import { getAuthorizationStatus } from "../../store/selectors/auth";

import styles from "./index.module.scss";

export const SignIn: FC = () => {
  const navigate = useNavigate();
  const auth = useAppSelector(getAuthorizationStatus);

  useEffect(() => {
    if (auth) {
      navigate(AppRoute.Ships, { replace: true });
    }
  }, [auth, navigate]);

  return (
    <section className={styles.container}>
      <Logo className={styles.logo} />
      <Card className={styles.form}>
        <SignInForm />
      </Card>
    </section>
  );
};
