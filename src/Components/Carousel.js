// import { useSwipeable } from "react-swipeable";
// import { useRef } from "react";
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
// import { CarouselContainer } from "../App.styled";

// const responsive = {
//   desktop: {
//     breakpoint: {
//       max: 3000,
//       min: 1024,
//     },
//     items: 7,
//     // partialVisibilityGutter: 40,
//   },
//   mobile: {
//     breakpoint: {
//       max: 464,
//       min: 0,
//     },
//     items: 2,
//     // partialVisibilityGutter: 30,
//   },

//   tablet: {
//     breakpoint: {
//       max: 1024,
//       min: 464,
//     },
//     items: 5,
//     // partialVisibilityGutter: 40,
//   },
// };
// export default function MovieCarousel({ items, heading }) {
//   return (
//     <CarouselContainer>
//       <h2 style={{ color: "#fff", marginBottom: "0.8rem" }}>{heading}</h2>
//       <Carousel
//         additionalTransfrom={0}
//         arrows
//         autoPlaySpeed={3000}
//         centerMode={false}
//         className=""
//         containerClass="container"
//         dotListClass=""
//         draggable
//         focusOnSelect={true}
//         infinite={true}
//         itemClass=""
//         keyBoardControl
//         minimumTouchDrag={80}
//         pauseOnHover
//         renderArrowsWhenDisabled={false}
//         renderButtonGroupOutside={false}
//         renderDotsOutside={false}
//         responsive={responsive}
//         rewind={false}
//         rewindWithAnimation={false}
//         rtl={false}
//         shouldResetAutoplay
//         showDots={false}
//         sliderClass=""
//         slidesToSlide={3}
//         swipeable
//       >
//         {items.map((movie) => (
//           <SmallMovieItem
//             key={movie.id}
//             title={movie.title}
//             poster={movie.poster}
//           />
//         ))}
//       </Carousel>
//     </CarouselContainer>
//   );
// }

import React, { useState, useEffect, useRef } from "react";
import SmallMovieItem from "./SmallMovieItem";
import {
  CarouselContainer,
  RelativeContainer,
  PrevButton,
  NextButton,
  CarouselContent,
} from "../App.styled";

function Carousel({ items, heading }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const timeoutRef = useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setCurrentIndex((prevIndex) =>
          prevIndex === items.length - 1 ? 0 : prevIndex + 1
        ),
      3000
    );

    return () => {
      resetTimeout();
    };
  }, [currentIndex, items.length, items]);

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    const touchEnd = e.touches[0].clientX;
    if (touchStart - touchEnd > 150) {
      // swipe left
      setCurrentIndex((prevIndex) =>
        prevIndex + 3 >= items.length ? 0 : prevIndex + 3
      );
    }

    if (touchStart - touchEnd < -150) {
      // swipe right
      setCurrentIndex((prevIndex) =>
        prevIndex - 3 < 0 ? items.length - 3 : prevIndex - 3
      );
    }
  };

  return (
    <>
      <h3 style={{ color: "#fff", margin: "2rem 0rem 1rem 1rem" }}>
        {heading}
      </h3>
      <RelativeContainer>
        <PrevButton
          onClick={() =>
            setCurrentIndex((prevIndex) =>
              prevIndex - 3 < 0 ? items.length - 3 : prevIndex - 3
            )
          }
        >
          ←Prev
        </PrevButton>
        <NextButton
          onClick={() =>
            setCurrentIndex((prevIndex) =>
              prevIndex + 3 >= items.length ? 0 : prevIndex + 3
            )
          }
        >
          Next→
        </NextButton>

        <CarouselContainer
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          <CarouselContent
            style={{
              transform: `translateX(-${currentIndex * (100 / items.length)}%)`,
            }}
          >
            {items.map((movie) => (
              <SmallMovieItem
                key={movie.id}
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
