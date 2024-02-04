import fetchDataById from "./fetchDataById";
import genres from "../genres";
import { MovieComponentInterface } from "../interfaces";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYWUwNWM0ZWEwNDhjNDc1NTc5MTJjMWYyZjVkNzdiMiIsInN1YiI6IjY0ZDM2YzFhYmYzMWYyMDFjYjY4MTA0NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._7oyBDB_CiVPWW4rMu10ZuO7WKia27OTasbdS4SnD5s",
  },
};

interface FetchedMovieInterface {
  genre_ids: Array<number>;
  id: number;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  poster_path: string;
}

interface MovieDetailsInterface {
  runtime: number;
  budget: number;
}

async function fetchMovies(
  input: string,
  fetchType: string
): Promise<MovieComponentInterface[]> {
  const listUrl = `https://api.themoviedb.org/3/movie/${input}?&include_adult=false&language=en-US&page=1`;
  const searchUrl = `https://api.themoviedb.org/3/search/movie?query=${input}&include_adult=false&language=en-US&page=1`;

  let URL;
  if (fetchType === "list") {
    URL = listUrl;
  } else if (fetchType === "search") {
    URL = searchUrl;
  } else {
    throw new Error(`Invalid fetchType: ${fetchType}`);
  }

  try {
    const response = await fetch(URL, options);
    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }
    const data = await response.json();

    if (!Array.isArray(data.results)) {
      throw new Error("Unexpected response from the API");
    }

    const allMovies = data.results;

    const mappedMoviesData = await Promise.all(
      allMovies.map(async (movie: FetchedMovieInterface) => {
        const movieDetails: MovieDetailsInterface = await fetchDataById(
          movie.id
        );

        // Converting genres into a string for clean code and type
        const genresArr: string[] = [];
        movie.genre_ids.forEach((genreId) => {
          const genre = genres.find((genre) => genre.id === genreId);
          if (genre) genresArr.push(genre.name);
        });
        const genresStr = genresArr.join(", ");

        return {
          id: movie.id,
          title: movie.title,
          overview: movie.overview,
          releaseDate: movie.release_date.slice(0, 4),
          rating: movie.vote_average.toFixed(1),
          genres: genresStr,
          poster: movie.poster_path,
          runtime: movieDetails.runtime,
          budget: movieDetails.budget,
        };
      })
    );

    return mappedMoviesData;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default fetchMovies;
