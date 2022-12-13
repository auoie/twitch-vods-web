import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  LoaderFunction,
  RouterProvider,
} from "react-router-dom";
import { ChannelPage } from "./components/ChannelPage";
import { ErrorPage } from "./components/ErrorPage";
import { FrontPage } from "./components/FrontPage";
import { Root } from "./components/Root";
import { ThrownPage } from "./components/ThrownPage";
import "./index.css";
import { fetchChannel } from "./routes/channel";
import { fetchFrontPage } from "./routes/front";

const channelPageLoader: LoaderFunction = async ({ params }) => {
  return fetchChannel(params["channelLogin"] as string);
};
const frontPageLoader: LoaderFunction = async () => {
  return fetchFrontPage();
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ThrownPage />,
        children: [
          {
            index: true,
            element: <FrontPage />,
            loader: frontPageLoader,
          },
          {
            path: "channel/:channelLogin",
            element: <ChannelPage />,
            loader: channelPageLoader,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} fallbackElement={<Root />} />
  </React.StrictMode>
);
