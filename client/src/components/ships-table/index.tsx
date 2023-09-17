import { type FC, useState } from "react";
import { useDispatch } from "react-redux";

import { GeneralPermission } from "../../permissions/general";
import { useGetAllShipsQuery } from "../../services/ships";
import {
  setSelectedShip,
  setShowEditShipModal,
} from "../../store/slices/ships";
import { Ship } from "../../types/ship";
import { Button } from "../button";
import { ProtectedComponent } from "../protected-component";
import { Table } from "../table";

import styles from "./index.module.scss";

type OrderField = keyof Ship;

type SortDirection = "asc" | "desc" | null;

export const ShipsTable: FC = () => {
  const dispatch = useDispatch();
  const [orderBy, setOrderBy] = useState<OrderField | null>(null);
  const [sortBy, setSortBy] = useState<SortDirection | null>(null);
  const { data = [] } = useGetAllShipsQuery({ sortBy, orderBy });

  const handleSortField = (field: OrderField) => (sort: SortDirection) => {
    setSortBy(sort);
    setOrderBy(sort === null ? null : field);
  };

  const handleShowEditShipModal = (selectedShip: Ship) => {
    dispatch(setSelectedShip(selectedShip));
    dispatch(setShowEditShipModal(true));
  };

  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.Cell sortable={true} onSortByChange={handleSortField("name")}>
            Name
          </Table.Cell>
          <Table.Cell sortable={true} onSortByChange={handleSortField("focus")}>
            Focus
          </Table.Cell>
          <Table.Cell
            sortable={true}
            onSortByChange={handleSortField("manufacturer")}
          >
            Manufacturer
          </Table.Cell>
          <Table.Cell sortable={true} onSortByChange={handleSortField("price")}>
            Price (CR)
          </Table.Cell>
          <Table.Cell />
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map((ship) => {
          const { _id, name, focus, manufacturer, price } = ship;

          return (
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
                      <Button
                        size="s"
                        variant="link"
                        onClick={() => handleShowEditShipModal(ship)}
                      >
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
          );
        })}
      </Table.Body>
    </Table>
  );
};
