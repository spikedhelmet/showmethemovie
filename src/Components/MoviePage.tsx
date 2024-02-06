import { useState, useEffect } from "react";
import {
  MovieContainer,
  Image,
  ImageContainer,
  MovieTitle,
  MovieOverview,
  MovieDetails,
  MovieGenre,
  DescriptionItem,
  FlexCont,
  Overlay,
  ActorImage,
  CastList,
  ActorCard,
  DescriptionContainer,
} from "./MoviePage.styled";

import {
  TrailerContainer,
  TrailerPopup,
  WatchTrailerButton,
  CloseTrailerButton,
} from "../App.styled";

import fetchTrailer from "../Services/fetchTrailer";
import fetchDataById from "../Services/fetchDataById";
import fetchCast from "../Services/fetchCast";
import formatTime from "../Scripts/formatTime";
import Trailer from "./Trailer";
import { Backdrop, BackdropImg } from "./MoviePage.styled";
import { MovieCast, CastMember, MovieDetailsInterface } from "../interfaces";
import Poster from "./Poster";
import { useParams, useSearchParams } from "react-router-dom";

type idParams = {
  id: string;
};

function MoviePage() {
  let { id } = useParams<idParams>();
  const movieId = Number(id);

  const [movieData, setMovieData] = useState<MovieDetailsInterface | null>(
    null
  );
  const [movieCast, setMovieCast] = useState<CastMember[]>([]);
  const [trailer, setTrailer] = useState("");
  const [isOpenTrailer, setIsOpenTrailer] = useState(false);

  const posterBaseUrl = "https://image.tmdb.org/t/p/w500";
  const backdropBaseUrl = "https://image.tmdb.org/t/p/original"; // Use 'original' for the highest resolution

  useEffect(() => {
    fetchDataById(movieId).then((data) => {
      setMovieData(data);
    });

    fetchCast(movieId).then((data) => {
      setMovieCast(data.cast);
    });
  }, []);

  const backdropUrl = backdropBaseUrl + movieData?.backdrop_path;

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
          <DescriptionContainer>
            <MovieTitle>{movieData?.title}</MovieTitle>
            <MovieGenre>{genresJoined} </MovieGenre>
            <MovieDetails>
              <DescriptionItem>📆 {movieData?.release_date}</DescriptionItem>
              <DescriptionItem>
                🕛 {formatTime(movieData?.runtime)}
              </DescriptionItem>
              <DescriptionItem>⭐ {movieData?.vote_average}</DescriptionItem>
            </MovieDetails>
            <MovieOverview>{movieData?.overview}</MovieOverview>
            <WatchTrailerButton onClick={() => handleTrailer(281957)}>
              ▶️ Watch trailer
            </WatchTrailerButton>
          </DescriptionContainer>
        </MovieContainer>
      </FlexCont>

      <CastList>
        {movieCast.slice(0, 12).map((castMember, index) => (
          <>
            <ActorCard key={index}>
              <ActorImage src={`${posterBaseUrl}${castMember.profile_path}`} />
              <p>{castMember.name}</p>
            </ActorCard>
          </>
        ))}
      </CastList>

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
