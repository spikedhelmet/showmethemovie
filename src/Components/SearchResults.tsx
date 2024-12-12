import ResultMovie from "./ResultMovie";
import { useEffect, useState } from "react";
import { Container, StyledMovieList } from "../App.styled";
import { useSearchParams } from "react-router-dom";
import fetchMovies from "../Services/fetchMovies";
import { MovieComponentInterface } from "../interfaces";

function SearchResults() {
	const [searchParams] = useSearchParams();
	const searchInput = searchParams.get(`search`) || "default";
	const [moviesData, setMoviesData] = useState<MovieComponentInterface[]>([]);

	useEffect(() => {
		fetchMovies(searchInput, "search").then((mappedMovies) => {
			const filteredMovies = mappedMovies?.filter((movie) => movie.runtime >= 60 && movie.budget >= 100000);
			const sortedMovies = (filteredMovies || []).sort((a, b) => b.rating - a.rating);
			setMoviesData(sortedMovies);
		});
	}, [searchInput]);

	return (
		<Container>
			<StyledMovieList>
				{moviesData.map((movie) => (
					<ResultMovie
						key={movie.id}
						id={movie.id}
						title={movie.title}
						overview={movie.overview}
						releaseDate={movie.releaseDate}
						rating={movie.rating}
						genres={movie.genres} // Join genre names with a comma
						poster={movie.poster}
						runtime={movie.runtime}
						budget={movie.budget}
					/>
				))}
			</StyledMovieList>
		</Container>
	);
}
export default SearchResults;
