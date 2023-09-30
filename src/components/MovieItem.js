import { useState, useEffect } from "react";
import {
  FlexContainer,
  MovieContainer,
  Image,
  ImageContainer,
  Description,
  MovieHeader,
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
import { X } from "@phosphor-icons/react";

import Trailer from "../components/Trailer";
import fetchTrailer from "../services/fetchTrailer";
import fetchMovieData from "../services/fetchMovieData";
import convertTimeFormat from "../helpers/convertTimeFormat";

export default function MovieItem({
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
    fetchMovieData(id).then((movieDetails) => {
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
                  : `${overview.substring(0, 300)}${
                      overview.length > 300 ? "..." : ""
                    }`}
                {/* Display "Read More" button only if overview is too long */}
                {overview.length > 300 && (
                  <ReadMoreButton onClick={toggleOverview}>
                    {isOverviewExpanded ? "Read Less" : "Read More"}
                  </ReadMoreButton>
                )}
              </MovieOverview>
            </MovieHeader>
            <MovieDetails>
              <DescriptionItem>{releaseDate}</DescriptionItem>
              <DescriptionItem>🕛{convertTimeFormat(runtime)}</DescriptionItem>
              <DescriptionItem>⭐{rating}</DescriptionItem>
            </MovieDetails>
          </Description>
        </MovieContainer>
        {isOpenTrailer && (
          <TrailerPopup>
            <TrailerContainer>
              <CloseTrailerButton onClick={handleOpenTrailer}>
                <span>Close Trailer</span>
                <X size={18} />
              </CloseTrailerButton>
              <Trailer trailer={trailer} title={title} />
            </TrailerContainer>
          </TrailerPopup>
        )}
      </FlexContainer>
    </>
  );
}
