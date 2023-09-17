import type { FC } from "react";

import { ShipsTable } from "../../components/ships-table";
import { AddShipModal } from "../../modals/add-ship-modal";
import { DeleteShipModal } from "../../modals/delete-ship-modal";
import { EditShipModal } from "../../modals/edit-ship-modal";

export const Ships: FC = () => {
  return (
    <>
      <ShipsTable />
      <AddShipModal />
      <EditShipModal />
      <DeleteShipModal />
    </>
  );
};
