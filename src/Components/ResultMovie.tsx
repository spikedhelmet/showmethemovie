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
  ReadMoreButton,
  DescriptionItem,
  TrailerContainer,
  TrailerPopup,
  WatchTrailerButton,
  CloseTrailerButton,
} from "../App.styled";

import fetchTrailer from "../Services/fetchTrailer";
import fetchDataById from "../Services/fetchDataById";
import formatTime from "../Scripts/formatTime";
import Trailer from "./Trailer";
import { MovieComponentInterface } from "../interfaces";

function ResultMovie({
  id,
  title,
  releaseDate,
  rating,
  overview,
  genres,
  poster,
}: MovieComponentInterface) {
  const posterBaseUrl = "https://image.tmdb.org/t/p/w500";
  const [runtime, setRuntime] = useState(0);
  const [trailer, setTrailer] = useState("");
  const [isOpenTrailer, setIsOpenTrailer] = useState(false);
  const [isOverviewExpanded, setIsOverviewExpanded] = useState(false);

  function toggleOverview() {
    setIsOverviewExpanded(!isOverviewExpanded);
  }

  function handleTrailer(id: number) {
    fetchTrailer(id).then((trailerKey) => {
      console.log(trailerKey);
      if (trailerKey) {
        setTrailer(trailerKey);
        setIsOpenTrailer(!isOpenTrailer);
      }
    });
  }

  function handleOpenTrailer() {
    setIsOpenTrailer(!isOpenTrailer);
  }

  useEffect(() => {
    fetchDataById(id).then((movieDetails) => {
      setRuntime(movieDetails.runtime);
    });
  }, [id]);

  return (
    <>
      <MovieContainer>
        <ImageContainer>
          <Image src={`${posterBaseUrl}${poster}`} alt={`${title} poster`} />
        </ImageContainer>
        <MovieDescription>
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
        </MovieDescription>
        <WatchTrailerButton onClick={() => handleTrailer(id)}>
          Watch trailer
        </WatchTrailerButton>
        <MovieDetails>
          <DescriptionItem>📆 {releaseDate}</DescriptionItem>
          <DescriptionItem>🕛 {formatTime(runtime)}</DescriptionItem>
          <DescriptionItem>⭐ {rating}</DescriptionItem>
        </MovieDetails>
      </MovieContainer>
      {/* Trailer renders if button is clicked */}
      {isOpenTrailer && (
        <TrailerPopup>
          <TrailerContainer>
            <CloseTrailerButton onClick={handleOpenTrailer}>
              <span>Close Trailer ⓧ</span>
            </CloseTrailerButton>
            <Trailer trailer={trailer} />
          </TrailerContainer>
        </TrailerPopup>
      )}
    </>
  );
}

export default ResultMovie;
