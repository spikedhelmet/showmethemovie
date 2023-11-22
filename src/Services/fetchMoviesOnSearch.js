import fetchDataById from "./fetchDataById";
import genres from "../genres";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYWUwNWM0ZWEwNDhjNDc1NTc5MTJjMWYyZjVkNzdiMiIsInN1YiI6IjY0ZDM2YzFhYmYzMWYyMDFjYjY4MTA0NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._7oyBDB_CiVPWW4rMu10ZuO7WKia27OTasbdS4SnD5s",
  },
};

async function fetchMoviesOnSearch(title) {
  const URL = `https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=false&language=en-US&page=1`;

  try {
    const response = await fetch(URL, options);
    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }
    const data = await response.json();
    const allMovies = data.results;

    const mappedMoviesData = await Promise.all(
      allMovies.map(async (movie) => {
        const movieDetails = await fetchDataById(movie.id);

        return {
          id: movie.id,
          title: movie.title,
          overview: movie.overview,
          releaseDate: movie.release_date.slice(0, 4),
          rating: movie.vote_average.toFixed(1),
          genres: movie.genre_ids.map((genreId) => {
            const genre = genres.find((genre) => genre.id === genreId);
            return genre ? genre.name : "Unknown Genre";
          }),
          poster: movie.poster_path,
          runtime: movieDetails.runtime,
          budget: movieDetails.budget,
        };
      })
    );

    return mappedMoviesData;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

export default fetchMoviesOnSearch;
