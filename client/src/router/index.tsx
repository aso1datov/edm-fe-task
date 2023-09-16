import { createBrowserRouter, Navigate } from "react-router-dom";

import { Layout } from "../components/layout";
import { Page } from "../components/page";
import { ProtectedRoute } from "../components/protected-route";
import { Ships } from "../pages/ships";
import { SignIn } from "../pages/sign-in";

import { AppRoute } from "./routes";

export const router = createBrowserRouter([
  {
    path: AppRoute.Home,
    element: <Navigate to={AppRoute.SignIn} replace={true} />,
    errorElement: <>TODO: 404 page</>,
  },
  {
    element: <Page />,
    children: [
      {
        path: AppRoute.SignIn,
        element: <SignIn />,
      },
      {
        path: AppRoute.Ships,
        element: <Layout />,
        children: [
          {
            index: true,
            element: (
              <ProtectedRoute>
                <Ships />
              </ProtectedRoute>
            ),
          },
        ],
      },
    ],
  },
]);
