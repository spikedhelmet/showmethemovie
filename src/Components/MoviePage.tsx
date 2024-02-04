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
} from "./MoviePage.styled";

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
import { MovieDetailsInterface } from "../interfaces";

function MoviePage() {
  const [movieData, setMovieData] = useState<MovieDetailsInterface | null>(
    null
  );
  const [trailer, setTrailer] = useState("");
  const [isOpenTrailer, setIsOpenTrailer] = useState(false);

  const posterBaseUrl = "https://image.tmdb.org/t/p/w500";
  const backdropBaseUrl = "https://image.tmdb.org/t/p/original"; // Use 'original' for the highest resolution

  useEffect(() => {
    fetchDataById(281957).then((data) => {
      setMovieData(data);
    });
  }, []);

  console.log(movieData);

  const backdropUrl = backdropBaseUrl + movieData?.backdrop_path;
  // Demo ID

  function handleTrailer(id: number) {
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

  const genresJoined = movieData?.genres
    ? movieData?.genres.map((genre) => genre.name).join(", ")
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
              src={`${posterBaseUrl}${movieData?.poster_path}`}
              alt={`${movieData?.title} poster`}
            />
          </ImageContainer>
          <div>
            <MovieDescription>
              <MovieTitle>{movieData?.title}</MovieTitle>
              <MovieGenre>{genresJoined} </MovieGenre>
              <MovieOverview>{movieData?.overview}</MovieOverview>
            </MovieDescription>
            <WatchTrailerButton onClick={() => handleTrailer(281957)}>
              ▶️ Watch trailer
            </WatchTrailerButton>
            <MovieDetails>
              <DescriptionItem>📆 {movieData?.release_date}</DescriptionItem>
              <DescriptionItem>
                🕛 {formatTime(movieData?.runtime)}
              </DescriptionItem>
              <DescriptionItem>⭐ {movieData?.vote_average}</DescriptionItem>
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
              <i className="ph ph-x"></i>
            </CloseTrailerButton>
            <Trailer trailer={trailer} />
          </TrailerContainer>
        </TrailerPopup>
      )}
    </>
  );
}

export default MoviePage;
