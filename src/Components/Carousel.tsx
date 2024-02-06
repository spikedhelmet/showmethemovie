import SmallMovieItem from "./SmallMovieItem";
import {
  CarouselContainer,
  RelativeContainer,
  CarouselContent,
} from "../App.styled";

interface MovieObject {
  id: number;
  title: string;
  poster: string;
}

interface CarouselProps {
  items: MovieObject[] | undefined;
  heading: string;
}

function Carousel({ items, heading }: CarouselProps) {
  return (
    <>
      <h3 style={{ color: "#fff", margin: "2rem 0rem 1rem 1rem" }}>
        {heading}
      </h3>
      <RelativeContainer>
        <CarouselContainer>
          <CarouselContent>
            {items?.map((movie: MovieObject) => (
              <SmallMovieItem
                key={movie.id}
                id={movie.id}
                title={movie.title}
                poster={movie.poster}
              ></SmallMovieItem>
            ))}
          </CarouselContent>
        </CarouselContainer>
      </RelativeContainer>
    </>
  );
}

export default Carousel;
