import { useEffect, useState } from "react";
import { Container, MovieList } from "../App.styled";
import MovieItem from "./ResultMovie";
import { useSearchParams } from "react-router-dom";
import fetchMoviesOnNav from "../Services/fetchMoviesOnNav";

function NavResults() {
  const [searchParams] = useSearchParams();
  const input = searchParams.get(`navSelect`);
  const [moviesData, setMoviesData] = useState([]);

  useEffect(() => {
    fetchMoviesOnNav(input).then((mappedMovies) => {
      const filteredMovies = mappedMovies.filter(
        (movie) => movie.runtime >= 60 && movie.budget >= 100000
      );
      const sortedMovies = filteredMovies.sort((a, b) => b.rating - a.rating);
      setMoviesData(sortedMovies);
    });
  }, [input]);

  return (
    <>
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
    </>
  );
}
export default NavResults;
