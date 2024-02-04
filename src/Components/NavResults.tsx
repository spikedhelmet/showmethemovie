import { useEffect, useState } from "react";
import { Container, StyledMovieList } from "../App.styled";
import ResultMovie from "./ResultMovie";
import { useSearchParams } from "react-router-dom";
import fetchMovies from "../Services/fetchMovies";
import { MovieComponentInterface } from "../interfaces";
// searchType, resultType

function NavResults() {
  const [searchParams] = useSearchParams();
  const input = searchParams.get(`navSelect`) || "default";
  const [moviesData, setMoviesData] = useState<MovieComponentInterface[]>([]);

  useEffect(() => {
    fetchMovies(input, "list").then((mappedMovies) => {
      const filteredMovies = mappedMovies?.filter(
        (movie) => movie.runtime >= 60 && movie.budget >= 100000
      );
      const sortedMovies = (filteredMovies || []).sort(
        (a, b) => b.rating - a.rating
      );
      setMoviesData(sortedMovies);
    });
  }, [input]);

  return (
    <>
      <Container>
        <StyledMovieList>
          {moviesData.map((movie: MovieComponentInterface) => (
            <ResultMovie
              key={movie.id}
              id={movie.id}
              title={movie.title}
              overview={movie.overview}
              releaseDate={movie.releaseDate}
              rating={movie.rating}
              genres={movie.genres}
              poster={movie.poster}
              runtime={movie.runtime}
              budget={movie.budget}
            />
          ))}
        </StyledMovieList>
      </Container>
    </>
  );
}
export default NavResults;
