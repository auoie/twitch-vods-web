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
import { LanguagePage } from "./components/LanguagePage";
import { Root } from "./components/Root";
import { ThrownPage } from "./components/ThrownPage";
import { fetchChannel } from "./routes/channel";
import { fetchFrontPage } from "./routes/front";
import { fetchLanguagePage } from "./routes/language";
import "./index.css";

const channelPageLoader: LoaderFunction = async ({ params }) => {
  return fetchChannel(params["channelLogin"] as string);
};
const frontPageLoader: LoaderFunction = async () => {
  return fetchFrontPage("private", "sub");
};
const languagePageLoader: LoaderFunction = async ({ params }) => {
  return fetchLanguagePage(params["language"] as string, "private", "sub");
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
            path: "channels/:channelLogin",
            element: <ChannelPage />,
            loader: channelPageLoader,
          },
          {
            path: "language/:language",
            element: <LanguagePage />,
            loader: languagePageLoader,
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
