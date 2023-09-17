import type { Focus } from "./focus";
import type { Manufacturer } from "./manufacturer";

export type Ship = {
  _id: string;
  name: string;
  focus: Focus;
  manufacturer: Manufacturer;
  price: number;
};

export type AddShipPayload = Pick<Ship, "name" | "price"> & {
  focus: Focus["_id"];
  manufacturer: Manufacturer["_id"];
};

export type UpdateShipPayload = AddShipPayload & Pick<Ship, "_id">;
