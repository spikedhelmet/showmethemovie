import { useEffect, useState } from "react";
import {
  BackgroundPoster,
  Container,
  HomepageHeading,
  PosterContainer,
} from "../App.styled";
import voxbest from "../imgs/voxbest.jpg";
import fetchMovieList from "../Services/fetchMovies";
import MovieCarousel from "./Carousel";
import Footer from "./Footer";
import { MovieComponentInterface } from "../interfaces";

function Homepage() {
  //Change this shitshow to useReducer / Redux
  const [displayed, setDisplayed] = useState("popular");
  const [nowPlaying, setNowPlaying] = useState<MovieComponentInterface[]>();
  const [upcoming, setUpcoming] = useState<MovieComponentInterface[]>();
  const [topRated, setTopRated] = useState<MovieComponentInterface[]>();
  const [popular, setPopular] = useState<MovieComponentInterface[]>();

  //TODO Can be made into its own hook
  useEffect(() => {
    fetchMovieList("now_playing", "list").then((mappedMovies) => {
      setNowPlaying(mappedMovies);
    });

    fetchMovieList("upcoming", "list").then((mappedMovies) => {
      setUpcoming(mappedMovies);
    });

    fetchMovieList("top_rated", "list").then((mappedMovies) => {
      setTopRated(mappedMovies);
    });

    fetchMovieList("popular", "list").then((mappedMovies) => {
      setPopular(mappedMovies);
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
      <MovieCarousel items={popular} heading={"Popular"} />
      <MovieCarousel items={upcoming} heading={"Upcoming"} />
      <MovieCarousel items={nowPlaying} heading={"Now Playing"} />
      <MovieCarousel items={topRated} heading={"Top Rated"} />
      <Footer></Footer>
    </>
  );
}

export default Homepage;
