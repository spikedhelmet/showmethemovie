import { useEffect, useState } from "react";
import {
  BackgroundPoster,
  Container,
  HomepageHeading,
  PosterContainer,
} from "../App.styled";
import voxbest from "../imgs/voxbest.jpg";
import fetchMovieList from "../Services/fetchMoviesOnNav";
import { NavLink } from "react-router-dom";

import Cuckrousel from "./Cuckrousel";

function Homepage() {
  //Change this shitshow to useReducer
  const [displayed, setDisplayed] = useState("popular");
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [popular, setPopuplar] = useState([]);

  //TODO Can be made into its own hook
  useEffect(() => {
    // fetchMovieList(displayed).then((mappedMovies) => {
    //   setMoviesData(mappedMovies);
    // });

    fetchMovieList("now_playing").then((mappedMovies) => {
      setNowPlaying(mappedMovies);
    });

    fetchMovieList("upcoming").then((mappedMovies) => {
      setUpcoming(mappedMovies);
    });

    fetchMovieList("top_rated").then((mappedMovies) => {
      setTopRated(mappedMovies);
    });

    fetchMovieList("popular").then((mappedMovies) => {
      setPopuplar(mappedMovies);
    });
  }, [displayed]);

  return (
    <>
      <Container>
        <PosterContainer>
          <BackgroundPoster src={voxbest} alt="Collection of posters" />
          <HomepageHeading>Find the movie you like</HomepageHeading>
        </PosterContainer>
      </Container>
      <Cuckrousel items={popular} heading={"Popular"} />
      <Cuckrousel items={upcoming} heading={"Upcoming"} />
      {/* <Cuckrousel items={nowPlaying} heading={"Now Playing"} />
      <Cuckrousel items={topRated} heading={"Top Rated"} /> */}
    </>
  );
}

export default Homepage;
