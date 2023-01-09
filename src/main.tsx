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
import { LanguageList } from "./components/LanguageList";

const channelPageLoader: LoaderFunction = async ({ params }) => {
  return params["channelLogin"] as string;
};
const languagePageLoader: LoaderFunction = async ({ params }) => {
  return params["language"] as string;
};
const categoryPageloader: LoaderFunction = async ({ params }) => {
  return params["categoryId"] as string;
};
const errorPageLoader: LoaderFunction = async ({ params }) => {
  return params["*"] as string;
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        errorElement: <ThrownPage />,
        children: [
          {
            index: true,
            element: <FrontPage />,
          },
          {
            path: "languages",
            element: <LanguageList />,
          },
          {
            path: "channels/:channelLogin",
            element: <ChannelPage />,
            loader: channelPageLoader,
          },
          {
            path: "languages/:language",
            element: <LanguagePage />,
            loader: languagePageLoader,
          },
          {
            path: "categories/:categoryId",
            element: <CategoryPage />,
            loader: categoryPageloader,
          },
          {
            path: "*",
            element: <ErrorPage />,
            loader: errorPageLoader,
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
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider>
        <RouterProvider router={router} fallbackElement={<Root />} />
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
