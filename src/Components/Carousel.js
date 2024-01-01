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
