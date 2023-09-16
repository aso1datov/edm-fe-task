import type { FC } from "react";

import { Button } from "../../components/button";
import { FocusesSelect } from "../../components/focuses-select";
import { Input } from "../../components/input";
import { ManufacturersSelect } from "../../components/manufacturers-select";
import { Modal } from "../../components/modal";
import { Typography } from "../../components/typography";

import styles from "./index.module.scss";

export const AddShipModal: FC = () => {
  const show = false;

  const toggleModal = () => {};

  return (
    <Modal show={show} onClose={toggleModal}>
      <Modal.Content className={styles.modal}>
        <Modal.Header className={styles.header}>
          <Typography.Title tag="h6" size="l" weight="bold">
            Add new ship
          </Typography.Title>
        </Modal.Header>

        <form className={styles.form}>
          <Input label="Name" />
          <FocusesSelect />
          <ManufacturersSelect />
          <Input label="Price" type="number" />
        </form>

        <div className={styles.controls}>
          <Button variant="secondary" view="outlined" onClick={toggleModal}>
            Cancel
          </Button>
          <Button variant="primary" disabled={true}>
            Add ship
          </Button>
        </div>
      </Modal.Content>
    </Modal>
  );
};
