import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import { Create } from "./pages/Create";
import { QueryClient, QueryClientProvider } from "react-query";
import { FolderContent } from "./pages/FolderContent";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "create", element: <Create /> },
      { path: "folder/:id", element: <FolderContent /> },
    ],
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
);
