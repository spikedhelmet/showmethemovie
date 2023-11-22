import React, { useState, useRef } from "react";
import { CarouselContainer } from "../App.styled"; // Adjust the import based on your project structure
import SmallMovieItem from "./SmallMovieItem";

const CarouselGpt = ({ items, heading }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startX, setStartX] = useState(null);
  const containerRef = useRef(null);

  const nextSlide = () => {
    console.log("Next Slide");

    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const prevSlide = () => {
    console.log("Previous Slide");

    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + items.length) % items.length
    );
  };

  const handleTouchStart = (e) => {
    console.log("Touch move");

    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!startX || e.touches.length !== 2) return;

    const x1 = e.touches[0].clientX;
    const x2 = e.touches[1].clientX;
    const deltaX = startX - (x1 + x2) / 2;

    if (deltaX > 50) {
      nextSlide();
      setStartX(null);
    } else if (deltaX < -50) {
      prevSlide();
      setStartX(null);
    }
  };

  const handleTouchEnd = () => {
    console.log("Touch end");
    setStartX(null);
  };

  return (
    <>
      <h2 style={{ color: `#fff`, marginBottom: `0.5rem` }}>{heading}</h2>
      <CarouselContainer ref={containerRef}>
        {items.map((movie) => (
          <SmallMovieItem
            key={movie.id}
            title={movie.title}
            poster={movie.poster}
          />
        ))}
      </CarouselContainer>
    </>
  );
};

export default CarouselGpt;
