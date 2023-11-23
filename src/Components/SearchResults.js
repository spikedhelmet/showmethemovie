import { useEffect, useState } from "react";
import { Container, MovieList } from "../App.styled";
import { useSearchParams } from "react-router-dom";
import MovieItem from "../Components/MovieItem";
import fetchMoviesOnSearch from "../Services/fetchMoviesOnSearch";

function SearchResults() {
  const [searchParams] = useSearchParams();
  const searchInput = searchParams.get(`search`);
  const [moviesData, setMoviesData] = useState([]);

  useEffect(() => {
    fetchMoviesOnSearch(searchInput).then((mappedMovies) => {
      const filteredMovies = mappedMovies.filter(
        (movie) => movie.runtime >= 60 && movie.budget >= 100000
      );
      const sortedMovies = filteredMovies.sort((a, b) => b.rating - a.rating);
      setMoviesData(sortedMovies);
    });
  }, [searchInput]);

  return (
    <Container>
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
  );
}
export default SearchResults;
