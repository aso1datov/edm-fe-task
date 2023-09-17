import { type FC, useEffect, useState } from "react";
import { useForm, useFormState } from "react-hook-form";

import { Button } from "../../components/button";
import { FocusesSelect } from "../../components/focuses-select";
import { Input } from "../../components/input";
import { ManufacturersSelect } from "../../components/manufacturers-select";
import { Modal } from "../../components/modal";
import { Typography } from "../../components/typography";
import { useAppDispatch } from "../../hooks/use-app-dispatch";
import { useAppSelector } from "../../hooks/use-app-selector";
import { useUpdateShipMutation } from "../../services/ships";
import {
  getSelectedShip,
  getShowEditShipModalState,
} from "../../store/selectors/ships";
import {
  setSelectedShip,
  setShowEditShipModal,
} from "../../store/slices/ships";
import { Ship } from "../../types/ship";
import { isServerError } from "../../utils/is-server-error";

import styles from "./index.module.scss";

type Fields = {
  name: string;
  focus: Ship["focus"]["_id"];
  manufacturer: Ship["manufacturer"]["_id"];
  price: number;
};

export const EditShipModal: FC = () => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string | undefined>();
  const ship = useAppSelector(getSelectedShip);
  const show = useAppSelector(getShowEditShipModalState);
  const [updateShip, { isLoading }] = useUpdateShipMutation();

  const { control, setValue, reset, register, handleSubmit } = useForm<Fields>({
    mode: "onSubmit",
  });

  const { errors } = useFormState({ control });

  const nameField = register("name", {
    required: "Name is required",
    validate: {
      isNotEmpty: (value) => value.trim().length > 0,
    },
  });

  const focusField = register("focus", {
    required: "Focus is required",
  });

  const manufacturerField = register("manufacturer", {
    required: "Manufacturer is required",
  });

  const priceField = register("price", {
    required: "Price is required",
    valueAsNumber: true,
    validate: (value) => value > 0,
  });

  const handleClose = () => {
    dispatch(setSelectedShip(null));
    dispatch(setShowEditShipModal(false));
  };

  const onSubmit = handleSubmit(async (fields) => {
    try {
      await updateShip({ _id: ship!._id, ...fields }).unwrap();

      handleClose();
    } catch (error) {
      if (isServerError(error)) {
        setError(error.data.message);
      }
    }
  });

  useEffect(() => {
    if (ship === null) {
      reset();

      return;
    }

    setValue("name", ship.name);
    setValue("focus", ship.focus._id);
    setValue("manufacturer", ship.manufacturer._id);
    setValue("price", ship.price);
  }, [reset, setValue, ship]);

  return (
    <Modal
      show={show}
      centered={false}
      onClose={handleClose}
      keepMounted={true}
    >
      <Modal.Content>
        <Modal.Header className={styles.header}>
          <Typography.Title tag="h6" size="l" weight="bold">
            Edit ship
          </Typography.Title>
        </Modal.Header>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form className={styles.form} onSubmit={onSubmit}>
          <Input
            label="Name"
            error={Boolean(errors.name)}
            errorText={errors.name?.message}
            asterisk={true}
            {...nameField}
          />
          <FocusesSelect
            error={Boolean(errors.focus)}
            errorText={errors.focus?.message}
            asterisk={true}
            {...focusField}
          />
          <ManufacturersSelect
            error={Boolean(errors.manufacturer)}
            errorText={errors.manufacturer?.message}
            asterisk={true}
            {...manufacturerField}
          />
          <Input
            label="Price"
            type="number"
            error={Boolean(errors.price)}
            errorText={errors.price?.message}
            asterisk={true}
            {...priceField}
          />

          {error && (
            <Typography.Text size="m" className={styles.errors}>
              {error}
            </Typography.Text>
          )}

          <div className={styles.controls}>
            <Button
              size="l"
              variant="secondary"
              view="outlined"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              size="l"
              type="submit"
              variant="primary"
              disabled={isLoading}
            >
              Save
            </Button>
          </div>
        </form>
      </Modal.Content>
    </Modal>
  );
};
