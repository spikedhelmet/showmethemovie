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
    fetchDataById(id).then((movieDetails) => {
      setRuntime(movieDetails.runtime); // Set the runtime in the state
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

export default MovieItem;
