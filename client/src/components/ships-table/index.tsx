import type { FC } from "react";

import { GeneralPermission } from "../../permissions/general";
import { useGetAllShipsQuery } from "../../services/ships";
import { Button } from "../button";
import { ProtectedComponent } from "../protected-component";
import { Table } from "../table";

import styles from "./index.module.scss";

export const ShipsTable: FC = () => {
  const { data = [] } = useGetAllShipsQuery();

  // TODO: Add loader

  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.Cell>Name</Table.Cell>
          <Table.Cell>Focus</Table.Cell>
          <Table.Cell>Manufacturer</Table.Cell>
          <Table.Cell>Price (CR)</Table.Cell>
          <Table.Cell />
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map(({ _id, name, focus, manufacturer, price }) => (
          <Table.Row key={_id}>
            <Table.Cell>{name}</Table.Cell>
            <Table.Cell>{focus.name}</Table.Cell>
            <Table.Cell>{manufacturer.name}</Table.Cell>
            <Table.Cell>{price.toLocaleString()}</Table.Cell>
            <Table.Cell>
              <ul className={styles.actions}>
                <ProtectedComponent permission={GeneralPermission.Order}>
                  <li>
                    <Button size="s" variant="link">
                      Order
                    </Button>
                  </li>
                </ProtectedComponent>
                <ProtectedComponent permission={GeneralPermission.Edit}>
                  <li>
                    <Button size="s" variant="link">
                      Edit
                    </Button>
                  </li>
                </ProtectedComponent>
                <ProtectedComponent permission={GeneralPermission.Delete}>
                  <li>
                    <Button size="s" variant="link">
                      Delete
                    </Button>
                  </li>
                </ProtectedComponent>
              </ul>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
