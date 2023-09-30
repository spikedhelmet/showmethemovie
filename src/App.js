import { useEffect, useState } from "react";
import { GlobalStyle, Container, SearchBar, MovieList } from "./App.styled";
import MovieItem from "./components/MovieItem";
import fetchMovieList from "./services/fetchMovieList";

export default function App() {
  const [moviesData, setMoviesData] = useState([]);
  const [searchInput, setSearchInput] = useState(``);

  function handleSearchInput(input) {
    setSearchInput(input);
  }

  useEffect(
    function () {
      fetchMovieList(searchInput).then((mappedMovies) => {
        const filteredMovies = mappedMovies.filter(
          (movie) => movie.runtime >= 60 && movie.budget >= 100000
        );
        const sortedMovies = filteredMovies.sort((a, b) => b.rating - a.rating);
        setMoviesData(sortedMovies);
      });
    },
    [searchInput]
  );

  return (
    <>
      <GlobalStyle />
      <Container>
        <SearchBar
          type="search"
          value={searchInput}
          onChange={(e) => handleSearchInput(e.target.value)}
          placeholder="Movie title"
        />
        <MovieList>
          {moviesData.map((movie) => (
            <MovieItem
              key={movie.id}
              id={movie.id}
              title={movie.title}
              overview={movie.overview}
              releaseDate={movie.releaseDate}
              rating={movie.rating}
              genres={movie.genres.join(", ")} // Join genre names with a comma
              poster={movie.poster}
            />
          ))}
        </MovieList>
      </Container>
    </>
  );
}
