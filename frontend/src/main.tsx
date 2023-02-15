import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { routerRoutes } from "./routes";
import "./index.css";
import { Loader } from "./loader";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Loader />
    <RouterProvider router={createBrowserRouter(routerRoutes)} />
  </React.StrictMode>
);
