import { useEffect, useState } from "react";

import {
  GlobalStyle,
  Container,
  SearchBar,
  FlexContainer,
  MovieList,
  MovieContainer,
  Image,
  ImageContainer,
  Description,
  MovieHeader,
  MovieTitle,
  MovieOverview,
  MovieDetails,
  MovieGenre,
  MovieType,
  ReadMoreButton,
  DescriptionItem,
  StatusContainer,
  Status,
  AddToListButton,
  TrailerContainer,
  TrailerPopup,
  WatchTrailerButton,
  CloseTrailerButton,
} from "./App.styled";

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

function toHoursAndMinutes(totalMinutes) {
  const hours = parseInt(Math.floor(totalMinutes / 60));
  const minutes = totalMinutes % 60;
  return hours > 0 ? `${hours}h ${minutes}min` : `${minutes}min`;
}

// The APP

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

async function getMovieList(title) {
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
        const movieDetails = await getMovieDataById(movie.id);

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

    // const mappedMoviesData = allMovies.map((movie) => ({
    //   id: movie.id,
    //   title: movie.title,
    //   overview: movie.overview,
    //   releaseDate: movie.release_date.slice(0, 4),
    //   rating: movie.vote_average.toFixed(1),
    //   genres: movie.genre_ids.map((genreId) => {
    //     const genre = genres.find((genre) => genre.id === genreId);
    //     return genre ? genre.name : "Unknown Genre";
    //   }),
    //   poster: movie.poster_path,
    // }));

    return mappedMoviesData;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

// TEST
async function getMovieDataById(id) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=1ae05c4ea048c47557912c1f2f5d77b2`
    );
    if (!response.ok) {
      throw new Error(
        `Error fetching movie details! status: ${response.status}`
      );
    }
    const data = await response.json();
    return data; // Return the entire movie details
  } catch (err) {
    console.log(err);
  }
}

// Trailer
async function fetchTrailer(movieId) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=1ae05c4ea048c47557912c1f2f5d77b2`
    );
    if (!response.ok) {
      throw new Error(`Error fetching trailer! status: ${response.status}`);
    }
    const data = await response.json();
    // Find the video that represents the trailer (usually has type "Trailer")
    const trailer = data.results.find((video) => video.type === "Trailer");
    const urlKey = trailer ? trailer.key : null;
    return urlKey; // Return only the key property
  } catch (error) {
    console.error("Error fetching trailer:", error);
    throw new Error("Error fetching trailer");
  }
}

function Trailer({ trailer }) {
  const embedUrl = `https://www.youtube.com/embed/${trailer}`;
  return (
    <iframe
      width="100%"
      height="100%"
      src={embedUrl}
      title={`YouTube video player`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    ></iframe>
  );
}

// https://api.themoviedb.org/3/movie/343611?api_key=1ae05c4ea048c47557912c1f2f5d77b2
// MAIN APP
export default function App() {
  const [moviesData, setMoviesData] = useState([]);
  const [searchInput, setSearchInput] = useState(`transformers`);

  function handleSearchInput(input) {
    setSearchInput(input);
  }

  useEffect(() => {
    getMovieList(searchInput).then((mappedMovies) => {
      const filteredMovies = mappedMovies.filter(
        (movie) => movie.runtime >= 60 && movie.budget >= 100000
      );
      const sortedMovies = filteredMovies.sort((a, b) => b.rating - a.rating);
      // const sortedMovies = mappedMovies.sort((a, b) => b.rating - a.rating);
      setMoviesData(sortedMovies);
      // setMoviesData(mappedMovies);
    });
  }, [searchInput]);

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

function MovieItem({
  id,
  title,
  releaseDate,
  rating,
  overview,
  genres,
  poster,
}) {
  const posterBaseUrl = "https://image.tmdb.org/t/p/w500";
  const [runtime, setRuntime] = useState(""); // State to hold the runtime
  const [trailer, setTrailer] = useState(""); // State to hold the trailer
  const [isOpenTrailer, setIsOpenTrailer] = useState(false);
  const [isOverviewExpanded, setIsOverviewExpanded] = useState(false);

  function toggleOverview() {
    setIsOverviewExpanded(!isOverviewExpanded);
  }

  // I need a function that opens and closes trailer window on click
  // I also need a func to fetch the trailer for that specific movie
  // I'll need a state for open and closed, and the movie ID

  function handleTrailer(id) {
    fetchTrailer(id).then((trailerKey) => {
      console.log(trailerKey);
      if (trailerKey) {
        setTrailer(trailerKey); // Set the trailer in the state
        setIsOpenTrailer(!isOpenTrailer);
      }
    });
  }

  function handleOpenTrailer() {
    setIsOpenTrailer(!isOpenTrailer);
  }

  useEffect(() => {
    getMovieDataById(id).then((movieDetails) => {
      setRuntime(movieDetails.runtime); // Set the runtime in the state
    });
  }, [id]);

  return (
    <>
      <FlexContainer>
        <MovieContainer>
          <ImageContainer>
            <Image src={`${posterBaseUrl}${poster}`} alt={`${title} poster`} />
            <WatchTrailerButton onClick={() => handleTrailer(id)}>
              Watch trailer
            </WatchTrailerButton>
          </ImageContainer>
          <Description>
            <MovieHeader>
              <MovieTitle>{title}</MovieTitle>
              <MovieGenre>{genres}</MovieGenre>
              <MovieOverview>
                {/* Display only the visible portion of the overview */}
                {isOverviewExpanded
                  ? overview
                  : `${overview.substring(0, 150)}${
                      overview.length > 150 ? "..." : ""
                    }`}
                {/* Display "Read More" button only if overview is too long */}
                {overview.length > 150 && (
                  <ReadMoreButton onClick={toggleOverview}>
                    {isOverviewExpanded ? "Read Less" : "Read More"}
                  </ReadMoreButton>
                )}
              </MovieOverview>
            </MovieHeader>
            <MovieDetails>
              <DescriptionItem>{releaseDate}</DescriptionItem>
              <DescriptionItem>🕛{toHoursAndMinutes(runtime)}</DescriptionItem>
              <DescriptionItem>⭐{rating}</DescriptionItem>
            </MovieDetails>
          </Description>
        </MovieContainer>
        {isOpenTrailer && (
          <TrailerPopup>
            <TrailerContainer>
              <CloseTrailerButton onClick={handleOpenTrailer}>
                <span>Close Trailer</span>
                <i class="ph ph-x"></i>
              </CloseTrailerButton>
              <Trailer trailer={trailer} title={title} />
            </TrailerContainer>
          </TrailerPopup>
        )}
      </FlexContainer>
    </>
  );
}
