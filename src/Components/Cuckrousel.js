import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import SmallMovieItem from "./SmallMovieItem";
import { CarouselContainer } from "../App.styled";

const responsive = {
  desktop: {
    breakpoint: {
      max: 3000,
      min: 1024,
    },
    items: 7,
    // partialVisibilityGutter: 40,
  },
  mobile: {
    breakpoint: {
      max: 464,
      min: 0,
    },
    items: 2,
    // partialVisibilityGutter: 30,
  },
  tablet: {
    breakpoint: {
      max: 1024,
      min: 464,
    },
    items: 4,
    partialVisibilityGutter: 40,
  },
};
export default function Cuckrousel({ items, heading }) {
  return (
    <CarouselContainer>
      <h2 style={{ color: "#fff", marginBottom: "0.8rem" }}>{heading}</h2>
      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={3000}
        centerMode={false}
        className=""
        containerClass="container"
        dotListClass=""
        draggable
        focusOnSelect={true}
        infinite={true}
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={responsive}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        showDots={false}
        sliderClass=""
        slidesToSlide={3}
        swipeable
      >
        {items.map((movie) => (
          <SmallMovieItem
            key={movie.id}
            title={movie.title}
            poster={movie.poster}
          />
        ))}
      </Carousel>
    </CarouselContainer>
  );
}
