import fetchMovieData from "./fetchMovieData";

// AUTHENTICATION KEY
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYWUwNWM0ZWEwNDhjNDc1NTc5MTJjMWYyZjVkNzdiMiIsInN1YiI6IjY0ZDM2YzFhYmYzMWYyMDFjYjY4MTA0NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._7oyBDB_CiVPWW4rMu10ZuO7WKia27OTasbdS4SnD5s",
  },
  // API KEY:
  // 1ae05c4ea048c47557912c1f2f5d77b2
};

const genres = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];

export default async function fetchMovieList(title) {
  try {
    function getURL() {
      return `https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=false&language=en-US&page=1`;
    }
    const response = await fetch(getURL(), options);
    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }
    const data = await response.json();
    const allMovies = data.results;

    const mappedMoviesData = await Promise.all(
      allMovies.map(async (movie) => {
        const movieDetails = await fetchMovieData(movie.id);

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
          runtime: movieDetails.runtime, // Include runtime in your data
          budget: movieDetails.budget, // Include budget in your data
        };
      })
    );

    return mappedMoviesData;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}
