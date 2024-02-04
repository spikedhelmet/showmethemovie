import { useEffect, useState } from "react";
import { Container, StyledMovieList } from "../App.styled";
import ResultMovie from "./ResultMovie";
import { useSearchParams } from "react-router-dom";
import fetchMovies from "../Services/fetchMovies";
import { MovieComponentInterface } from "../interfaces";

interface MovieListProps {
  paramsType: string;
  fetchType: string;
}

function MovieList({ paramsType, fetchType }: MovieListProps) {
  const [searchParams] = useSearchParams();
  const input = searchParams.get(paramsType) || "default";
  const [moviesData, setMoviesData] = useState<MovieComponentInterface[]>([]);

  useEffect(() => {
    fetchMovies(input, fetchType).then((mappedMovies) => {
      const filteredMovies = mappedMovies?.filter(
        (movie) => movie.runtime >= 60 && movie.budget >= 100000
      );
      const sortedMovies = (filteredMovies || []).sort(
        (a, b) => b.rating - a.rating
      );
      setMoviesData(sortedMovies);
    });
  }, [input, fetchType]);

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
export default MovieList;
