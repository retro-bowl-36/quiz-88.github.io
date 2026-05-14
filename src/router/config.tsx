import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import GamePage from "../pages/game/page";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/quiz/:id",
    element: <GamePage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;