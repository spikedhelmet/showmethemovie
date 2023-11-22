import { Image, ImageContainer, SmallMovieContainer } from "../App.styled";
const posterBaseUrl = "https://image.tmdb.org/t/p/w500";

function SmallMovieItem({ poster, title }) {
  return (
    <SmallMovieContainer>
      <ImageContainer>
        <Image src={`${posterBaseUrl}${poster}`} alt={`${title} poster`} />
      </ImageContainer>
    </SmallMovieContainer>
  );
}

export default SmallMovieItem;
