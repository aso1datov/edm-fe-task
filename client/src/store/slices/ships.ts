import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { Ship } from "../../types/ship";

type State = {
  selectedShip: Ship | null;
  showAddShipModal: boolean;
  showEditShipModal: boolean;
  showDeleteShipModal: boolean;
};

const initialState: State = {
  selectedShip: null,
  showAddShipModal: false,
  showEditShipModal: false,
  showDeleteShipModal: false,
};

const shipsSlice = createSlice({
  name: "ships",
  initialState,
  reducers: {
    setShowEditShipModal: (state, action: PayloadAction<boolean>) => {
      state.showEditShipModal = action.payload;
    },
    setShowAddShipModal: (state, action: PayloadAction<boolean>) => {
      state.showAddShipModal = action.payload;
    },
    setShowDeleteShipModal: (state, action: PayloadAction<boolean>) => {
      state.showDeleteShipModal = action.payload;
    },
    setSelectedShip: (state, action: PayloadAction<Ship | null>) => {
      state.selectedShip = action.payload;
    },
    resetShipsState: () => ({ ...initialState }),
  },
});

export const {
  setSelectedShip,
  setShowAddShipModal,
  setShowEditShipModal,
  setShowDeleteShipModal,
} = shipsSlice.actions;

export const ships = shipsSlice.reducer;
