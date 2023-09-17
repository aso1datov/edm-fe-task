import { useState } from "react";

import { Button } from "../../components/button";
import { Modal } from "../../components/modal";
import { Typography } from "../../components/typography";
import { useAppDispatch } from "../../hooks/use-app-dispatch";
import { useAppSelector } from "../../hooks/use-app-selector";
import { useDeleteShipMutation } from "../../services/ships";
import {
  getSelectedShip,
  getShowDeleteShipModalState,
} from "../../store/selectors/ships";
import {
  setSelectedShip,
  setShowDeleteShipModal,
} from "../../store/slices/ships";
import { isServerError } from "../../utils/is-server-error";

import styles from "./index.module.scss";

export const DeleteShipModal = () => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string | undefined>();
  const show = useAppSelector(getShowDeleteShipModalState);
  const ship = useAppSelector(getSelectedShip)!;
  const [deleteShip, { isLoading }] = useDeleteShipMutation();

  const handleClose = () => {
    dispatch(setShowDeleteShipModal(false));
    dispatch(setSelectedShip(null));
  };

  const handleDelete = async () => {
    try {
      await deleteShip(ship._id).unwrap();

      handleClose();
    } catch (error) {
      if (isServerError(error)) {
        setError(error.data.message);
      }
    }
  };

  return (
    <Modal show={show} onClose={handleClose}>
      <Modal.Content className={styles.modal}>
        <Modal.Header>
          <Typography.Title tag="h6" size="l" weight="bold">
            Delete Ship
          </Typography.Title>
        </Modal.Header>

        <div className={styles.content}>
          <Typography.Text size="l">
            Are you sure that you want to delete {ship?.name}?
          </Typography.Text>

          {error && (
            <Typography.Text size="m" className={styles.errors}>
              {error}
            </Typography.Text>
          )}

          <div className={styles.controls}>
            <Button
              size="m"
              variant="secondary"
              view="outlined"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              size="m"
              variant="primary"
              disabled={isLoading}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal.Content>
    </Modal>
  );
};
