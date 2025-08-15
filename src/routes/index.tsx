import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/home";
import { RoutePaths } from "./routePath";
import { MainLayout } from "../components/templates/layout";

export const router = createBrowserRouter([
  {
    path: RoutePaths.ROOT,
    element: <MainLayout />,
    children: [
      {
        path: RoutePaths.ROOT,
        element: <Home />,
      },
    ],
  },
]);
