import { useState } from "react";
import { Container, SearchBar } from "./App.styled";
import Homepage from "./Components/Homepage";
import { Route, Routes, useNavigate, useSearchParams } from "react-router-dom";
import SearchResults from "./Components/SearchResults";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Components/Navbar";
import NavResults from "./Components/NavResults";
import MoviePage from "./Components/MoviePage";

export default function App() {
  let [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(searchParams.get(`search`));
  const navigate = useNavigate();

  const handleSearch = (newSearch) => {
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
            if (e.key === "Enter") handleSearch(e.target.value);
          }}
          placeholder="Movie title"
        />
      </Container>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="searchResults" element={<SearchResults />} />
        <Route path="navResults" element={<NavResults />} />
        <Route path="moviePage" element={<MoviePage />} />
      </Routes>
    </>
  );
}
