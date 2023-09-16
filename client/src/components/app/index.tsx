import type { FC } from "react";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";

import { router } from "../../router";
import { store } from "../../store";

import "normalize.css";
import "../../styles/global.scss";

export const App: FC = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};
