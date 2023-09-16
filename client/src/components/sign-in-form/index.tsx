import { FC, useState } from "react";
import { useForm, useFormState } from "react-hook-form";
import clsx from "clsx";

import { ReactComponent as UserIcon } from "../../assets/user.svg";
import { useSignInMutation } from "../../services/auth";
import { dropAuthToken } from "../../utils/auth-token";
import { isServerError } from "../../utils/is-server-error";
import { Button } from "../button";
import { Input } from "../input";
import { PasswordInput } from "../password-input";
import { Typography } from "../typography";

import styles from "./index.module.scss";

type Props = {
  className?: string;
};

type Fields = {
  username: string;
  password: string;
};

const initialValues: Fields = {
  username: "",
  password: "",
};

export const SignInForm: FC<Props> = ({ className }) => {
  const [error, setError] = useState<string | undefined>();
  const [signIn, { isLoading, isError }] = useSignInMutation();
  const { control, register, handleSubmit } = useForm<Fields>({
    mode: "onSubmit",
    defaultValues: initialValues,
  });

  const { errors } = useFormState({ control });

  const usernameField = register("username", {
    required: "Username is required",
    validate: {
      isNotEmpty: (value) => value.trim().length > 0,
    },
  });

  const passwordField = register("password", {
    required: "Password is required",
    min: {
      value: 8,
      message: "Password must be at least 8 characters long",
    },
    pattern: {
      value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_\-=+]).*$/gm,
      message:
        "Password must contain at least 1 uppercase letter, 1 lowercase letter and 1 special character",
    },
    validate: {
      isNotEmpty: (value) => value.trim().length > 0,
    },
  });

  const onSubmit = handleSubmit(async ({ username, password }) => {
    try {
      await signIn({ username, password }).unwrap();
    } catch (error) {
      dropAuthToken();

      console.log(error);

      if (isServerError(error)) {
        setError(error.data.message);
      }
    }
  });

  return (
    <form
      className={clsx(className, styles.container)}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={onSubmit}
      autoComplete="off"
    >
      <Input
        startAddon={<UserIcon aria-hidden="true" />}
        label="Username"
        error={Boolean(errors.username)}
        errorText={errors.username?.message}
        autoFocus={true}
        {...usernameField}
      />

      <PasswordInput
        label="Password"
        error={Boolean(errors.password)}
        errorText={errors.password?.message}
        {...passwordField}
      />

      {error && (
        <Typography.Text size="m" className={styles.errors}>
          {error}
        </Typography.Text>
      )}

      <Button
        type="submit"
        size="xl"
        block={true}
        disabled={isLoading && !isError}
      >
        Login
      </Button>
    </form>
  );
};
