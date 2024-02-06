import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./Components/ErrorPage";
import { GlobalStyle } from "./App.styled";
import MovieList from "./Components/MovieList";
import MoviePage from "./Components/MoviePage";

const router = createBrowserRouter([
  {
    path: "*",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "navResults",
        element: <MovieList paramsType={"navSelect"} fetchType={"list"} />,
      },
      {
        path: "searchResults",
        element: <MovieList paramsType={"search"} fetchType={"search"} />,
      },
      { path: "moviePage", element: <MoviePage /> },
    ],
  },
]);

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <GlobalStyle />
    <RouterProvider router={router} />
  </React.StrictMode>
);
