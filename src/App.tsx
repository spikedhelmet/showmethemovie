/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
import { useState } from "react";
import { Container, SearchBar } from "./App.styled";
import Homepage from "./Components/Homepage";
import { Route, Routes, useNavigate, useSearchParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Components/Navbar";
import MoviePage from "./Components/MoviePage";
import MovieList from "./Components/MovieList";

export default function App() {
  let [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(searchParams.get(`search`));
  const navigate = useNavigate();

  const handleSearch = (newSearch: string) => {
    setSearchInput(newSearch);
    searchParams.set(`search`, newSearch);
    navigate(`/searchResults?${searchParams.toString()}`);
  };

  return (
    <>
      <Container>
        <Navbar />
        <SearchBar
          type="search"
          onKeyDown={(e) => {
            if (e.key === "Enter")
              handleSearch((e.target as HTMLInputElement).value);
          }}
          placeholder="Movie title"
        />
      </Container>
      <Routes>
        <Route index element={<Homepage />} />
        <Route
          path="searchResults"
          element={<MovieList paramsType={"search"} fetchType={"search"} />}
        />
        <Route
          path="navResults"
          element={<MovieList paramsType={"navSelect"} fetchType={"list"} />}
        />
        <Route path="movie/:id" element={<MoviePage />} />
      </Routes>
    </>
  );
}
