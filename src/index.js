import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./Components/ErrorPage";
import SearchResults from "./Components/SearchResults";
import { GlobalStyle } from "./App.styled";
import NavResults from "./Components/NavResults";
import MoviePage from "./Components/MoviePage";

const router = createBrowserRouter([
  {
    path: "*",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: "searchResults", element: <SearchResults /> },
      { path: "navResults", element: <NavResults /> },
      { path: "moviePage", element: <MoviePage /> },
    ],
  },
  // { path: "/searchResults", Component: SearchResults },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <RouterProvider router={router} />
  </React.StrictMode>
);
