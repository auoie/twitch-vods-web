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
import { CategoryPage } from "./components/CategoryPage";
import { Provider } from "jotai";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const channelPageLoader: LoaderFunction = async ({ params }) => {
  return params["channelLogin"] as string;
};
const languagePageLoader: LoaderFunction = async ({ params }) => {
  return params["language"] as string;
};
const categoryPageloader: LoaderFunction = async ({ params }) => {
  return params["categoryId"] as string;
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
          {
            path: "categories/:categoryId",
            element: <CategoryPage />,
            loader: categoryPageloader,
          },
        ],
      },
    ],
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      cacheTime: 0,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <Provider>
      <React.StrictMode>
        <RouterProvider router={router} fallbackElement={<Root />} />
      </React.StrictMode>
    </Provider>
  </QueryClientProvider>
);
