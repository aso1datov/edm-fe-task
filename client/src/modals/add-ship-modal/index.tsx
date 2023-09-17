import { type FC, useState } from "react";
import { useForm, useFormState } from "react-hook-form";

import { Button } from "../../components/button";
import { FocusesSelect } from "../../components/focuses-select";
import { Input } from "../../components/input";
import { ManufacturersSelect } from "../../components/manufacturers-select";
import { Modal } from "../../components/modal";
import { Typography } from "../../components/typography";
import { useAppDispatch } from "../../hooks/use-app-dispatch";
import { useAppSelector } from "../../hooks/use-app-selector";
import { useAddNewShipMutation } from "../../services/ships";
import { getShowAddShipModalState } from "../../store/selectors/ships";
import { setShowAddShipModal } from "../../store/slices/ships";
import type { Ship } from "../../types/ship";
import { isServerError } from "../../utils/is-server-error";

import styles from "./index.module.scss";

type Fields = {
  name: string;
  focus: Ship["focus"]["_id"];
  manufacturer: Ship["manufacturer"]["_id"];
  price: number;
};

export const AddShipModal: FC = () => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string | undefined>();
  const show = useAppSelector(getShowAddShipModalState);
  const [addNewShip] = useAddNewShipMutation();

  const { control, register, reset, handleSubmit } = useForm<Fields>({
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
    dispatch(setShowAddShipModal(false));
    reset();
  };

  const onSubmit = handleSubmit(async (fields) => {
    try {
      await addNewShip(fields).unwrap();

      handleClose();
    } catch (error) {
      if (isServerError(error)) {
        setError(error.data.message);
      }
    }
  });

  return (
    <Modal show={show} onClose={handleClose} centered={false}>
      <Modal.Content>
        <Modal.Header>
          <Typography.Title tag="h6" size="l" weight="bold">
            Add new ship
          </Typography.Title>
        </Modal.Header>

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
            <Button variant="secondary" view="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Add ship
            </Button>
          </div>
        </form>
      </Modal.Content>
    </Modal>
  );
};
