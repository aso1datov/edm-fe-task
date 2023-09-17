import { RootState } from "../../types/store";

const getShipsState = (state: RootState) => state.ships;

export const getSelectedShip = (state: RootState) =>
  getShipsState(state).selectedShip;

export const getShowAddShipModalState = (state: RootState) =>
  getShipsState(state).showAddShipModal;

export const getShowEditShipModalState = (state: RootState) =>
  getShipsState(state).showEditShipModal;

export const getShowDeleteShipModalState = (state: RootState) =>
  getShipsState(state).showDeleteShipModal;
