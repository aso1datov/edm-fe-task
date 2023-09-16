import type { FC } from "react";

import { ShipsTable } from "../../components/ships-table";
import { AddShipModal } from "../../modals/add-ship-modal";

export const Ships: FC = () => {
  return (
    <>
      <ShipsTable />
      <AddShipModal />
    </>
  );
};
