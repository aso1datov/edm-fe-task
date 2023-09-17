import type { Focus } from "./focus";
import type { Manufacturer } from "./manufacturer";

export type Ship = {
  _id: string;
  name: string;
  focus: Focus;
  manufacturer: Manufacturer;
  price: number;
};

export type UpdateShipPayload = Pick<Ship, "_id" | "name" | "price"> & {
  focus: Focus["_id"];
  manufacturer: Manufacturer["_id"];
};
