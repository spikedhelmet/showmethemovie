import { useState, useEffect } from "react";
import {
  MovieContainer,
  Image,
  ImageContainer,
  MovieDescription,
  MovieTitle,
  MovieOverview,
  MovieDetails,
  MovieGenre,
  DescriptionItem,
  FlexCont,
  Overlay,
} from "../Components/MoviePage.styled";

import {
  TrailerContainer,
  TrailerPopup,
  WatchTrailerButton,
  CloseTrailerButton,
} from "../App.styled";

import fetchTrailer from "../Services/fetchTrailer";
import fetchDataById from "../Services/fetchDataById";
import formatTime from "../Scripts/formatTime";
import Trailer from "./Trailer";
import { Backdrop, BackdropImg } from "./MoviePage.styled";

function MoviePage() {
  const [movieData, setMovieData] = useState({});
  const [trailer, setTrailer] = useState("");
  const [isOpenTrailer, setIsOpenTrailer] = useState(false);

  const posterBaseUrl = "https://image.tmdb.org/t/p/w500";
  const backdropBaseUrl = "https://image.tmdb.org/t/p/original"; // Use 'original' for the highest resolution

  useEffect(() => {
    fetchDataById(281957).then((data) => {
      setMovieData(data);
    });
  }, []);

  const {
    title,
    release_date,
    vote_average,
    overview,
    genres,
    poster_path,
    backdrop_path,
    runtime,
  } = movieData;

  console.log(movieData);

  const backdropUrl = backdropBaseUrl + backdrop_path;
  // Demo ID

  function handleTrailer(id) {
    fetchTrailer(id).then((trailerKey) => {
      if (trailerKey) {
        setTrailer(trailerKey); // Set the trailer in the state
        setIsOpenTrailer(!isOpenTrailer);
      }
    });
  }

  function handleOpenTrailer() {
    setIsOpenTrailer(!isOpenTrailer);
  }

  const genresJoined = genres
    ? genres.map((genre) => genre.name).join(", ")
    : "";

  return (
    <>
      <Backdrop>
        <Overlay />
        <BackdropImg src={backdropUrl} />
      </Backdrop>

      <FlexCont>
        <MovieContainer>
          <ImageContainer>
            <Image
              src={`${posterBaseUrl}${poster_path}`}
              alt={`${title} poster`}
            />
          </ImageContainer>
          <div>
            <MovieDescription>
              <MovieTitle>{title}</MovieTitle>
              <MovieGenre>{genresJoined} </MovieGenre>
              <MovieOverview>{overview}</MovieOverview>
            </MovieDescription>
            <WatchTrailerButton onClick={() => handleTrailer(281957)}>
              ▶️ Watch trailer
            </WatchTrailerButton>
            <MovieDetails>
              <DescriptionItem>📆 {release_date}</DescriptionItem>
              <DescriptionItem>🕛 {formatTime(runtime)}</DescriptionItem>
              <DescriptionItem>⭐ {vote_average}</DescriptionItem>
            </MovieDetails>
          </div>
        </MovieContainer>
      </FlexCont>
      <h3>Cast</h3>

      {/* Touch nothing below */}
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
    </>
  );
}

export default MoviePage;
